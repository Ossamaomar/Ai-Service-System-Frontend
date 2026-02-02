import { TicketQRCode } from "./TicketQRCode";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader";
import { TicketStatusBadge } from "./TicketStatusBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  IconUser,
  IconTool,
  IconDeviceMobile,
  IconPackage,
  IconSettings,
  IconMinus,
  IconMapPin,
} from "@tabler/icons-react";
import { AddTicketPart } from "./AddTicketPart";
import { AddTicketRepair } from "./AddTicketRepair";
import { Button } from "@/components/ui/button";
import { MdOutlineDateRange, MdOutlineDeleteForever } from "react-icons/md";
import useTicket from "../hooks/useTicket";

export default function Ticket() {
  const {
    canEdit,
    deletePartMutation,
    deleteRepairMutation,
    isError,
    isLoading,
    ticket,
    ticketId,
  } = useTicket();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <Loader />
      </div>
    );
  }

  if (isError || !ticket) {
    toast.error("Failed to load ticket");
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Ticket Not Found</CardTitle>
            <CardDescription>
              The ticket you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">
              Ticket #{ticket.ticketNumber}
            </h1>
            <TicketStatusBadge status={ticket.status} />
            {ticket.urgent ? (
              <div className="bg-red-400 text-white text-sm px-2 py-1 rounded-2xl">
                Urgent
              </div>
            ) : (
              <></>
            )}
          </div>
          <p className="text-muted-foreground flex items-center gap-2">
            <IconDeviceMobile className="h-4 w-4" />
            Device Code:{" "}
            <span className="font-medium">{ticket.device?.deviceCode}</span>
          </p>
          <p className="text-muted-foreground flex items-center gap-2">
            <IconMapPin className="h-4 w-4" />
            Branch: <Badge variant="outline">{ticket.branch}</Badge>
          </p>
          <p className="text-muted-foreground flex items-center gap-2">
            <MdOutlineDateRange className="h-4 w-4" />
            Assigning Date:{" "}
            <Badge variant="outline">{ticket.assignedAt.slice(0, 10)}</Badge>
          </p>
        </div>

        {/* QR Code */}
        <div className="flex-shrink-0 flex justify-center">
          <TicketQRCode ticketId={ticketId!} />
        </div>
      </div>

      <Separator />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconUser className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ticket.customer ? (
              <>
                <div className="flex gap-4">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{ticket.customer.name}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{ticket.customer.phone}</span>
                </div>
                {ticket.customer.email && (
                  <div className="flex gap-4">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{ticket.customer.email}</span>
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground">No customer assigned</p>
            )}
          </CardContent>
        </Card>

        {/* Assigned Technician */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconTool className="h-5 w-5" />
              Assigned Technician
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ticket.assignedTech ? (
              <>
                <div className="flex gap-4">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">
                    {ticket.assignedTech.name}
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">
                    {ticket.assignedTech.phone}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <IconMinus className="h-4 w-4" />
                <span>No technician assigned</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Device Condition */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconDeviceMobile className="h-5 w-5" />
            Device Condition
          </CardTitle>
          <CardDescription>
            Condition of the device at the time of receipt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="includesBattery"
                checked={ticket.includesBattery}
                disabled
              />
              <Label
                htmlFor="includesBattery"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Includes Battery
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="includesCharger"
                checked={ticket.includesCharger}
                disabled
              />
              <Label
                htmlFor="includesCharger"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Includes Charger
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="missingSkrews"
                checked={ticket.missingSkrews}
                disabled
              />
              <Label
                htmlFor="missingSkrews"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Missing Screws
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="hasScratches"
                checked={ticket.hasScratches}
                disabled
              />
              <Label
                htmlFor="hasScratches"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Has Scratches
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="wantsBackup"
                checked={ticket.wantsBackup}
                disabled
              />
              <Label
                htmlFor="wantsBackup"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Wants Backup
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="underWarranty"
                checked={ticket.underWarranty}
                disabled
              />
              <Label
                htmlFor="underWarranty"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Under Warranty
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parts and Repairs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Parts Used */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <IconPackage className="h-5 w-5" />
                  Parts Used
                </CardTitle>
                <CardDescription>
                  {ticket.parts?.length || 0} part(s) used in this repair
                </CardDescription>
              </div>
              {canEdit && <AddTicketPart ticketId={ticketId!} />}
            </div>
          </CardHeader>
          <CardContent>
            {ticket.parts && ticket.parts.length > 0 ? (
              <div className="space-y-3">
                {ticket.parts.map((part, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start p-3 rounded-lg border bg-card"
                  >
                    <div>
                      <p className="font-medium">{part.part?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {part.quantity || 1}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <Badge variant="secondary">
                        {part.priceAtUse?.toFixed(2) || "0.00"} OMR
                      </Badge>

                      {canEdit && (
                        <Button
                          size={"icon-sm"}
                          className="bg-red-200 text-red-600 hover:bg-red-500 hover:text-white cursor-pointer"
                          onClick={() => deletePartMutation.mutate(part.id)}
                        >
                          <MdOutlineDeleteForever />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Parts Cost:</span>
                  <span className="text-lg">
                    {ticket.parts
                      .reduce(
                        (sum, part) =>
                          sum + (part.priceAtUse * part.quantity || 0),
                        0
                      )
                      .toFixed(2)}{" "}
                    OMR
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">
                No parts used yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Repairs Done */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <IconSettings className="h-5 w-5" />
                  Repairs Done
                </CardTitle>
                <CardDescription>
                  {ticket.repairs?.length || 0} repair(s) performed
                </CardDescription>
              </div>
              {canEdit && <AddTicketRepair ticketId={ticketId!} />}
            </div>
          </CardHeader>
          <CardContent>
            {ticket.repairs && ticket.repairs.length > 0 ? (
              <div className="space-y-3">
                {ticket.repairs.map((repair, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start p-3 rounded-lg border bg-card"
                  >
                    <div>
                      <p className="font-medium">{repair.repair?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Service charge
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Badge variant="secondary">
                        {repair.priceAtUse?.toFixed(2) || "0.00"} OMR
                      </Badge>

                      {canEdit && (
                        <Button
                          size={"icon-sm"}
                          className="bg-red-200 text-red-600 hover:bg-red-500 hover:text-white cursor-pointer"
                          onClick={() => deleteRepairMutation.mutate(repair.id)}
                        >
                          <MdOutlineDeleteForever />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Repair Cost:</span>
                  <span className="text-lg">
                    {ticket.repairs
                      .reduce(
                        (sum, repair) => sum + (repair.priceAtUse || 0),
                        0
                      )
                      .toFixed(2)}{" "}
                    OMR
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">
                No repairs recorded yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Notes and Password Grid*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ticket.notes && (
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {ticket.notes}
              </p>
            </CardContent>
          </Card>
        )}

        {ticket.password && (
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {ticket.password}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      {/* Grand Total */}
      {ticket.totalPrice ? (
        <Card className="border-primary">
          <CardContent className="py-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">Total Amount:</span>
              <span className="text-3xl font-bold text-primary">
                {ticket.totalPrice.toFixed(2)} OMR
              </span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
}
