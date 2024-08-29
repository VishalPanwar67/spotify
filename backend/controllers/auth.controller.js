import { User, Artist, Notification, Song } from "../models/index.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

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
      await newUser.save();
      generateTokenAndSetCookie(newUser._id, res);
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
    console.log(`Unable to signup: ${error.message}`);
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

const subscribeUnsubscribe = async (req, res) => {
  const { id } = req.params;
  const userID = req.user._id;
  try {
    const artist = await Artist.findById(id);
    if (!artist) return res.status(404).json({ error: "Artist not found" });
    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ error: "User not found" });

    // console.log(
    //   `userID: ${userID}, artistID: ${artist.userID} ${typeof userID} ${typeof artist.userID.toString()}`
    // );
    if (userID.toString() === artist.userID.toString()) {
      return res.status(400).json({ error: "You can't subscribe yourself" });
    }
    const isSubscribed = user.subscribedArtists.includes(id);
    if (isSubscribed) {
      //unSubscribe
      await Artist.findByIdAndUpdate(
        id,
        {
          $pull: { subscriber: userID },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userID,
        {
          $pull: { subscribedArtists: id },
        },
        { new: true }
      );
      res.status(200).json({ message: "unsubscribed successfully" });
    } else {
      //subscribe
      await Artist.findByIdAndUpdate(
        id,
        {
          $push: { subscriber: userID },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userID,
        {
          $push: { subscribedArtists: id },
        },
        { new: true }
      );

      //send Notification
      const notification = new Notification({
        type: "subscribe",
        from: userID,
        to: artist.userID,
      });
      // console.log(`notification: ${notification}`);
      await notification.save();
      res.status(200).json({ message: "subscribed successfully" });
    }
  } catch (error) {
    console.log(`Unable to subscribe/unsubscribe: ${error}`);
    res.status(500).json({ error: "Unable to subscribe/unsubscribe" });
  }
};

const likeUnlikeSong = async (req, res) => {
  const userId = req.user._id;
  const songId = req.params.id;
  try {
    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ error: "Song not found" });
    const userLikedSong = song.likedBy.includes(userId);
    if (userLikedSong) {
      //unLike
      await Song.findByIdAndUpdate(
        songId,
        {
          $pull: { likedBy: userId },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { likedSongs: songId },
        },
        { new: true }
      );
      const updateLikes = song.likedBy.filter(
        (id) => id.toString() !== userId.toString()
      );
   
      return res.status(200).json({ message: "unliked successfully" });
    } else {
      //like
      const updateLikes = song.likedBy;
      updateLikes.push(userId);
      await Song.findByIdAndUpdate(
        songId,
        {
          $push: { likedBy: userId },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { likedSongs: songId },
        },
        { new: true }
      );
     

      //send Notification
      const artistId = await Artist.findById(song.artist);

      const notification = new Notification({
        type: "like",
        from: userId,
        to: artistId.userID,
      });
     
      await notification.save();

      return res.status(200).json(updateLikes);
    }
  } catch (error) {
    console.log(`Unable to like/unlike song: ${error.message}`);
    res.status(500).json({ error: "Unable to like/unlike song" });
  }
};

export {
  register,
  login,
  logout,
  getMe,
  getUserProfile,
  updateUserProfile,
  subscribeUnsubscribe,
  likeUnlikeSong,
};
