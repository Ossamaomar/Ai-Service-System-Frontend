import { useAuth } from "../contexts/AuthContext";
import InvalidOtpSession from "./InvalidOtpSession";
import Logo from "./Logo";
import OTPForm from "./OTPForm";

export default function OTP() {
  const { pendingPhone, isLoading } = useAuth();

  if (!pendingPhone && !isLoading) {
    return <InvalidOtpSession />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-180 min-h-75">
      <Logo />
      <OTPForm />
    </div>
  );
}
