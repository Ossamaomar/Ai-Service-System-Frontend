export enum UserRoles {
  ADMIN = "ADMIN",
  RECEPTIONIST = "RECEPTIONIST",
  TECHNICIAN = "TECHNICIAN",
  CUSTOMER = "CUSTOMER",
  STORE_MANAGER = "STORE_MANAGER",
}
export enum Branches {
  FARQ = "FARQ",
  SOUQ = "SOUQ",
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRoles;
  branch: Branches | null;
  isPhoneVerified: boolean;
  passwordChangedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  pendingPhone: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  // role?: UserRoles;
}

export interface OTPVerification {
  phone: string;
  otp: string;
}
export interface ForgetPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  password: string;
  passwordConfirm: string;
}

export interface AuthResponse {
  status: string;
  data: User;
  message: string;
}
