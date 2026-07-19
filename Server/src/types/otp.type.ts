import z from "zod";

export const otpResponseSchema = z.object({
  otp: z.string({ error: "OTP is required" }),
  email: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Email is required" : "Invalid text format",
    })
    .trim()
    .email({ error: "Invalid email address format" }),
});

export const otpSchema = z.object({
  otp: z.string({ error: "OTP is required" }),
  email: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Email is required" : "Invalid text format",
    })
    .trim()
    .email({ error: "Invalid email address format" }),
  expiry: z.number(),
});

export type IOtp = z.infer<typeof otpSchema>;
