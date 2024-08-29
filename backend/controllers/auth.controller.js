import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

const testEndPoints = (req, res) => {
  //   res.json({
  //     data: "This is the test router point",
  //   });
  res.send("This test end point");
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid Email format" });
    }
    const existingUser = await User.findOne({ username }); //find user form database
    if (existingUser) {
      return res.status(400).json({ error: "User alrady Exist" });
    }

    const existingEmail = await User.findOne({ email }); //find emial form database
    if (existingEmail) {
      return res.status(400).json({ error: "Email alrady Exist" });
    }

    if (password.lenght < 6) {
      return res
        .status(400)
        .json({ error: "password is short=> must have more then 6 " });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create User
    const newUser = new User({
      email,
      password: hashPassword,
      firstName,
      lastName,
      username,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
        likedSongs: newUser.likedSongs,
        likedPlaylists: newUser.likedPlaylists,
        playlist: newUser.playlist,
        subscribedArtists: newUser.subscribedArtists,
      });
    } else {
      console.log(`Error in signup controller funtion =>: ${error.message}`);
      return res.status(400).json({ error: "newUser is not created" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Unable to signup" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      console.log(`Invalid username or password => ${username}`);
      return res.status(400).json({ error: "Invalid credentials" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      likedSongs: user.likedSongs,
      likedPlaylists: user.likedPlaylists,
      subscribedArtists: user.subscribedArtists,
    });
  } catch (error) {
    console.log(`Unable to log in: ${error}`);
    return res.status(500).json({ error: "Unable to log in - Catch Block" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.cookie("artisttoken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`Unable to log out: ${error}`);
    return res.status(500).json({ error: "Unable to log out - Catch Block" });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(`Unable to get user: ${error}`);
    return res.status(500).json({ error: "Unable to get user - Catch Block" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log(`Unable to get user Profile: ${error}`);
    return res.status(500).json({ error: "Unable to get user profile" });
  }
};
const updateUserProfile = async (req, res) => {
  const { firstName, lastName, username, currentPassword, newPassword } =
    req.body;
  let { profilePicture, coverPicture } = req.body;

  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (
      (!newPassword && currentPassword) ||
      (newPassword && !currentPassword)
    ) {
      return res
        .status(400)
        .json({ error: "Please enter both current and new password" });
    }
    if (newPassword && currentPassword) {
      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }
      if (newPassword === currentPassword) {
        return res.status(400).json({
          error: "New password must be different from current password",
        });
      }
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "New password must be at least 6 characters long" });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    if (profilePicture) {
      if (user.profilePicture) {
        const imageId = user.profilePicture.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imageId);
      }
      const uploadResponse = await cloudinary.uploader.upload(profilePicture);
      profilePicture = uploadResponse.secure_url;
    }
    if (coverPicture) {
      if (user.coverPicture) {
        const imageId = user.coverPicture.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imageId);
      }
      const uploadResponse = await cloudinary.uploader.upload(coverPicture);
      coverPicture = uploadResponse.secure_url;
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.username = username || user.username;
    user.profilePicture = profilePicture || user.profilePicture;
    user.coverPicture = coverPicture || user.coverPicture;
    user = await user.save();
    user.password = null;
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log(`Unable to update user profile: ${error}`);
    res.status(500).json({ error: "Unable to update user profile" });
  }
};

export {
  testEndPoints,
  register,
  login,
  logout,
  getMe,
  getUserProfile,
  updateUserProfile,
};
