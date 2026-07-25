import { Document, Types } from "mongoose";
import { z } from "zod";

export interface IPollOption {
  _id?: Types.ObjectId;
  text: string;
  votes: number;
}

export interface IPoll extends Document {
  societyId: Types.ObjectId;
  authorName: string;
  question: string;
  options: IPollOption[];
  votedUserIds: Types.ObjectId[];
  totalVotes: number;
  createdAt: Date;
  updatedAt: Date;
}

export const createPollSchema = z.object({
  societyId: z.string().min(1, "Society ID is required"),
  authorName: z.string().min(1, "Author name is required"),
  question: z.string().trim().min(1, "Poll question cannot be empty"),
  options: z
    .array(z.string().trim().min(1, "Option text cannot be empty"))
    .min(2, "At least two options are required"),
});

export const votePollSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  optionId: z.string().min(1, "Option ID is required"),
});

export const getPollsQuerySchema = z.object({
  societyId: z.string().min(1, "Society ID is required"),
  lastPollId: z.string().optional(),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 20)),
});
