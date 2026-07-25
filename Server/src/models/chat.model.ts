import { Document, Schema, Types, model } from "mongoose";

export interface IChatMessage extends Document {
  societyId: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    societyId: {
      type: Schema.Types.ObjectId,
      ref: "Society",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Compound index optimized for polling ($gt range queries sorted ascending)
ChatMessageSchema.index({ societyId: 1, _id: 1 });

export const ChatMessage = model<IChatMessage>(
  "ChatMessage",
  ChatMessageSchema,
);
