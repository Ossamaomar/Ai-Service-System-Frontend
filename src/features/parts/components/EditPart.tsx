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
import { Controller } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BeatLoader } from "react-spinners";
import type { Part } from "@/features/tickets/types/tickets.types";
import useEditPart from "../hooks/useEditPart";
import { FiEdit } from "react-icons/fi";

export default function EditPart({ part }: { part: Part }) {
  const { form, onSubmit, open, setOpen, isLoading, user } = useEditPart(part);

  return (
    <div className="col-span-6 lg:col-span-1 lg:col-end-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="w-full lg:w-fit cursor-pointer transition duration-300 border border-transparent hover:border-slate-300"
          >
            <FiEdit className="text-yellow-600/80" />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl max-h-[100vh] p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-2xl">Edit Part</DialogTitle>
            <DialogDescription>
              Fill in the part information below. All required fields are marked
              with an asterisk (*).
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-180px)] px-6">
            <form
              id="part-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pb-6"
            >
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">
                      Part Name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter part name"
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
                    <FieldLabel htmlFor="model">Model</FieldLabel>
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
                name="branch"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="branch">
                      Branch <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(value) => {
                        field.onChange(
                          value === "__none__" ? undefined : value
                        );
                      }}
                      disabled={
                        user?.role !== "ADMIN" && user?.role !== "STORE_MANAGER"
                          ? true
                          : false
                      }
                    >
                      <SelectTrigger
                        id="branch"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">None</SelectItem>
                        <SelectItem value="FARQ">Farq</SelectItem>
                        <SelectItem value="SOUQ">Souq</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="sellingPrice"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sellingPrice">
                      Selling Price <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="sellingPrice"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter part selling price"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="quantity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="quantity">
                      Quantity <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="quantity"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter part selling price"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="minimumQuantity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="minimumQuantity">
                      Min. Quantity <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="minimumQuantity"
                      type="number"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter part selling price"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
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
              form="part-form"
              className="bg-primary"
            >
              {isLoading ? (
                <BeatLoader size={10} color="#fff" />
              ) : (
                "Edit Part"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
