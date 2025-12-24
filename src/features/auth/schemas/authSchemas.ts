import z from "zod"; 
import { Branches } from "../types/auth.types";

export const userLoginSchema = z.object({
  email: z.email("Please provide a valid email").trim().toLowerCase(),
  password: z.string(),
});

export const userSignupSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),

    email: z.email("Please provide a valid email").trim().toLowerCase(),

    phone: z
      .string()
      .regex(
        /^[79]\d{7}$/,
        "Phone number must be an Omani number (8 digits starting with 7 or 9)"
      ),

    // password: z.string().min(8, "Password must be at least 8 characters"),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[a-z]/, "Must contain lowercase letter")
      .regex(/[0-9]/, "Must contain number")
      .regex(/[^A-Za-z0-9]/, "Must contain symbol"),

    passwordConfirm: z.string().min(1, "Password confirmation is required"),

    // role: z
    //   .enum([
    //     "ADMIN",
    //     "RECEPTIONIST",
    //     "TECHNICIAN",
    //     "STORE_MANAGER",
    //     "CUSTOMER",
    //   ])
    //   .default("CUSTOMER"),
    branch: z.enum(Branches).optional().nullable(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export const verifyOTPSchema = z.object({
  phone: z
    .string()
    .regex(
      /^[79]\d{7}$/,
      "Phone number must be an Omani number (8 digits starting with 7 or 9)"
    ),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const forgetPasswordSchema = z.object({
  email: z.email("Please provide a valid email").trim().toLowerCase(),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[a-z]/, "Must contain lowercase letter")
      .regex(/[0-9]/, "Must contain number")
      .regex(/[^A-Za-z0-9]/, "Must contain symbol"),

    passwordConfirm: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });