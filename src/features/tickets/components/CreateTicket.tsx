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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { IconCirclePlus } from "@tabler/icons-react";
import { Controller } from "react-hook-form";
import useCreateTicket from "../hooks/useCreateTicket";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    setOpen
  } = useCreateTicket();

  return (
    <div className="col-span-6 lg:col-span-1 lg:col-end-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <form id="ticket-form" onSubmit={form.handleSubmit(onSubmit)}>
          <DialogTrigger asChild>
            <Button className="bg-primary w-full lg:w-fit">
              <IconCirclePlus /> Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[750px]">
            <DialogHeader>
              <DialogTitle>Create ticket</DialogTitle>
              <DialogDescription>
                Fill the tickets information here. Click submit when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <div className="flex gap-2">
                <Controller
                  name="customerPhone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      className="relative"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="customerPhone">
                        Customer Phone
                      </FieldLabel>
                      <Input
                        {...field}
                        id="customerPhone"
                        aria-invalid={fieldState.invalid}
                        placeholder="Search customer by phone number"
                        onInput={() => setShowPhones(true)}
                        // onBlur={() => setShowPhones(false)}
                      />
                      {showPhones &&
                        customerPhone.length >= 3 &&
                        customerPhone.length < 8 && (
                          <div className="border text rounded-md absolute bottom-0 translate-y-full z-40 bg-white">
                            {customers.length === 0 && (
                              <p className="px-3 py-1 text-sm">
                                No customer found with this phone number
                              </p>
                            )}

                            {customers.map((customer) => (
                              <p
                                key={customer.id}
                                className="px-3 py-1 text-sm cursor-pointer hover:bg-gray-100"
                                onClick={selectCustomer}
                              >
                                {customer.phone}
                              </p>
                            ))}
                          </div>
                        )}

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="customerId"
                  control={form.control}
                  render={({ field }) => <input type="hidden" {...field} />}
                />

                <Controller
                  name="deviceId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="deviceId">Device</FieldLabel>

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
                          <SelectItem value="__none__" className="">
                            None
                          </SelectItem>
                          {devices && devices.length > 0 ? (
                            devices.map((device) => (
                              <SelectItem key={device.id} value={device.id}>
                                {`${device.type}-${device.brand}-${device.color}`}
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
              <div className="flex gap-2">
                <Controller
                  name="assignedTechId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="assignedTechId">
                        Technician
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
                          <SelectItem value="__none__" className="">
                            None
                          </SelectItem>
                          {technicians &&
                            technicians.length > 0 &&
                            technicians.map((technician) => (
                              <SelectItem
                                key={technician.id}
                                value={technician.id}
                              >
                                {technician.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="branch"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="branch">Branch</FieldLabel>
                      <Input
                        {...field}
                        id="branch"
                        value={user?.branch ?? undefined}
                        disabled
                        aria-invalid={fieldState.invalid}
                        placeholder="branch"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="flex gap-2">
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
                        placeholder="Password (optional)"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="notes"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="notes">Notes</FieldLabel>
                      <Input
                        {...field}
                        id="notes"
                        aria-invalid={fieldState.invalid}
                        placeholder="Write notes about the ticket (optional)"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="flex justify-between items-center">
                <Controller
                  name="urgent"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          id="urgent"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldLabel htmlFor="urgent">Mark as urgent</FieldLabel>
                      </div>

                      {fieldState.invalid && (
                        <FieldError>{fieldState.error?.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="includesCharger"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          id="includesCharger"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldLabel htmlFor="includesCharger">
                          Includes charger
                        </FieldLabel>
                      </div>

                      {fieldState.invalid && (
                        <FieldError>{fieldState.error?.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="flex justify-between items-center">
                <Controller
                  name="includesBattery"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          id="includesBattery"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldLabel htmlFor="includesBattery">
                          Includes battery
                        </FieldLabel>
                      </div>

                      {fieldState.invalid && (
                        <FieldError>{fieldState.error?.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="missingSkrews"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          id="missingSkrews"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldLabel htmlFor="missingSkrews">
                          Missing skrews
                        </FieldLabel>
                      </div>

                      {fieldState.invalid && (
                        <FieldError>{fieldState.error?.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="flex justify-between items-center">
                <Controller
                  name="underWarranty"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          id="underWarranty"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldLabel htmlFor="underWarranty">
                          Under warranty
                        </FieldLabel>
                      </div>

                      {fieldState.invalid && (
                        <FieldError>{fieldState.error?.message}</FieldError>
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="hasScratches"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          id="hasScratches"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldLabel htmlFor="hasScratches">
                          Has scratches
                        </FieldLabel>
                      </div>

                      {fieldState.invalid && (
                        <FieldError>{fieldState.error?.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="wantsBackup"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex gap-2 items-center">
                      <Checkbox
                        id="wantsBackup"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldLabel htmlFor="wantsBackup">
                        Wants backup
                      </FieldLabel>
                    </div>

                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" form="ticket-form">
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
