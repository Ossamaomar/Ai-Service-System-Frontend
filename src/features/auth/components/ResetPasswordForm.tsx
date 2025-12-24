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
import { Controller } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import aiLogoTransparent from "@/assets/ai-logo-transparent.jpg";
import useResetPassword from "../hooks/useResetPassword";

export default function ResetPasswordForm() {
  const { form, isLoading, onSubmit } = useResetPassword();
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
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          Enter your new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
                  <FieldLabel htmlFor="passwordConfirm">Confirm Password</FieldLabel>

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
            {isLoading ? (
              <BeatLoader size={10} color="#fff" />
            ) : ( 
              "Reset password"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
