"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatRoom } from "@/components/chat-room";

export function MatchingLobby({ userId }: { userId: string }) {
  const [isSearching, setIsSearching] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [partnerId, setPartnerId] = useState<string | null>(null);

  const startMatching = async () => {
    setIsSearching(true);

    try {
      const response = await fetch("/api/matching/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.matched) {
          setSessionId(data.sessionId);
          setPartnerId(data.partnerId);
          setMatchFound(true);
          setIsSearching(false);
        } else {
          // Poll for match
          pollForMatch();
        }
      }
    } catch (error) {
      console.error("Error joining queue:", error);
      setIsSearching(false);
    }
  };

  const pollForMatch = () => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/matching/status?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();

          if (data.matched) {
            clearInterval(interval);
            setSessionId(data.sessionId);
            setPartnerId(data.partnerId);
            setMatchFound(true);
            setIsSearching(false);
          }
        }
      } catch (error) {
        console.error("Error checking match status:", error);
      }
    }, 2000);

    // Stop after 30 seconds
    setTimeout(() => {
      clearInterval(interval);
      if (!matchFound) {
        setIsSearching(false);
      }
    }, 30000);
  };

  const cancelMatching = async () => {
    try {
      await fetch("/api/matching/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
    } catch (error) {
      console.error("Error leaving queue:", error);
    }
    setIsSearching(false);
  };

  if (matchFound && sessionId && partnerId) {
    return (
      <ChatRoom
        sessionId={sessionId}
        currentUserId={userId}
        partnerId={partnerId}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Anonymous Chat</h2>
        <p className="text-muted-foreground">
          {isSearching
            ? "Finding you a chat partner..."
            : "Ready to meet someone new?"}
        </p>
      </div>

      {isSearching ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
          <Button onClick={cancelMatching} variant="outline">
            Cancel
          </Button>
        </div>
      ) : (
        <Button onClick={startMatching} size="lg">
          Start Matching
        </Button>
      )}
    </div>
  );
}
