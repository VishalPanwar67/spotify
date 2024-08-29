import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import artistProtectRoute from "../middlewares/artistProtectRoute.js";

import {
  getNotifications,
  deleteNotifications,
  deleteAllNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteAllNotifications);
router.delete("/:id", protectRoute, deleteNotifications);

export default router;
