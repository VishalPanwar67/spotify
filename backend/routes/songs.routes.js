import express from "express";
const router = express.Router();
import artistProtectRoute from "../middlewares/artistProtectRoute.js";
import multerUpload from "../middlewares/multerFileRoute.js";

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
  multerUpload.single("fileUrl"), // Ensure the field name matches your form
  // (req, res, next) => {
  //   console.log("Request body:", req.body);
  //   console.log("Request file:", req.file); // Check if file is received
  //   console.log("first");
  //   next();
  // },
  createSong
);
router.get("/songs", getAllSongs);
router.get("/:id", getSong);
router.put("/:id", artistProtectRoute, updateSong);
router.delete("/:id", artistProtectRoute, deleteSong);

export default router;
