import { Song, Album } from "../models/index.js";
import { v2 as cloudinary } from "cloudinary";

//create Songs
const createSong = async (req, res) => {
  const artistID = req.artist._id;
  // console.log(req.file.path);
  try {
    const { title, duration, album } = req.body;
    const fileUrl = req.file ? req.file.path : ""; // This will be the URL provided by Cloudinary
    // const { fileUrl } = req.body;

    const song = new Song({
      title,
      duration,
      fileUrl,
      album,
      artist: artistID,
    });

    await song.save();

    // Update the album with the new song
    const albumUpdate = await Album.findById(album);
    albumUpdate.songs.push(song._id);
    await albumUpdate.save();

    res.status(201).json(song);
  } catch (error) {
    console.error(`Error in createSong: ${error.message}`);
    return res.status(500).json({ error: "Unable to create song" });
  }
};

//Get all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate("album").populate("artist");
    res.status(200).json(songs);
  } catch (error) {
    console.log(`Error in getAllSongs: ${error}`);
    return res.status(500).json({ error: "Unable to get all songs" });
  }
};

//getSongs
const getSong = async (req, res) => {
  const id = req.params.id;
  try {
    const song = await Song.findById(id).populate("album").populate("artist");
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    console.log(`Error in getSong: ${error}`);
    return res.status(500).json({ error: "Unable to get song" });
  }
};

//update Songs
const updateSong = async (req, res) => {
  const ArtistID = req.artist._id;
  const id = req.params.id;
  const { title, duration, album, artist } = req.body;
  let { fileUrl } = req.body;
  try {
    let song = await Song.findById(id);
    if (!song) return res.status(404).json({ error: "song not found" });
    if (ArtistID.toString() !== song.artist.toString()) {
      return res.status(404).json({ error: "Unauthorized" });
    }
    if (fileUrl) {
      if (song.fileUrl) {
        cloudinary.uploader.destroy(song.fileUrl);
      }
    }
    song = await Song.findByIdAndUpdate(
      id,
      {
        title,
        duration,
        album,
        artist,
        fileUrl,
      },
      { new: true }
    );
    res.status(200).json(song);
  } catch (error) {
    console.log(`Error in updateSong: ${error}`);
    return res.status(500).json({ error: "Unable to update song" });
  }
};

//delete Songs
const deleteSong = async (req, res) => {
  const id = req.params.id;
  const ArtistID = req.artist._id;
  try {
    const song = await Song.findById(id);
    if (!song) return res.status(404).json({ error: "song not found" });

    if (ArtistID.toString() !== song.artist.toString()) {
      return res.status(404).json({ error: "Unauthorized" });
    }

    await Album.findByIdAndUpdate(song.album, {
      $pull: { songs: song._id },
    });

    await Song.findByIdAndDelete(id);
    res.status(200).json(song);
  } catch (error) {
    console.log(`Error in deleteSong: ${error}`);
    return res.status(500).json({ error: "Unable to delete song" });
  }
};

export { createSong, getSong, updateSong, deleteSong, getAllSongs };
