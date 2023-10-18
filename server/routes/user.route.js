import express from "express";
import UserController from "../controller/user.controller.js";

import authMiddleWare from "../middlewares/auth.mdw.js";
import uploadMdw from "../middlewares/upload.mdw.js";
const router = express.Router();

router.put(
  "/avatar",
  authMiddleWare,
  uploadMdw.single("image"),
  UserController.uploadAvatar
);
router.put("/avatar", UserController.updateProfile);

export default router;
