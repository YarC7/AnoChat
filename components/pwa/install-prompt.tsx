"use client";

import { useState } from "react";

export function InstallPrompt() {
  const [isIOS] = useState(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof window !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as any).MSStream
  );
  const [isStandalone] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(display-mode: standalone)").matches
  );

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Install App</h3>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
        Add to Home Screen
      </button>
      {isIOS && (
        <p className="text-sm text-muted-foreground">
          To install this app on your iOS device, tap the share button{" "}
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          and then &quot;Add to Home Screen&quot;
          <span role="img" aria-label="plus icon">
            {" "}
            ➕{" "}
          </span>
          .
        </p>
      )}
    </div>
  );
}
