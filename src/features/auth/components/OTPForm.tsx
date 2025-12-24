import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
// import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import aiLogoTransparent from "@/assets/ai-logo-transparent.jpg";
import useOTP from "../hooks/useOTP";

export default function OTPForm() {
  const { otp, setOtp, seconds, isFinished, reset } = useOTP();

  return (
    <Card className="w-full sm:max-w-87.5 flex justify-center sm:rounded-none sm:rounded-r-xl">
      <CardHeader>
        <div className="sm:hidden flex justify-center mb-4">
          <img
            src={aiLogoTransparent}
            alt="AI Logo"
            className="w-30 object-contain"
          />
        </div>
        <CardTitle className="text-center">Enter Your OTP</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 flex justify-center flex-col items-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            disabled={otp.length === 6}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center text-sm">
            {isFinished ? (
              <p className="text-sm text-gray-500 hover:underline cursor-pointer" onClick={reset}>
                Resend OTP
              </p>
            ) : (
              <p className="text-sm text-gray-500">Time remaining {seconds}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
