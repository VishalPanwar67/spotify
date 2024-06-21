import express from "express";
const router = express.Router();

import {
  testEndPoints,
  register,
  login,
  logout,
  getMe,
} from "../controllers/auth.controller.js";

router.get("/testEndPoints", testEndPoints);
//router.get("/me", protectRoute, getMe); //to get user is loged in or not=> middleware
router.post("/register", register);
router.get("/login", login);
router.get("/logout", logout);

export default router;
