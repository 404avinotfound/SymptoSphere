import Image from "next/image";

export default function ProfileHeader() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 mx-auto max-w-3xl mt-6 mb-2">
      {/* Banner */}
      <div
        className="h-36 relative flex items-end px-6"
        style={{
          background: "linear-gradient(135deg, #1D9E75 0%, #0F6E56 60%, #085041 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Avatar with image */}
        <div className="relative bottom-[-28px] z-10 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-md">
          <Image
            src="/avatar.jpg"
            alt="SymptoSphere avatar"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Name + bio */}
      <div className="bg-white dark:bg-gray-900 pt-10 pb-5 px-6">
        <p className="font-semibold text-lg text-gray-900 dark:text-white">SymptoSphere</p>
        <p className="text-sm text-gray-500">Intelligent symptom checker — no API keys needed</p>
      </div>
    </div>
  );
}