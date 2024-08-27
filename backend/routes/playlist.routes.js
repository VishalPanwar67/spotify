import express from "express";
const router = express.Router();
import protectRoute from "../middlewares/protectRoute.js";

import {
  createPlaylist,
  getPlaylist,
  getAllPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../controllers/playlist.controller.js";

router.put("/playlists", protectRoute, createPlaylist);
router.get("/playlists", getAllPlaylist);
router.get("/playlist/:id", getPlaylist);
router.put("/playlist/:id", protectRoute, updatePlaylist);
router.delete("/playlist/:id", protectRoute, deletePlaylist);
router.put("/addSongFromPlaylist/:id", protectRoute, addSongToPlaylist);
router.put(
  "/removeSongFromPlaylist/:id/song/:songId",
  protectRoute,
  removeSongFromPlaylist
);

export default router;
