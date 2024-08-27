import express from "express";
const router = express.Router();
import artistProtectRoute from "../middlewares/artistProtectRoute.js";
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

router.put(
  "/createSong",
  artistProtectRoute,
  upload.single("file"),
  createSong
);
router.get("/songs", getAllSongs);
router.get("/:id", getSong);
router.put("/:id", artistProtectRoute, updateSong);
router.delete("/:id", artistProtectRoute, deleteSong);

export default router;
