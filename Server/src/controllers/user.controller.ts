import type { Request, Response } from "express";
import { userSignInSchema, userSignUpSchema } from "../types/user.type.ts";
import { otpResponseSchema } from "../types/otp.type.ts";
import { User } from "../models/user.model.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { createOtp, verifyOtp } from "../utils/Otp.ts";

// Helper to clean up Zod formatting clutter
const formatZodErrors = (error: any) => {
  return error?.issues.reduce(
    (acc: Record<string, string>, err: any) => {
      const key = err.path.join(".");
      acc[key] = err.message;
      return acc;
    },
    {} as Record<string, string>,
  );
};

const signUp = async (req: Request, res: Response) => {
  try {
    const result = userSignUpSchema.safeParse(req.body);

    if (!result.success) {
      return ApiResponse(res, 400, formatZodErrors(result.error), false);
    }

    const body = result.data;
    if (body.password !== body.confirmPassword) {
      return ApiResponse(res, 400, "Confirm Password is incorrect", false);
    }

    const existingUser = await User.findOne({
      email: body.email,
    });

    if (existingUser) {
      if (existingUser?.isVerified) {
        return ApiResponse(
          res,
          409,
          "User already exists with this email address",
          false,
        );
      }

      if (!existingUser?.isVerified) {
        const response = await createOtp(body.email);
        if (!response.success) {
          return ApiResponse(
            res,
            response.status || 500,
            response.message,
            false,
          );
        }

        return ApiResponse(res, 201, "User created successfully", true);
      }
    }

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
      avatar: [],
      role: body.role,
      isVerified: false,
    });

    if (!user) {
      return ApiResponse(
        res,
        500,
        "Internal Server Error during user creation",
        false,
      );
    }

    const response = await createOtp(body.email);
    if (!response.success) {
      return ApiResponse(res, response.status || 500, response.message, false);
    }

    return ApiResponse(res, 201, "User created successfully", true);
  } catch (crashError: any) {
    console.error("Signup System Error:", crashError);
    return ApiResponse(
      res,
      500,
      "Internal server error occurred during registration",
      false,
    );
  }
};

const emailVerification = async (req: Request, res: Response) => {
  try {
    const result = otpResponseSchema.safeParse(req.body);

    if (!result.success) {
      return ApiResponse(res, 400, formatZodErrors(result.error), false);
    }

    const body = result.data;
    const response = await verifyOtp(body.email, body.otp);

    if (!response.success) {
      return ApiResponse(res, response.status || 400, response.message, false);
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: body.email },
      { $set: { isVerified: true } },
      { returnDocument: "after" },
    );

    if (!updatedUser) {
      return ApiResponse(res, 404, "User not found", false);
    }

    const accessToken = updatedUser.generateAccessToken();
    const refreshToken = updatedUser.generateRefreshToken();

    if (!updatedUser.refreshToken) {
      updatedUser.refreshToken = [];
    }
    if (updatedUser.refreshToken.length > 5) {
      updatedUser.refreshToken.shift();
    }
    updatedUser.refreshToken.push(refreshToken);
    await updatedUser.save({ validateBeforeSave: false });

    return ApiResponse(res, 200, "Email verified successfully", true, {
      user: updatedUser,
      refreshToken,
      accessToken,
    });
  } catch (error: any) {
    console.error("Verification System Error:", error);
    return ApiResponse(
      res,
      500,
      "Internal server error occurred during verification",
      false,
    );
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const result = userSignInSchema.safeParse(req.body);

    if (!result.success) {
      return ApiResponse(res, 400, formatZodErrors(result.error), false);
    }

    const { email, password } = result.data;

    const user = await User.findOne({ email });

    if (!user) {
      return ApiResponse(res, 401, "Invalid email or password", false);
    }

    if (!user.isVerified) {
      return ApiResponse(
        res,
        403,
        "Please verify your email address before login",
        false,
      );
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return ApiResponse(res, 401, "Invalid email or password", false);
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    if (!user.refreshToken) {
      user.refreshToken = [];
    }
    if (user.refreshToken.length > 5) {
      user.refreshToken.shift();
    }
    user.refreshToken.push(refreshToken);
    await user.save({ validateBeforeSave: false });

    return ApiResponse(res, 200, "Logged in successfully", true, {
      user,
      refreshToken,
      accessToken,
    });
  } catch (error: any) {
    console.error("Login System Error:", error);
    return ApiResponse(
      res,
      500,
      "Internal server error occurred during login",
      false,
    );
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    await User.findByIdAndUpdate(userId, {
      refreshToken: [],
    });

    return ApiResponse(res, 200, "Logged out successfully", true);
  } catch (error: any) {
    console.error("Logout System Error:", error);
    return ApiResponse(
      res,
      500,
      "Internal server error occurred during logout",
      false,
    );
  }
};

export { signUp, emailVerification, signIn, logout };
