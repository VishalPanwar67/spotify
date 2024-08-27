import { Artist } from "../models/index.js";
import { v2 as cloudinary } from "cloudinary";
import artistGenerateTokenAndSetCookie from "../utils/artistGenerateTokenAndSetCookie.js";

const register = async (req, res) => {
  try {
    const artist = new Artist(req.body);
    await artist.save();
    artistGenerateTokenAndSetCookie(artist._id, res);
    res.status(201).json(artist);
  } catch (error) {
    return res.status(500).json({ error: "Unable to Create Artist" });
  }
};
const getArtist = async (req, res) => {
  try {
    // console.log("vishat " + req.artist._id);
    const artist = await Artist.findById(req.artist._id);
    res.status(200).json(artist);
  } catch (error) {
    console.log(`Unable to get artist: ${error}`);
    return res.status(500).json({ error: "Unable to get Artist" });
  }
};

const registerArtistInfo = async (req, res) => {
  const { bio, socialLinks } = req.body;
  let { profilePicture, coverPicture } = req.body;
  const artistId = req.artist._id;
  try {
    let artist = await Artist.findById(artistId);
    if (!artist) return res.status(404).json({ error: "Artist not found" });

    if (profilePicture) {
      const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
        resource_type: "auto",
        folder: "ArtistprofilePicture",
      });
      profilePicture = uploadResponse.secure_url;
    }
    if (coverPicture) {
      const uploadResponse = await cloudinary.uploader.upload(coverPicture, {
        resource_type: "auto",
        folder: "ArtistcoverPicture",
      });
      coverPicture = uploadResponse.secure_url;
    }

    artist.bio = bio || artist.bio;
    artist.socialLinks = socialLinks || artist.socialLinks;
    artist.profilePicture = profilePicture || artist.profilePicture;
    artist.coverPicture = coverPicture || artist.coverPicture;
    await artist.save();
    console.log("Artist updated successfully");
    res.status(200).json(artist);
  } catch (error) {
    console.log(`Unable to update artist profile: ${error}`);
    res.status(500).json({ error: "Unable to update artist profile" });
  }
};

const getArtistProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id);
    if (!artist) return res.status(404).json({ error: "artist not found" });
    res.status(200).json(artist);
  } catch (error) {
    console.log(`Unable to get user Profile: ${error}`);
    return res.status(500).json({ error: "Unable to get artist profile" });
  }
};

const getAllArtist = async (req, res) => {
  try {
    const artists = await Artist.find().populate("albums");
    res.status(200).json(artists);
  } catch (error) {
    return res.status(500).json({ error: "Unable to get Artists" });
  }
};

const updateArtistProfile = async (req, res) => {
  const { firstName, lastName, bio, socialLinks, stageName } = req.body;
  console.log(req.body);
  let { profilePicture, coverPicture } = req.body;
  const artistId = req.artist._id;

  try {
    let artist = await Artist.findById(artistId);
    if (!artist) return res.status(404).json({ error: "Artist not found" });
    if (profilePicture) {
      if (artist.profilePicture) {
        const imageId = artist.profilePicture.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imageId);
      }
      const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
        resource_type: "auto",
        folder: "ArtistprofilePicture",
      });
      profilePicture = uploadResponse.secure_url;
    }
    if (coverPicture) {
      if (artist.coverPicture) {
        const imageId = artist.coverPicture.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imageId);
      }
      const uploadResponse = await cloudinary.uploader.upload(coverPicture, {
        resource_type: "auto",
        folder: "ArtistcoverPicture",
      });
      coverPicture = uploadResponse.secure_url;
    }

    artist.firstName = firstName || artist.firstName;
    artist.lastName = lastName || artist.lastName;
    artist.bio = bio || artist.bio;
    artist.socialLinks = socialLinks || artist.socialLinks;
    artist.stageName = stageName || artist.stageName;
    artist.profilePicture = profilePicture || artist.profilePicture;
    artist.coverPicture = coverPicture || artist.coverPicture;
    await artist.save();
    res.status(200).json({ message: "artist updated successfully" });
  } catch (error) {
    console.log(`Unable to update artist profile: ${error}`);
    res.status(500).json({ error: "Unable to update artist profile" });
  }
};

const deleteArtist = async (req, res) => {
  const artistId = req.artist._id;
  try {
    const artist = await Artist.findByIdAndDelete(artistId);
    if (!artist) return res.status(404).json({ error: "Artist not found" });
    res.status(200).json({ message: "Artist deleted successfully" });
  } catch (error) {
    console.log(`Unable to delete artist: ${error}`);
    res.status(500).json({ error: "Unable to delete artist" });
  }
};

export {
  register,
  getArtist,
  getArtistProfile,
  registerArtistInfo,
  getAllArtist,
  updateArtistProfile,
  deleteArtist,
};
