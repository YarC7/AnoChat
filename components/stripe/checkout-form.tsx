"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLanguage } from "@/hooks/use-language";

export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/premium/success`,
        },
      });

      if (error) {
        setErrorMessage(error.message || "An error occurred");
        setIsProcessing(false);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Stripe Payment Element */}
      <div className="bg-[#252540] rounded-lg p-4">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-400 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Pay Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">lock</span>
        <span>
          {isProcessing
            ? t("processing")
            : t("payWithAmount", { amount: "$4.99" })}
        </span>
      </button>

      {/* Footer Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <span>{t("poweredBy")}</span>
          <span className="text-purple-400 font-semibold">Stripe</span>
          <span>|</span>
          <span>{t("sslEncrypted")}</span>
        </div>
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          {t("subscriptionNotice", { app: "Anonymous Chat" })}
        </p>
      </div>
    </form>
  );
}
