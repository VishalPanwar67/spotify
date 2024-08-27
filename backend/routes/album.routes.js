import express from "express";
const router = express.Router();
import artistProtectRoute from "../middlewares/artistProtectRoute.js";

import {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
} from "../controllers/album.controller.js";

router.put("/createAlbum", artistProtectRoute, createAlbum);
router.get("/albums", getAllAlbums);
router.get("/album/:id", getAlbumById);
router.put("/updateAlbum/:id", artistProtectRoute, updateAlbum);
router.delete("/album/:id", artistProtectRoute, deleteAlbum);

export default router;
