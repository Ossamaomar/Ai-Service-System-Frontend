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

import useSignup from "../hooks/useSignup";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router";

export default function SignupForm() {
  const { form, onSubmit, isLoading } = useSignup();
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
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Enter your data below to create account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="name"
                    autoComplete="off"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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
                  <FieldLabel htmlFor="password">Password</FieldLabel>

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

            <Controller
              name="passwordConfirm"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="passwordConfirm">
                    Confirm Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="passwordConfirm"
                    aria-invalid={fieldState.invalid}
                    placeholder="confirm password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="phone number"
                    autoComplete="off"
                    type="text"
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
          <Button
            className="w-full"
            type="submit"
            form="form-rhf-demo"
            disabled={isLoading}
          >
            {isLoading ? <BeatLoader size={10} color="#fff" /> : "Create account"}
          </Button>
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="hover:underline hover:underline-offset-2"
            >
              Login
            </Link>
          </p>
        </Field>
      </CardFooter>
    </Card>
  );
}
