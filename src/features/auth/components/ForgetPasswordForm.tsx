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
import useForgetPassword from "../hooks/useForgetPassword";

export default function ForgetPasswordForm() {
  const { form, onSubmit, isLoading } = useForgetPassword();
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
        <CardTitle>Forget Your Passwword</CardTitle>
        <CardDescription>
          Enter your email below to send a reset link
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
            {isLoading ? <BeatLoader size={10} color="#fff" /> : "Send link"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
