import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { IUser } from "../types/user.type.ts";

export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

// =========================================================================
// MONGOOSE SCHEMA GENERICS BREAKDOWN
// -------------------------------------------------------------------------
// < Param 1 > IUser: Defines raw data fields saved in MongoDB.
// < Param 2 > Model<...>: Defines static queries (e.g., User.find()).
//             - {} inside Model means there are NO custom static methods.
// < Param 3 > IUserMethods: Attaches custom methods to documents (e.g., user.save()).
// =========================================================================

type UserModel = Model<IUser, {}, IUserMethods>;
const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: [String], // cloudinary URL
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "security"],
      default: "user",
    },
    refreshToken: {
      type: [String],
    },
    society: {
      type: [
        {
          name: { type: String, required: true, trim: true },
          address: {
            flatNo: { type: String },
            towerNo: { type: String, required: true },
          },
        },
      ],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 6);
  }
});

userSchema.method(
  "isPasswordCorrect",
  async function (password: string): Promise<boolean> {
    if (!this.password) return false;
    return await bcrypt.compare(password, this.password);
  },
);

userSchema.method("generateAccessToken", function (): string {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "20d" },
  );
});

userSchema.method("generateRefreshToken", function (): string {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "60d" },
  );
});

export const User = mongoose.model<IUser, UserModel>("User", userSchema);
