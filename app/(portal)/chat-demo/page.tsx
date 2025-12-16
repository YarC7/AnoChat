"use client";

import { useState } from "react";
import { MatchingLobby } from "@/components/matching-lobby";

export default function ChatPage() {
  // Generate a stable userId once on the client using lazy state initializer
  const [userId] = useState(() => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return `user_${(crypto as any).randomUUID()}`;
    }
    return `user_${Math.floor(Math.random() * 10000000)}`;
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <MatchingLobby userId={userId} />
    </div>
  );
}
