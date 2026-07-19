import mongoose from "mongoose";
import type { IOtp } from "../types/otp.type.ts";

const otpSchema = new mongoose.Schema<IOtp>(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    otp: {
      type: String,
      required: true,
      trim: true,
    },
    expiry: {
      type: Number,
    },
  },
  { timestamps: true },
);

export const Otp = mongoose.model<IOtp>("Otp", otpSchema);
