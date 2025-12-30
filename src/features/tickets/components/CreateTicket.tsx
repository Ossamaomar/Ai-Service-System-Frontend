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
import {
  Field,
  FieldError,
  // FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IconCirclePlus } from "@tabler/icons-react";
import { Controller } from "react-hook-form";
import useCreateTicket from "../hooks/useCreateTicket";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BeatLoader } from "react-spinners";

export default function CreateTicket() {
  const {
    form,
    onSubmit,
    setShowPhones,
    showPhones,
    customers,
    customerPhone,
    selectCustomer,
    devices,
    technicians,
    user,
    open,
    setOpen,
    isLoading,
  } = useCreateTicket();

  return (
    <div className="col-span-6 lg:col-span-1 lg:col-end-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary w-full lg:w-fit">
            <IconCirclePlus className="mr-2 h-4 w-4" />
            Create Ticket
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl max-h-[100vh] p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-2xl">Create New Ticket</DialogTitle>
            <DialogDescription>
              Fill in the ticket information below. All required fields are
              marked with an asterisk (*).
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-180px)] px-6">
            <form
              id="ticket-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pb-6"
            >
              {/* Customer & Device Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer & Device</CardTitle>
                  <CardDescription>
                    Select the customer and their device
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Customer Phone with Autocomplete */}
                    <Controller
                      name="customerPhone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          className="relative"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldLabel htmlFor="customerPhone">
                            Customer Phone{" "}
                            <span className="text-destructive">*</span>
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

                    {/* Device Select */}
                    <Controller
                      name="deviceId"
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
                              <SelectValue placeholder="Select device" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__none__">None</SelectItem>
                              {devices && devices.length > 0 ? (
                                devices.map((device) => (
                                  <SelectItem key={device.id} value={device.id}>
                                    {`${device.type} - ${device.brand} - ${device.color}`}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem disabled value="no-devices">
                                  No devices available
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Assignment Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assignment</CardTitle>
                  <CardDescription>
                    Assign technician and branch
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Technician Select */}
                    <Controller
                      name="assignedTechId"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="assignedTechId">
                            Assigned Technician
                          </FieldLabel>
                          <Select
                            value={field.value ?? undefined}
                            onValueChange={(value) => {
                              field.onChange(
                                value === "__none__" ? undefined : value
                              );
                            }}
                          >
                            <SelectTrigger
                              id="assignedTechId"
                              aria-invalid={fieldState.invalid}
                            >
                              <SelectValue placeholder="Select technician (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__none__">None</SelectItem>
                              {technicians && technicians.length > 0 ? (
                                technicians.map((technician) => (
                                  <SelectItem
                                    key={technician.id}
                                    value={technician.id}
                                  >
                                    {technician.name}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem disabled value="no-techs">
                                  No technicians available
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* Branch */}
                    <Controller
                      name="branch"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="branch">
                            Branch <span className="text-destructive">*</span>
                          </FieldLabel>
                          <div className="relative">
                            <Input
                              {...field}
                              id="branch"
                              value={user?.branch ?? ""}
                              disabled
                              aria-invalid={fieldState.invalid}
                              className="pr-16"
                            />
                            <Badge
                              variant="secondary"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                            >
                              Auto
                            </Badge>
                          </div>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Additional Information
                  </CardTitle>
                  <CardDescription>
                    Optional details about the ticket
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Password */}
                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="password">
                            Device Password
                          </FieldLabel>
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter device password"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    {/* Urgent Checkbox */}
                    <Controller
                      name="urgent"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Priority</FieldLabel>
                          <div className="flex items-center gap-2 h-10">
                            <Checkbox
                              id="urgent"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <FieldLabel
                              htmlFor="urgent"
                              className="font-normal cursor-pointer"
                            >
                              Mark as urgent
                            </FieldLabel>
                          </div>
                          {fieldState.invalid && (
                            <FieldError>{fieldState.error?.message}</FieldError>
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  {/* Notes - Full Width */}
                  <Controller
                    name="notes"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="notes">Notes</FieldLabel>
                        <Textarea
                          {...field}
                          id="notes"
                          aria-invalid={fieldState.invalid}
                          placeholder="Add any additional notes about the ticket..."
                          rows={3}
                          className="resize-none"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Device Condition */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Device Condition</CardTitle>
                  <CardDescription>
                    Check all that apply to the device
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Includes Battery */}
                    <Controller
                      name="includesBattery"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="includesBattery"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel
                            htmlFor="includesBattery"
                            className="font-normal cursor-pointer"
                          >
                            Includes Battery
                          </FieldLabel>
                        </div>
                      )}
                    />

                    {/* Includes Charger */}
                    <Controller
                      name="includesCharger"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="includesCharger"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel
                            htmlFor="includesCharger"
                            className="font-normal cursor-pointer"
                          >
                            Includes Charger
                          </FieldLabel>
                        </div>
                      )}
                    />

                    {/* Missing Screws */}
                    <Controller
                      name="missingSkrews"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="missingSkrews"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel
                            htmlFor="missingSkrews"
                            className="font-normal cursor-pointer"
                          >
                            Missing Screws
                          </FieldLabel>
                        </div>
                      )}
                    />

                    {/* Has Scratches */}
                    <Controller
                      name="hasScratches"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="hasScratches"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel
                            htmlFor="hasScratches"
                            className="font-normal cursor-pointer"
                          >
                            Has Scratches
                          </FieldLabel>
                        </div>
                      )}
                    />

                    {/* Under Warranty */}
                    <Controller
                      name="underWarranty"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="underWarranty"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel
                            htmlFor="underWarranty"
                            className="font-normal cursor-pointer"
                          >
                            Under Warranty
                          </FieldLabel>
                        </div>
                      )}
                    />

                    {/* Wants Backup */}
                    <Controller
                      name="wantsBackup"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="wantsBackup"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel
                            htmlFor="wantsBackup"
                            className="font-normal cursor-pointer"
                          >
                            Wants Backup
                          </FieldLabel>
                        </div>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </form>
          </ScrollArea>

          <Separator />

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
                "Create Ticket"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
