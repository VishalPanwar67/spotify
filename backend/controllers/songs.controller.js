import { User, Song } from "../models/index.js";
import { v2 as cloudinary } from "cloudinary";

import upload from "../middlewares/multerFileRoute.js";

//create Songs
const createSong = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).select(
      "-password -firstName -lastName -email -profilePicture -coverPicture"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { name, thumbnail, artist, album, genre, url, track, duration } =
      req.body;

    if (!name || !thumbnail || !url) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const thumbnailResult = await cloudinary.uploader.upload(thumbnail, {
      resource_type: "auto",
      folder: "thumbnails",
    });

    const urlResult = await cloudinary.uploader.upload(url, {
      resource_type: "auto",
      folder: "url",
    });
    // console.log("urlResult ==> ", urlResult);
    // console.log("song duration => ", urlResult.duration);

    const newSong = new Song({
      name,
      thumbnail: thumbnailResult.secure_url,
      track,
      artist: user,
      album,
      duration: urlResult.duration,
      genre,
      url: urlResult.secure_url,
    });
    const savedSong = await newSong.save();
    res.status(201).json({
      savedSong,
    });
  } catch (error) {
    console.log("unable to create song: catch Block => ", error);
    res.status(500).json({ error: "Unable to create song" });
  }
};

//getSongs
const getSong = async (req, res) => {};

//update Songs
const updateSong = async (req, res) => {};

//delete Songs
const deleteSong = async (req, res) => {};

//Get all songs
const getAllSongs = async (req, res) => {};

export { createSong, getSong, updateSong, deleteSong, getAllSongs };
