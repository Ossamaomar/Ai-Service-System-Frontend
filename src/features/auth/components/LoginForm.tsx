import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import aiLogoTransparent from "@/assets/ai-logo-transparent.jpg";
import useLogin from "../hooks/useLogin";
import { Link } from "@tanstack/react-router";
import { BeatLoader } from "react-spinners";
export default function LoginForm() {
  const { form, onSubmit, isLoading } = useLogin();

  return (
    <Card className="w-full flex justify-center sm:rounded-none sm:rounded-r-xl">
      <CardHeader>
        <div className="sm:hidden flex justify-center mb-4">
          <img
            src={aiLogoTransparent}
            alt="AI Logo"
            className="w-30 object-contain"
          />
        </div>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link
                      to="/auth/forgetPassword"
                      className="text-sm font-normal hover:underline hover:underline-offset-2"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="flex flex-col">
          <Button className="w-full" type="submit" form="form-rhf-demo" disabled={isLoading}>
            {isLoading ? <BeatLoader size={10} color="#fff" /> : "Login"}
          </Button>
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="hover:underline hover:underline-offset-2"
            >
              Sign up
            </Link>
          </p>
        </Field>
      </CardFooter>
    </Card>
  );
}
