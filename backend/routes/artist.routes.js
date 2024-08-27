import express from "express";
const router = express.Router();
import protectRoute from "../middlewares/protectRoute.js";
import artistProtectRoute from "../middlewares/artistProtectRoute.js";
import multerUpload from "../middlewares/multerFileRoute.js";

import {
  register,
  registerArtistInfo,
  getArtist,
  getArtistProfile,
  getAllArtist,
  updateArtistProfile,
  deleteArtist,
} from "../controllers/artist.controller.js";

router.post("/register", protectRoute, register);
router.get("/getArtist", artistProtectRoute, getArtist);
router.post("/artistinfo", artistProtectRoute, registerArtistInfo);
router.get("/artistprofile/:id", getArtistProfile);
router.get("/artists", getAllArtist);

router.put(
  "/updateArtist",
  //   protectRoute,
  artistProtectRoute,
  multerUpload.fields([
    { name: "artistProfilePicture", maxCount: 1 },
    { name: "artistCoverPicture", maxCount: 1 },
  ]),
  updateArtistProfile
);
router.delete("/artist", artistProtectRoute, deleteArtist);

export default router;
