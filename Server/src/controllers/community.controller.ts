import { Request, Response } from "express";
import { Types } from "mongoose";
import { ChatMessage } from "../models/chat.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { formatZodErrors } from "../utils/ErrorFormatter.js";
import {
  getMessagesQuerySchema,
  sendMessageSchema,
} from "../types/chat.type.js";

import {
  createPollSchema,
  getPollsQuerySchema,
  votePollSchema,
} from "../types/poll.type.js";
import { Poll } from "../models/poll.model.js";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const validatedQuery = getMessagesQuerySchema.safeParse(req.query);
    if (!validatedQuery.success) {
      return ApiResponse(
        res,
        400,
        formatZodErrors(validatedQuery.error),
        false,
      );
    }

    const { societyId, lastMessageId, limit } = validatedQuery.data;

    if (!Types.ObjectId.isValid(societyId)) {
      return ApiResponse(res, 400, "Invalid society ID format", false);
    }

    const query: Record<string, any> = {
      societyId: new Types.ObjectId(societyId),
    };

    // Fetch messages created AFTER lastMessageId for polling
    if (lastMessageId) {
      if (!Types.ObjectId.isValid(lastMessageId)) {
        return ApiResponse(res, 400, "Invalid last message ID format", false);
      }
      query._id = { $gt: new Types.ObjectId(lastMessageId) };
    }

    // Sort ascending (oldest to newest)
    const messages = await ChatMessage.find(query)
      .sort({ _id: 1 })
      .limit(limit)
      .lean();

    return ApiResponse(
      res,
      200,
      "Messages fetched successfully",
      true,
      messages,
    );
  } catch (error: any) {
    return ApiResponse(res, 500, error.message, false);
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const validatedData = sendMessageSchema.safeParse(req.body);
    if (!validatedData.success) {
      return ApiResponse(res, 400, formatZodErrors(validatedData.error), false);
    }

    const newMessage = await ChatMessage.create(validatedData.data);

    return ApiResponse(res, 201, "Message sent successfully", true, newMessage);
  } catch (error: any) {
    return ApiResponse(res, 500, error.message, false);
  }
};

export const getPolls = async (req: Request, res: Response) => {
  try {
    const { societyId } = req.params;
    const currentUserId = req.user?._id; // Extracted from your auth middleware

    const polls = await Poll.find({ societyId });

    const formattedPolls = polls.map((poll) => {
      const pollObj = poll.toObject();

      // Find the exact option the user selected
      const userVotedOption = pollObj.options.find((opt: any) =>
        opt.votedUserIds?.some(
          (id: any) => id.toString() === currentUserId?.toString(),
        ),
      );

      const hasVoted = !!userVotedOption;

      return {
        ...pollObj,
        hasVoted,
        userVotedOptionId: userVotedOption ? userVotedOption._id : null,
      };
    });

    return ApiResponse(res, 200, "Polls retrieved", true, formattedPolls);
  } catch (error: any) {
    return ApiResponse(res, 500, error.message, false);
  }
};

export const createPoll = async (req: Request, res: Response) => {
  try {
    const validatedData = createPollSchema.safeParse(req.body);
    if (!validatedData.success) {
      return ApiResponse(res, 400, formatZodErrors(validatedData.error), false);
    }

    const { societyId, authorName, question, options } = validatedData.data;

    const formattedOptions = options.map((opt) => ({ text: opt, votes: 0 }));

    const newPoll = await Poll.create({
      societyId,
      authorName,
      question,
      options: formattedOptions,
      votedUserIds: [],
      totalVotes: 0,
    });

    return ApiResponse(res, 201, "Poll created successfully", true, newPoll);
  } catch (error: any) {
    return ApiResponse(res, 500, error.message, false);
  }
};

export const votePoll = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!Types.ObjectId.isValid(id)) {
      return ApiResponse(res, 400, "Invalid poll ID format", false);
    }

    const validatedData = votePollSchema.safeParse(req.body);
    if (!validatedData.success) {
      return ApiResponse(res, 400, formatZodErrors(validatedData.error), false);
    }

    const { userId, optionId } = validatedData.data;

    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(optionId)) {
      return ApiResponse(res, 400, "Invalid user or option ID format", false);
    }

    const userObjectId = new Types.ObjectId(userId);
    const optionObjectId = new Types.ObjectId(optionId);

    // Atomic update
    const updatedPoll = await Poll.findOneAndUpdate(
      {
        _id: id,
        votedUserIds: { $ne: userObjectId },
        "options._id": optionObjectId,
      },
      {
        $inc: {
          "options.$.votes": 1,
          totalVotes: 1,
        },
        $push: {
          votedUserIds: userObjectId,
          "options.$.votedUserIds": userObjectId, // Push to specific option
        },
      },
      { returnDocument: "after" },
    );

    if (!updatedPoll) {
      const existingPoll = await Poll.findById(id);
      if (!existingPoll) {
        return ApiResponse(res, 404, "Poll not found", false);
      }
      if (existingPoll.votedUserIds.some((uid) => uid.equals(userObjectId))) {
        return ApiResponse(res, 400, "User has already voted", false);
      }
      return ApiResponse(res, 400, "Invalid option ID", false);
    }

    const pollResponse = {
      ...updatedPoll.toObject(),
      userVotedOptionId: optionId,
    };

    return ApiResponse(
      res,
      200,
      "Vote recorded successfully",
      true,
      pollResponse,
    );
  } catch (error: any) {
    return ApiResponse(
      res,
      500,
      error.message || "Internal server error",
      false,
    );
  }
};
