"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="p-1 hover:bg-blue-600 rounded-full transition-colors"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}
