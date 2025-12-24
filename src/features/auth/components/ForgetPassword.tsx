import ForgetPasswordForm from "./ForgetPasswordForm";
import Logo from "./Logo";


export default function ForgetPassword() {
  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 w-180 h-112.5">
         <Logo />
         <ForgetPasswordForm />
       </div>
  )
}
