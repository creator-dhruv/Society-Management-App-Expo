import { Router } from "express";
import {
  emailVerification,
  logout,
  signIn,
  signUp,
} from "../controllers/user.controller.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";

const router = Router();

router.route("/signUp").post(signUp);
router.route("/emailVerification").post(emailVerification);
router.route("/signIn").post(signIn);
router.route("/logout").post(authenticate, logout);

export default router;
