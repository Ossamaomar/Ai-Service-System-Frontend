import Logo from "./Logo";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-180 min-h-75">
      <Logo />
      <ResetPasswordForm />
    </div>
  );
}
