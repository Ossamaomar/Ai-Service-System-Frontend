import { QRCodeCanvas } from "qrcode.react";

type TicketQRCodeProps = {
  ticketId: string;
};

export function TicketQRCode({ ticketId }: TicketQRCodeProps) {
  const url = `${window.location.origin}/tickets/${ticketId}`;

  return (
    <QRCodeCanvas
      value={url}
      size={180}
      level="H" // IMPORTANT for logo safety
    //   marginSize={5}
      imageSettings={{
        src: "/ai-logo-transparent.jpg", // put logo in /public
        x: undefined,
        y: undefined,
        height: 40,
        width: 40,
        excavate: true, // creates white background under logo
      }}
    />
  );
}
