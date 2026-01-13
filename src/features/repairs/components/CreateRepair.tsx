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
import useCreateRepair from "../hooks/useCreateRepair";
import { BeatLoader } from "react-spinners";

export default function CreateRepair() {
  const { form, onSubmit, open, setOpen, isLoading } = useCreateRepair();

  return (
    <div className="col-span-6 lg:col-span-1 lg:col-end-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary w-full lg:w-fit ">
            <IconCirclePlus className="mr-2 h-4 w-4" />
            Create Repair
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl max-h-[100vh] p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-2xl">Create New Repair</DialogTitle>
            <DialogDescription>
              Fill in the repair information below. All required fields are marked
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
                      Repair Name <span className="text-destructive">*</span>
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
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sellingPrice">
                      Price <span className="text-destructive">*</span>
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
                "Create Repair"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
