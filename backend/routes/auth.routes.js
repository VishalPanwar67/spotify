import express from "express";
const router = express.Router();

import protectRoute from "../middlewares/protectRoute.js";
import multerUpload from "../middlewares/multerFileRoute.js";

import {
  register,
  login,
  logout,
  getMe,
  getUserProfile,
  updateUserProfile,
  subscribeUnsubscribe,
} from "../controllers/auth.controller.js";

router.post("/register", register);
router.post("/login", login);
router.get("/me", protectRoute, getMe);
router.post("/logout", logout);
router.get("/profile/:id", getUserProfile);
router.put(
  "/profile/:id",
  protectRoute,
  multerUpload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "coverPicture", maxCount: 1 },
  ]),
  updateUserProfile
);
router.get("/subscribe/:id", protectRoute, subscribeUnsubscribe);

export default router;
