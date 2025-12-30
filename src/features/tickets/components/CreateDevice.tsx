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
import useCreateDevice from "../hooks/useCreateDevice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BeatLoader } from "react-spinners";

export default function CreateDevice() {
  const {
    form,
    onSubmit,
    open,
    setOpen,
    type,
    showPhones,
    setShowPhones,
    customers,
    customerPhone,
    selectCustomer,
    isLoading,
  } = useCreateDevice();

  return (
    <div className="col-span-6 lg:col-span-1 lg:col-end-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary w-full lg:w-fit ">
            <IconCirclePlus className="mr-2 h-4 w-4" />
            Create Device
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl max-h-[100vh] p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-2xl">Create New Device</DialogTitle>
            <DialogDescription>
              Fill in the device information below. All required fields are
              marked with an asterisk (*).
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-180px)] px-6">
            <form
              id="device-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pb-6"
            >
              <Controller
                name="serialNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="serialNumber">
                      Serial Number
                    </FieldLabel>
                    <Input
                      {...field}
                      id="serialNumber"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter serial number"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="deviceId">
                      Device <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(value) => {
                        field.onChange(
                          value === "__none__" ? undefined : value
                        );
                      }}
                    >
                      <SelectTrigger
                        id="deviceId"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">None</SelectItem>
                        <SelectItem value="LAPTOP">Laptop</SelectItem>
                        <SelectItem value="CAMERA">Camera</SelectItem>
                        <SelectItem value="PRINTER">Printer</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {type === "OTHER" && (
                <Controller
                  name="otherType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      className="relative"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="otherType">
                        Other Type <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="otherType"
                        aria-invalid={fieldState.invalid}
                        placeholder="If device type is not in the list please enter it here"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )}

              <Controller
                name="brand"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="brand">
                      Brand <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="brand"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter brand name"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="model"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="model">
                      Model <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="model"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter model name"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="color"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="color">
                      Color <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="color"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter color name"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="customerPhone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="customerPhone">
                      Customer Phone <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="customerPhone"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter phone number"
                      onInput={() => setShowPhones(true)}
                    />

                    {/* Autocomplete Dropdown */}
                    {showPhones &&
                      customerPhone.length >= 3 &&
                      customerPhone.length < 8 && (
                        <div className="absolute top-full left-0 right-0 mt-1 border rounded-md shadow-lg bg-background z-50 max-h-48 overflow-auto">
                          {customers.length === 0 ? (
                            <p className="px-3 py-2 text-sm text-muted-foreground">
                              No customer found with this phone number
                            </p>
                          ) : (
                            customers.map((customer) => (
                              <button
                                key={customer.id}
                                type="button"
                                className="w-full px-3 py-2 text-sm text-left hover:bg-accent cursor-pointer transition-colors"
                                onClick={() => selectCustomer(customer)}
                              >
                                <div className="font-medium">
                                  {customer.phone}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {customer.name}
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      )}

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Hidden Customer ID */}
              <Controller
                name="customerId"
                control={form.control}
                render={({ field }) => <input type="hidden" {...field} />}
              />

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div> */}
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
              form="device-form"
              className="bg-primary"
            >
              {isLoading ? (
                <BeatLoader size={10} color="#fff" />
              ) : (
                "Create Device"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
