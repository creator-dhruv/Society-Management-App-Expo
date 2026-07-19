import mongoose, { Schema } from "mongoose";
import { ISociety } from "../types/society.type";

const societySchema = new mongoose.Schema<ISociety>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      street: String,
      locality: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    totalTowers: {
      type: Number,
      default: 1,
    },
    totalFlats: {
      type: Number,
      default: 1,
    },
    facilities: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
      },
    ], // e.g., ["Gym", "Swimming Pool", "Clubhouse"]
    contactEmail: {
      type: String,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    contactPhone: {
      type: String,
      required: true,
    },
    // Relational references
    chairman: {
      type: Schema.Types.ObjectId,
      ref: "User", // Links to a User/Member model
    },
    committeeMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    securityMembers: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        address: {
          towerNo: {
            type: String,
            required: true,
          },
        },
      },
    ],
    maintenanceRate: {
      type: Number,
      required: true,
    },
    maintenanceFrequency: {
      type: String,
      enum: ["Monthly", "Quarterly", "Annually"],
      default: "Monthly",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Society = mongoose.model<ISociety>("Society", societySchema);
