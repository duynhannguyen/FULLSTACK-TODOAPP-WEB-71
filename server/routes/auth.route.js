import express from "express";
import authController from "../controller/auth.controller.js";
import { validateMdw } from "../middlewares/validate.mdw.js";
import AuthValidator from "../validationSchema/auth.validator.js";
import authMiddleWare from "../middlewares/auth.mdw.js";
const router = express.Router();

router.post(
  "/signup",
  validateMdw(AuthValidator.signupSchema),
  authController.signup
);
router.post(
  "/login",
  validateMdw(AuthValidator.loginSchema),
  authController.login
);
router.get("/current-user", authMiddleWare, authController.fetchCurrentUser);

export default router;
