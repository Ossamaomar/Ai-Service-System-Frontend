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
      setAuth((data) => ({ ...data, isLoading: true }));
      const { data } = await getCurrentUserService();

      setAuth({
        user: data,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true,
        pendingPhone: "",
      });
    } catch {
      console.log("refresh error");
      localStorage.removeItem(USER_KEY);
      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: false,
        pendingPhone: "",
      });
    }
  }, []);

  useEffect(() => {
    async function initializeAuth() {
      console.log("AUTH INIT");
      const savedUser = localStorage.getItem(USER_KEY);

      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setAuth({
            user,
            isAuthenticated: true,
            isLoading: true, // Still loading because we need to verify with server
            isInitialized: false,
            pendingPhone: "",
          });
        } catch {
          localStorage.removeItem(USER_KEY);
        } finally {
          setAuth((prev) => ({ ...prev, isLoading: false }));
        }
      }

      await refresh();
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
      console.log(user);
      toast.success("Welcome");
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
      setAuth((prev) => ({ ...prev, isLoading: false }));
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true }));
      const res = await logoutService();

      setAuth({
        user: null,
        isAuthenticated: false,
        isInitialized: true,
        isLoading: false,
        pendingPhone: "",
      });
      toast.success(res.message)
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
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
      console.log(user);
      toast.success("Welcome");
      return 200;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      setAuth((prev) => ({ ...prev, isLoading: false }));
      return error.status;
    }
  }, []);

  const signup = useCallback(async (data: SignupCredentials) => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true }));
      const { data: user, message } = await signupService(data);
      console.log(user);
      setAuth({
        user,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
        pendingPhone: user.phone,
      });
      toast.success(message);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
      setAuth((prev) => ({ ...prev, isLoading: false }));
      return false;
    }
  }, []);

  return (
    <AuthContext value={{ ...auth, login, signup, verifyOtp, logout, refresh }}>
      {children}
    </AuthContext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
