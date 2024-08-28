import express from "express";
const router = express.Router();
import protectRoute from "../middlewares/protectRoute.js";
import { User, Artist, Album, Song } from "../models/index.js";

router.get("/search", protectRoute, async (req, res) => {
  try {
    const { query } = req.query;
    // console.log(`Query: ${query}`);
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const artists = await Artist.find({
      $text: { $search: query },
    }).populate("albums");

    const albums = await Album.find({
      $text: { $search: query },
    }).populate("artist");

    const songs = await Song.find({
      $text: { $search: query },
    })
      .populate("album")
      .populate("artist");

    res.status(200).json({ artists, albums, songs });
  } catch (error) {
    console.log(`Error in search: ${error}`);
    return res.status(500).json({ error: "Unable to search" });
  }
});

export default router;
