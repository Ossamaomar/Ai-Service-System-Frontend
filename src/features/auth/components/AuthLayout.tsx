import Silk from "@/components/ui/Silk";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <Silk
          speed={5}
          scale={0.8}
          color="#057f77"
          noiseIntensity={1.2}
          rotation={0}
        />
      </div>
      <Outlet />
    </div>
  );
}
