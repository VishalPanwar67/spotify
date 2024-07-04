import express from "express";
const router = express.Router();

import protectRoute from "../middlewares/protectRoute.js";

import {
  testEndPoints,
  register,
  login,
  logout,
  getMe,
  getUserProfile,
  updateUserProfile,
} from "../controllers/auth.controller.js";

router.get("/testEndPoints", testEndPoints);
router.get("/me", protectRoute, getMe); //to get user is loged in or not=> middleware
router.get("/profile/:id", getUserProfile);
router.put("/profile/:id", protectRoute, updateUserProfile);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
