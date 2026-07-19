import otpGenerator from "otp-generator";
import { Otp } from "../models/otp.model.ts";

export const createOtp = async (email: string) => {
  if (!email) {
    return { message: "Email is required", success: false, status: 400 };
  }

  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const time = new Date().getTime();

  const createdOTP = await Otp.create({
    email,
    otp,
    expiry: time + 300000,
  });

  if (!createdOTP) {
    return {
      message: "Database failed to create OTP",
      success: false,
      status: 500,
    };
  }

  return {
    message: "OTP created successfully",
    success: true,
    status: 201,
  };
};

export const verifyOtp = async (email: string, clientOtp: string) => {
  if (!email || !clientOtp) {
    return {
      success: false,
      message: "Email and OTP are required",
      status: 400,
    };
  }

  try {
    const latestOtpRecord = await Otp.findOne({ email }).sort({
      createdAt: -1,
    });

    if (!latestOtpRecord) {
      return {
        success: false,
        message: "No OTP found for this email address",
        status: 404,
      };
    }

    const time = new Date();

    if (time.getTime() > latestOtpRecord.expiry) {
      return { success: false, message: "OTP has expired", status: 400 };
    }

    if (latestOtpRecord.otp !== clientOtp) {
      return { success: false, message: "Invalid OTP code", status: 401 };
    }

    await Otp.deleteOne({ _id: latestOtpRecord._id });

    return {
      success: true,
      message: "OTP verified successfully",
      status: 200,
    };
  } catch (error) {
    console.error("Error during OTP verification:", error);
    return {
      success: false,
      message: "Internal server error during verification",
      status: 500,
    };
  }
};
