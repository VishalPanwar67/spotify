import express from "express";
const router = express.Router();

import protectRoute from "../middlewares/protectRoute.js";
import upload from "../middlewares/multerFileRoute.js";

import {
  createSong,
  getSong,
  updateSong,
  deleteSong,
  getAllSongs,
} from "../controllers/songs.controller.js";
router.get("/songTestEndPoints", (req, res) => {
  res.send("This test end point");
});

router.post("/createSong", protectRoute, upload.single("file"), createSong);
router.get("/songs/:id", getSong);
router.put("/songs/:id", updateSong);
router.delete("/songs/:id", deleteSong);
router.get("/songs", getAllSongs);

export default router;
