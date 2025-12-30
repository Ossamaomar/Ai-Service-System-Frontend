/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  AuthState,
  LoginCredentials,
  OTPVerification,
  SignupCredentials,
  User,
} from "../types/auth.types";
import {
  getCurrentUserService,
  loginService,
  logoutService,
  signupService,
  verfiyOTPService,
} from "../services/auth.api";
import { toast } from "sonner";

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<boolean>;
  signup: (credentials: SignupCredentials) => Promise<boolean>;
  verifyOtp: (credentials: OTPVerification) => Promise<number>;
  refresh: () => Promise<void>;
  updateUser: (data: User) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const USER_KEY = "auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    isInitialized: false,
    pendingPhone: "",
  });

  const refresh = useCallback(async () => {
    try {
      const { data } = await getCurrentUserService();

      setAuth((prev) => ({
        ...prev,
        user: data,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true,
      }));

      localStorage.setItem(USER_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Refresh error:", error);
      localStorage.removeItem(USER_KEY);

      setAuth((prev) => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
      }));
    }
  }, []);

  useEffect(() => {
    async function initializeAuth() {
      console.log("AUTH INIT");
      const savedUser = localStorage.getItem(USER_KEY);

      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);

          // Set user from localStorage immediately
          setAuth({
            user,
            isAuthenticated: true,
            isLoading: true,
            isInitialized: false,
            pendingPhone: "",
          });

          // Verify with server
          await refresh();
        } catch (error) {
          console.error("Init error:", error);
          localStorage.removeItem(USER_KEY);

          setAuth({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isInitialized: true,
            pendingPhone: "",
          });
        }
      } else {
        // No saved user
        setAuth({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
          pendingPhone: "",
        });
      }
    }

    initializeAuth();
  }, [refresh]);

  const login = useCallback(async (data: LoginCredentials) => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true }));
      const { data: user } = await loginService(data);

      localStorage.setItem(USER_KEY, JSON.stringify(user));
      setAuth({
        user,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true,
        pendingPhone: "",
      });

      toast.success("Welcome back!");
      return true;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
      setAuth((prev) => ({ ...prev, isLoading: false }));
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true }));
      const res = await logoutService();

      localStorage.removeItem(USER_KEY);
      setAuth({
        user: null,
        isAuthenticated: false,
        isInitialized: true,
        isLoading: false,
        pendingPhone: "",
      });

      toast.success(res.message || "Logged out successfully");
      return true;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Logout failed");
      return false;
    } finally {
      setAuth((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const verifyOtp = useCallback(async (data: OTPVerification) => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true }));
      const { data: user } = await verfiyOTPService(data);

      localStorage.setItem(USER_KEY, JSON.stringify(user));
      setAuth({
        user,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true,
        pendingPhone: "",
      });

      toast.success("Welcome!");
      return 200;
    } catch (error: any) {
      console.error("OTP verification error:", error);
      toast.error(error?.response?.data?.message || "Verification failed");
      setAuth((prev) => ({ ...prev, isLoading: false }));
      return error?.status || 400;
    }
  }, []);

  const updateUser = useCallback((data: User) => {
    setAuth((prev) => ({
      ...prev,
      user: data,
    }));
    localStorage.setItem(USER_KEY, JSON.stringify(data));
  }, []);

  const signup = useCallback(async (data: SignupCredentials) => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true }));
      const { data: user, message } = await signupService(data);

      setAuth({
        user,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
        pendingPhone: user.phone,
      });

      toast.success(message || "Please verify your phone");
      return true;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup failed");
      setAuth((prev) => ({ ...prev, isLoading: false }));
      return false;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...auth, login, signup, verifyOtp, logout, refresh, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
