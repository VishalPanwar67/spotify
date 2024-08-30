import express from "express";
import protectRoute from "../middlewares/protectRoute.js";

import {
    songRecomdFromMutualUsers,
    playlistRecomdFromMutualUsers,
    artistRecomdFromMutualUsers,
} from "../controllers/Recomds.controller.js";

const router = express.Router();

router.get("/song", protectRoute, songRecomdFromMutualUsers);
router.get("/playlist", protectRoute, playlistRecomdFromMutualUsers);
router.get("/artist", protectRoute, artistRecomdFromMutualUsers);


export default router;
