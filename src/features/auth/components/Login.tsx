import LoginForm from "./LoginForm";
import Logo from "./Logo";

export default function Login() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-180 h-112.5">
      <Logo />
      <LoginForm />
    </div>
  );
}
