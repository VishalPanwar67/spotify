import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
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

const login = (req, res) => {
  res.json({
    data: "you are login ",
  });
};

const logout = (req, res) => {
  res.json({
    data: "you are logout",
  });
};

const getMe = (req, res) => {
  res.json({
    data: "you are getMe",
  });
};

export { testEndPoints, register, login, logout, getMe };
