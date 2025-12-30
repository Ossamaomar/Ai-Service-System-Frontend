import { useCallback, useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconX, IconCamera } from "@tabler/icons-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router";

interface QRScannerProps {
  open: boolean;
  onClose: () => void;
}

export function TicketQRScanner({ open, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const stopScanning = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
    setIsScanning(false);
  };
  const startScanning = useCallback(async () => {
    try {
      setError("");
      setIsScanning(true);

      const codeReader = new BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;

      const videoInputDevices = await codeReader.listVideoInputDevices();

      if (videoInputDevices.length === 0) {
        setError("No camera found on this device");
        setIsScanning(false);
        return;
      }

      // Prefer back camera on mobile
      const selectedDevice =
        videoInputDevices.find((device) =>
          device.label.toLowerCase().includes("back")
        ) || videoInputDevices[0];

      if (videoRef.current) {
        codeReader.decodeFromVideoDevice(
          selectedDevice.deviceId,
          videoRef.current,
          (result, err) => {
            if (result) {
              const ticketId = result.getText();
              console.log("QR Code detected:", ticketId);

              // Navigate to ticket page
              navigate(`${ticketId}`);
              stopScanning();
              onClose();
            }

            if (err && !(err.name === "NotFoundException")) {
              console.error("Scan error:", err);
            }
          }
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Scanner error:", err);
      setError(err?.message || "Failed to start camera");
      setIsScanning(false);
    }
  }, [navigate, onClose]);

  useEffect(() => {
    if (!open) {
      stopScanning();
      return;
    }

    startScanning();

    return () => {
      stopScanning();
    };
  }, [open, startScanning]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconCamera className="h-5 w-5" />
            Scan QR Code
          </DialogTitle>
          <DialogDescription>
            Position the QR code within the frame to scan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black">
              <video
                ref={videoRef}
                className="h-full w-full object-cover transform rotate-y-180"
                playsInline
              />

              {/* Scanning Overlay */}
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-64 w-64">
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 h-12 w-12 border-l-4 border-t-4 border-primary" />
                    <div className="absolute top-0 right-0 h-12 w-12 border-r-4 border-t-4 border-primary" />
                    <div className="absolute bottom-0 left-0 h-12 w-12 border-l-4 border-b-4 border-primary" />
                    <div className="absolute bottom-0 right-0 h-12 w-12 border-r-4 border-b-4 border-primary" />

                    {/* Scanning line */}
                    <div className="absolute inset-x-0 top-1/2 h-0.5 bg-primary animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              <IconX className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            {error && (
              <Button onClick={startScanning}>
                <IconCamera className="h-4 w-4 mr-2" />
                Retry
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
