import { Card, CardContent } from "@/components/ui/card";
import { XIcon } from "lucide-react";

export default function InvalidOtpSession() {
  return (
    <Card className="w-full sm:max-w-87.5 flex justify-center rounded-xl">
      <CardContent>
        <div className="flex justify-center items-center flex-col gap-4">
          <div className="">
            <XIcon
              className="w-14 h-14 border-2 rounded-full border-teal-600"
              style={{
                stroke: "url(#red-gradient)",
              }}
            />

            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="red-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="#b91c1c" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="text-slate-700">Invalid OTP session</p>
        </div>
      </CardContent>
    </Card>
  );
}
