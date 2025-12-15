"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/components/stripe/checkout-form";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function CheckoutPage() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create PaymentIntent on component mount
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 499 }), // $4.99
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        // For demo purposes, use a mock client secret
        setClientSecret("demo_client_secret");
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, []);

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">
              chat
            </span>
          </div>
          <span className="text-white font-bold text-lg">Anonymous Chat</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Cancel ✕
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Premium Info */}
          <div className="space-y-6">
            {/* Premium Access Card */}
            <div className="bg-[#1e1e32] rounded-3xl border border-white/10 p-8">
              <h2 className="text-white text-2xl font-bold mb-2">
                Premium Access
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                You are subscribing to the monthly premium plan.
              </p>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-5xl font-bold">$4.99</span>
                  <span className="text-gray-400 text-lg">/ month</span>
                </div>
              </div>

              <div className="space-y-4">
                <FeatureItem
                  icon="tune"
                  iconColor="text-purple-400"
                  title="Unlimited Gender Filtering"
                  description="Control who you connect with."
                />
                <FeatureItem
                  icon="auto_awesome"
                  iconColor="text-blue-400"
                  title="50 AI Icebreakers / Day"
                  description="Never run out of things to say."
                />
                <FeatureItem
                  icon="block"
                  iconColor="text-pink-400"
                  title="Ad-Free Experience"
                  description="Chat without interruptions."
                />
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-[#1e1e32] rounded-3xl border border-white/10 p-6">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-xl">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-white text-sm italic mb-4">
                &quot;The AI icebreakers are a game changer. I&apos;ve made way
                more genuine connections.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <span className="text-gray-400 text-sm font-medium">
                  Alex M.
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div>
            <div className="bg-[#1e1e32] rounded-3xl border border-white/10 p-8">
              <h2 className="text-white text-2xl font-bold mb-2">
                Payment Details
              </h2>
              <p className="text-gray-400 text-sm mb-8">
                Complete your purchase to unlock premium.
              </p>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              ) : clientSecret ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "night",
                      variables: {
                        colorPrimary: "#9333ea",
                        colorBackground: "#252540",
                        colorText: "#ffffff",
                        colorDanger: "#ef4444",
                        fontFamily: "system-ui, sans-serif",
                        borderRadius: "8px",
                      },
                    },
                  }}
                >
                  <CheckoutForm />
                </Elements>
              ) : (
                <div className="text-center py-12">
                  <p className="text-red-400">
                    Failed to initialize payment. Please try again.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center">
        <p className="text-xs text-gray-600">
          © 2024 Anonymous Chat Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

interface FeatureItemProps {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
}

function FeatureItem({
  icon,
  iconColor,
  title,
  description,
}: FeatureItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0">
        <span className={`material-symbols-outlined ${iconColor} text-xl`}>
          {icon}
        </span>
      </div>
      <div>
        <h3 className="text-white font-semibold text-sm mb-0.5">{title}</h3>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
    </div>
  );
}
