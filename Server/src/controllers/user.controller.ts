import type { Request, Response } from "express";
import { userSignInSchema, userSignUpSchema } from "../types/user.type.ts";
import { otpResponseSchema } from "../types/otp.type.ts";
import { User } from "../models/user.model.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { createOtp, verifyOtp } from "../utils/Otp.ts";

// Helper to clean up Zod formatting clutter
const formatZodErrors = (error: any) => {
  return error.issues.reduce(
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

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return ApiResponse(
        res,
        409,
        "User already exists with this email address",
        false,
      );
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

    return ApiResponse(
      res,
      201,
      "User created successfully. Verification OTP sent.",
      true,
    );
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
      { isVerified: true },
      { new: true },
    );

    if (!updatedUser) {
      return ApiResponse(
        res,
        404,
        "Associated user profile could not be located",
        false,
      );
    }

    return ApiResponse(res, 200, "Email account verified successfully", true);
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
        "Please verify your email address before logging in",
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
    user.refreshToken.push(refreshToken);
    await user.save({ validateBeforeSave: false });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
    };

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days matching JWT expiry
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days matching JWT expiry
    });

    return ApiResponse(res, 200, "Logged in successfully", true);
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
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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
