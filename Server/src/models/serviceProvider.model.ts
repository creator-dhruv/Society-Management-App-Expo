import mongoose, { Schema } from "mongoose";
import { IServiceProvider } from "../types/serviceProvider.type";

const serviceProviderSchema = new mongoose.Schema<IServiceProvider>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    serviceProvided: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    aadharNumber: {
      type: Number,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    societies: [{ type: Schema.Types.ObjectId, ref: "Society" }],
  },
  { timestamps: true },
);

export const ServiceProvider = mongoose.model<IServiceProvider>(
  "ServiceProvider",
  serviceProviderSchema,
);
