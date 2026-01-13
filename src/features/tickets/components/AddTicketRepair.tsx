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
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { Repair } from "../types/tickets.types";
import { BeatLoader } from "react-spinners";
import useAddTicketRepair from "../hooks/useAddTicketRepair";

export function AddTicketRepair({ ticketId }: { ticketId: string }) {
  const { open, setOpen, isLoading, form, data, handleSubmit, selectedRepair } =
    useAddTicketRepair(ticketId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <IconPlus className="h-4 w-4" />
          Add Repair
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Repair to Ticket</DialogTitle>
          <DialogDescription>Select a repair from inventory</DialogDescription>
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
                name="repairId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="repairId">Repair</FieldLabel>
                    <Select
                      value={field.value ?? undefined}
                      onValueChange={(value) => {
                        field.onChange(
                          value === "__none__" ? undefined : value
                        );
                      }}
                    >
                      <SelectTrigger
                        id="repairId"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select a repair" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">None</SelectItem>
                        {data?.data.data && data.data.data.length > 0 ? (
                          data?.data.data.map((repair: Repair) => (
                            <SelectItem key={repair.id} value={repair.id}>
                              <div className="flex items-center justify-between w-full gap-4">
                                <span>{repair.name}</span>
                                <Badge variant="outline">
                                  {repair.price} OMR
                                </Badge>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-repairs" disabled>
                            No repairs available
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

            {/* Selected Repair Info */}
            {selectedRepair && (
              <div className="p-3 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Repair Service:
                  </span>
                  <span className="text-sm font-medium">
                    {selectedRepair.name}
                  </span>
                </div>
                {selectedRepair?.description && (
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Description:
                    </span>
                    <p className="text-sm mt-1">{selectedRepair.description}</p>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Standard Price:
                  </span>
                  <span className="text-sm font-medium">
                    {selectedRepair.price} OMR
                  </span>
                </div>
              </div>
            )}
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
              {isLoading ? <BeatLoader size={10} color="#fff" /> : "Add Repair"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
