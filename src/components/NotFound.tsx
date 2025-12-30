
import { Link } from "react-router";
import { Button } from "./ui/button";

export default function NotFound() {
  return (
    <div className="w-full h-lvh flex items-center flex-col justify-center gap-4 justify-center  px-8">
      <h1 className="text-[180px] font-bold bg-linear-to-r from-teal-200/30 via-teal-400/50 to-teal-500 bg-clip-text text-transparent">
        404
      </h1>
      <h4 className="text-5xl font-medium text-center">Oops! Lost in the digital woods.</h4>
      <p className="text-slate-400 text-center">
        We can't seem to find the page you are trying looking for. It might have
        been moved, deleted, or, never existed in the first place
      </p>
      <Link to="/">
        <Button>Return to home page</Button>
      </Link>
    </div>
  );
}
