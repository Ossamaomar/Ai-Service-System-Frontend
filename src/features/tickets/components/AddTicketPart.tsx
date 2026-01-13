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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconPlus } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import useAddTicketPart from "../hooks/useAddTicketPart";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { Part } from "../types/tickets.types";
import { BeatLoader } from "react-spinners";
import { Input } from "@/components/ui/input";

export function AddTicketPart({ ticketId }: { ticketId: string }) {
  const { open, setOpen, isLoading, form, data, handleSubmit, selectedPart } =
    useAddTicketPart(ticketId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <IconPlus className="h-4 w-4" />
          Add Part
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Part to Ticket</DialogTitle>
          <DialogDescription>
            Select a part from inventory and specify quantity
          </DialogDescription>
        </DialogHeader>

        <form
          id="ticket-part-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 pb-4"
        >
          <div className="space-y-4 py-4">
            {/* Part Selection */}

            <div className="space-y-2">
              <Controller
                name="partId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="part">Part</FieldLabel>
                    <Select
                      value={field.value ?? undefined}
                      onValueChange={(value) => {
                        field.onChange(
                          value === "__none__" ? undefined : value
                        );
                      }}
                    >
                      <SelectTrigger
                        id="part"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select a part" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">None</SelectItem>
                        {data?.data.data && data.data.data.length > 0 ? (
                          data.data.data.map((part: Part) => (
                            <SelectItem
                              key={part.id}
                              value={part.id}
                              disabled={part.quantity < 1}
                            >
                              <div className="flex items-center justify-between w-full gap-4">
                                <span>{part.name}</span>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">
                                    {part.sellingPrice} OMR
                                  </Badge>
                                  <Badge
                                    variant={
                                      part.quantity > 0
                                        ? "default"
                                        : "destructive"
                                    }
                                  >
                                    Stock: {part.quantity}
                                  </Badge>
                                </div>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-parts" disabled>
                            No parts available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              ></Controller>
            </div>

            {/* Selected Part Info */}
            {selectedPart && (
              <div className="p-3 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Part Name:
                  </span>
                  <span className="text-sm font-medium">
                    {selectedPart.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Part Model:
                  </span>
                  <span className="text-sm font-medium">
                    {selectedPart.model}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Standard Price:
                  </span>
                  <span className="text-sm font-medium">
                    {selectedPart.sellingPrice} OMR
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Available Stock:
                  </span>
                  <Badge
                    variant={selectedPart.stock > 0 ? "default" : "destructive"}
                  >
                    {selectedPart.quantity} units
                  </Badge>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <Controller
                name="quantity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="part">Quantity</FieldLabel>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max={selectedPart?.quantity || 999}
                      value={field.value}
                      onChange={(e) =>
                        form.setValue("quantity", Number(e.target.value) || 1)
                      }
                      placeholder="Enter quantity"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              ></Controller>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isLoading}
              type="submit"
              form="ticket-part-form"
              className="bg-primary"
            >
              {isLoading ? <BeatLoader size={10} color="#fff" /> : "Add Part"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
