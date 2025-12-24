import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { verifyOTPSchema } from "../schemas/authSchemas";
import { toast } from "sonner";
import { Route } from "@/routes/auth/_layout";
import { useRouter } from "@tanstack/react-router";
import { resendOTPService } from "../services/auth.api";

export default function useOTP() {
  const [otp, setOtp] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(60);
  const { pendingPhone, verifyOtp } = useAuth();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const router = useRouter();
  const reset = useCallback(async () => {
    try {
      await resendOTPService({ phone: pendingPhone });
      setSeconds(60);
      setOtp("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }, [pendingPhone]);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    async function submitOTP() {
      const validatedData = verifyOTPSchema.safeParse({
        phone: pendingPhone,
        otp: otp,
      });

      if (!validatedData.success) {
        setOtp("");
        toast.error("The data entered is not valid");
      }
      const status = await verifyOtp(validatedData.data!);
      if (status === 200) {
        await router.invalidate();
        await navigate({ to: search.redirect || "/" });
      } else if (status === 400) {
        setOtp("");
      } else if (status === 429) {
        setOtp("");
        await reset();
      }
    }

    if (otp.length === 6) {
      submitOTP();
    }
  }, [navigate, otp, pendingPhone, router, search.redirect, verifyOtp, reset]);

  return { otp, setOtp, seconds, reset, isFinished: seconds <= 0 };
}
