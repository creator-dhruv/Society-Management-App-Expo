import { Router } from "express";
import {
  getMessages,
  sendMessage,
  createPoll,
  getPolls,
  votePoll,
} from "../controllers/community.controller.js";

const router = Router();

router.route("/messages").get(getMessages);
router.route("/message").post(sendMessage);

router.route("/polls/:societyId").get(getPolls);
router.route("/poll").post(createPoll);
router.route("/polls/:id/vote").post(votePoll);

export default router;
