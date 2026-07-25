import { z } from "zod";

export const getMessagesQuerySchema = z.object({
  societyId: z.string().min(1, "Society ID is required"),
  lastMessageId: z.string().optional(),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 50)),
});

export const sendMessageSchema = z.object({
  societyId: z.string().min(1, "Society ID is required"),
  userId: z.string().min(1, "User ID is required"),
  name: z.string().min(1, "User name is required"),
  message: z.string().trim().min(1, "Message text cannot be empty"),
});

export type GetMessagesQueryInput = z.infer<typeof getMessagesQuerySchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
