import { Album } from "../models/index.js";
import { v2 as cloudinary } from "cloudinary";

const createAlbum = async (req, res) => {
  const ArtistID = req.artist._id;
  console.log(req.artist._id + " " + typeof req.artist._id);
  try {
    const { title, releaseDate, coverImage, artist, songs } = req.body;
    // artist = ArtistID;
    const album = new Album({
      title,
      releaseDate,
      coverImage,
      artist: ArtistID,
      songs,
    });
    await album.save();
    res.status(201).json(album);
  } catch (error) {
    console.log(`Unable to create album: ${error}`);
    return res.status(500).json({ error: "Unable to create album" });
  }
};

const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id)
      .populate("artist")
      .populate("songs");
    if (!album) return res.status(404).json({ error: "album not found" });
    res.status(200).json(album);
  } catch (error) {
    console.log(`Unable to get album: ${error}`);
    return res.status(500).json({ error: "Unable to get album" });
  }
};

const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate("artist").populate("songs");
    if (!albums) return res.status(404).json({ error: "albums not found" });
    res.status(200).json(albums);
  } catch (error) {
    console.log(`Unable to get albums: ${error}`);
    return res.status(500).json({ error: "Unable to get albums" });
  }
};

const updateAlbum = async (req, res) => {
  const ArtistID = req.artist._id;
  const id = req.params.id;
  const { title, releaseDate, artist, songs } = req.body;
  let { coverImage } = req.body;
  try {
    let album = await Album.findById(id);
    if (!album) return res.status(404).json({ error: "album not found" });
    if (ArtistID.toString() !== album.artist.toString()) {
      return res.status(404).json({ error: "Unauthorized" });
    }
    if (coverImage) {
      if (album.coverImage) {
        const imageId = album.coverImage.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imageId);
      }
      const uploadResponse = await cloudinary.uploader.upload(coverImage, {
        resource_type: "auto",
        folder: "AlbumcoverImage",
      });
      coverImage = uploadResponse.secure_url;
    }
    album.title = title || album.title;
    album.releaseDate = releaseDate || album.releaseDate;
    album.artist = artist || album.artist;
    album.songs = songs || album.songs;
    album.coverImage = coverImage || album.coverImage;
    await album.save();
    res.status(200).json(album);
  } catch (error) {
    console.log(`Unable to update album-catch Block: ${error}`);
    return res.status(500).json({ error: "Unable to update album" });
  }
};

const deleteAlbum = async (req, res) => {
  const id = req.params.id;
  try {
    const album = await Album.findByIdAndDelete(id);
    if (!album) return res.status(404).json({ error: "album not found" });
    res.status(200).json(album);
  } catch (error) {
    console.log(`Unable to delete album: ${error}`);
    return res.status(500).json({ error: "Unable to delete album" });
  }
};

export { createAlbum, getAllAlbums, getAlbumById, updateAlbum, deleteAlbum };
