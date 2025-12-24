import Logo from "./Logo";
import SignupForm from "./SignupForm";

export default function Singnup() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-180">
      <Logo />
      <SignupForm />
    </div>
  );
}
