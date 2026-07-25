import { Router } from "express";
import {
  getMessages,
  sendMessage,
} from "../controllers/community.controller.js";

const router = Router();

router.get("/messages", getMessages);
router.post("/message", sendMessage);

export default router;
