import aiLogoTransparent from "@/assets/ai-logo-transparent.jpg";

export default function Logo() {
  return (
    <div className="h-full hidden sm:flex bg-white rounded-l-xl border-l border-y border-gray-300 items-center justify-center">
      <img
        src={aiLogoTransparent}
        alt="AI Logo"
        className="w-full object-contain"
      />
    </div>
  );
}
