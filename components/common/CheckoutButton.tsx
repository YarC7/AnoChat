'use client';

export default function CheckoutButton({ priceId }: { priceId: string }) {
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      
      // Direct redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleCheckout} className="bg-blue-600 text-white px-6 py-3 rounded">
      Buy Now
    </button>
  );
}