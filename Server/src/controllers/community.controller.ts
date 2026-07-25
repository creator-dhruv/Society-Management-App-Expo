import { Request, Response } from "express";
import { Types } from "mongoose";
import { ChatMessage } from "../models/chat.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { formatZodErrors } from "../utils/ErrorFormatter.js";
import {
  getMessagesQuerySchema,
  sendMessageSchema,
} from "../types/chat.type.js";

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
    const messages = await ChatMessage.find(query).limit(limit).lean();

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
