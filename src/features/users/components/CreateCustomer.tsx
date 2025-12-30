import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { IconCirclePlus } from "@tabler/icons-react";
import { Controller } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCreateCustomer from "../hooks/useCreateCustomer";
import { BeatLoader } from "react-spinners";

export default function CreateCustomer() {
  const { form, onSubmit, open, setOpen, isLoading } = useCreateCustomer();

  return (
    <div className="col-span-6 lg:col-span-1 lg:col-end-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary w-full lg:w-fit ">
            <IconCirclePlus className="mr-2 h-4 w-4" />
            Create Customer
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl max-h-[100vh] p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-2xl">Create New Customer</DialogTitle>
            <DialogDescription>
              Fill in the customer information below. All required fields are
              marked with an asterisk (*).
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-180px)] px-6">
            <form
              id="ticket-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      className="relative"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="name">
                        Name <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter customer name"
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
                    <Field
                      className="relative"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="phone">
                        Phone <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="phone"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter customer phone"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter customer email"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </form>
          </ScrollArea>

          <DialogFooter className="px-6 pb-6">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isLoading}
              type="submit"
              form="ticket-form"
              className="bg-primary"
            >
              {isLoading ? (
                <BeatLoader size={10} color="#fff" />
              ) : (
                "Create Customer"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
