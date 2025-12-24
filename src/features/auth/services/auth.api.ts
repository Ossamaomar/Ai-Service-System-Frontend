import { api } from "@/lib/server";
import type {
  AuthResponse,
  ForgetPasswordCredentials,
  LoginCredentials,
  OTPVerification,
  ResetPasswordCredentials,
  SignupCredentials,
} from "../types/auth.types";

export async function loginService(data: LoginCredentials) {
  const res: AuthResponse = (await api.post("/auth/login", data)).data;
  return res;
}

export async function logoutService() {
  const res = (await api.get("/auth/logout")).data;
  return res;
}

export async function signupService(data: SignupCredentials) {
  const res: AuthResponse = (await api.post("/auth/signup", data)).data;
  return res;
}

export async function verfiyOTPService(data: OTPVerification) {
  const res: AuthResponse = await api.post("/auth/verifyOtp", data);
  return res;
}

export async function resendOTPService(data: { phone: string }) {
  const res: AuthResponse = await api.post("/auth/resendOtp", data);
  return res;
}

export async function forgetPasswordService(data: ForgetPasswordCredentials) {
  const res: AuthResponse = (await api.post("/auth/forgetPassword/", data)).data;
  return res;
}

export async function resetPasswordService(data: ResetPasswordCredentials, token: string) {
  const res: AuthResponse = (await api.patch(`/auth/resetPassword/${token}`, data)).data;
  return res;
}

export async function getCurrentUserService() {
  const res: AuthResponse = (await api.get("/auth/current")).data;

  return res;
}
