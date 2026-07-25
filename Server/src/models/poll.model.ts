import { Schema, model } from "mongoose";
import { IPoll } from "../types/poll.type.js";

const PollOptionSchema = new Schema({
  text: { type: String, required: true, trim: true },
  votes: { type: Number, default: 0 },
  votedUserIds: [{ type: Schema.Types.ObjectId, ref: "User" }], // Add this
});

const PollSchema = new Schema<IPoll>(
  {
    societyId: {
      type: Schema.Types.ObjectId,
      ref: "Society",
      required: true,
      index: true,
    },
    authorName: { type: String, required: true, trim: true },
    question: { type: String, required: true, trim: true },
    options: [PollOptionSchema],
    votedUserIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    totalVotes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Compound index for polling ($gt range queries sorted ascending)
PollSchema.index({ societyId: 1, _id: 1 });

export const Poll = model<IPoll>("Poll", PollSchema);
