import { z } from "zod";

export const userSocietySchema = z.object({
  // Use a functional error map handler to intercept undefined inputs
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Society name is required"
          : "Invalid text format",
    })
    .trim()
    .min(1, { error: "Society name is required" }), // In v4, pass constraints in an object with 'error' key

  address: z.object({
    flatNo: z.string().trim().optional(),
    towerNo: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Tower/Wing number is required"
            : "Invalid text format",
      })
      .trim()
      .min(1, { error: "Tower/Wing number is required" }),
  }),
});

export const userSignUpSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required" : "Invalid text format",
    })
    .trim()
    .min(1, { error: "Name is required" }),

  email: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Email is required" : "Invalid text format",
    })
    .trim()
    .email({ error: "Invalid email address format" }),

  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is required"
          : "Invalid text format",
    })
    .trim()
    .min(6, { error: "Password must be at least 6 characters" }),

  avatar: z
    .array(z.string().url({ error: "Invalid avatar URL format" }))
    .min(1, { error: "At least one avatar image is required" })
    .optional(),

  role: z.enum(["user", "admin", "security"]).default("user"),
  refreshToken: z.array(z.string()).optional(),
  society: z.array(userSocietySchema).optional(),
  isVerified: z.boolean().default(false),
});

export type IUser = z.infer<typeof userSignUpSchema>;

export const userSignInSchema = z.object({
  email: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Email is required" : "Invalid text format",
    })
    .trim()
    .email({ error: "Invalid email address format" }),

  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is required"
          : "Invalid text format",
    })
    .trim()
    .min(1, { error: "Password cannot be empty" }),
});
