"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { clearCart } from "@/redux/slices/cartSlice";
import { toast } from "react-toastify";

// Load the public key
const stripePromise = loadStripe("pk_test_51QVeYlEKe5DEHcrDsh7VQ82JlEaNpxEO92F43JyQ2AIa9ieorNuhVIinJLIdFzYkGz4e7Yjcf7fFBqFSih473fkg00bkgTBvSd");

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const dispatch = useDispatch()

  // Get cart data from Redux store
  const { items, totalAmount } = useSelector((state:any) => state.cart);
  const { address, shippingDetails, selectedShippingOption, loading, error } = useSelector((state: any) => state.shipping);

  const total = totalAmount + selectedShippingOption?.shippingAmount.amount

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total * 100, // Convert to cents
          currency: "usd",
          paymentMethodType: paymentMethod,
          items, // Send cart items for backend processing
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { paymentData, redirectUrl } = await response.json();

      if (paymentMethod === "card") {
        if (!cardElement) {
          return toast.error("Card details are not entered properly.");
        }
        const { paymentIntent, error } = await stripe.confirmCardPayment(paymentData?.clientSecret, {
          payment_method: { card: cardElement },
        });

        if (error) {
          setPaymentStatus(`Payment failed: ${error.message}`);
        } else if (paymentIntent) {

          dispatch(clearCart())
          toast.success("Order placed successfully");
          setPaymentStatus("Payment successful!");
        }
      } else if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error:any) {
      setPaymentStatus(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <motion.div
        className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg text-black border border-gray-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-gray-700">
              Payment Method:
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="klarna">Klarna</option>
              </select>
            </label>
          </div>
          {paymentMethod === "card" && (
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      fontFamily: "Arial, sans-serif",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
              />
            </div>
          )}
          <motion.button
            type="submit"
            disabled={!stripe || isLoading}
            className="px-5 py-3 bg-[#029FAE] w-fit text-white font-semibold rounded-lg hover:bg-teal-600 transition disabled:bg-gray-400"
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? "Processing..." : `Pay $${total.toFixed(0)}`}
          </motion.button>
        </form>
        {paymentStatus && (
          <motion.p
            className="mt-6 text-center font-medium text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {paymentStatus}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="py-5 flex items-center justify-center bg-gray-100">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}








// "use client";

// import { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51QVeYlEKe5DEHcrDsh7VQ82JlEaNpxEO92F43JyQ2AIa9ieorNuhVIinJLIdFzYkGz4e7Yjcf7fFBqFSih473fkg00bkgTBvSd");

// export default function PaymentPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState("");

//   const handleCheckout = async () => {
//     setIsLoading(true);
//     setPaymentStatus("");

//     try {
//       // Request to create a Checkout session
//       const response = await fetch("/api/create-checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount: 5000, currency: "usd" }), // $50 in cents
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create checkout session");
//       }

//       const { sessionId } = await response.json();

//       // Redirect to Stripe Checkout page
//       const stripe = await stripePromise;
//       const { error } = await stripe.redirectToCheckout({ sessionId });

//       if (error) {
//         setPaymentStatus(`Error: ${error.message}`);
//       }
//     } catch (error) {
//       setPaymentStatus(`Error: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handleCheckout}
//         disabled={isLoading}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
//       >
//         {isLoading ? "Redirecting..." : "Pay Now"}
//       </button>
//       {paymentStatus && <p className="mt-4 text-red-500">{paymentStatus}</p>}
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// // Load the Stripe public key
// const stripePromise = loadStripe("pk_test_51QVeYlEKe5DEHcrDsh7VQ82JlEaNpxEO92F43JyQ2AIa9ieorNuhVIinJLIdFzYkGz4e7Yjcf7fFBqFSih473fkg00bkgTBvSd");

// function CheckoutForm({ paymentMethodType }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [paymentStatus, setPaymentStatus] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (event:any) => {
//     event.preventDefault();
//     setIsLoading(true);
//     setPaymentStatus("");

//     try {
//       // Fetch the payment intent client secret from the server
//       const response = await fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: 50000, currency: "usd", paymentMethodType }), // $50 in cents
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create payment intent");
//       }

//       const { paymentData } = await response.json();

//       if (paymentMethodType === "card") {
//         const cardElement = elements.getElement(CardElement);

//         const { paymentIntent, error } = await stripe.confirmCardPayment(paymentData?.clientSecret, {
//           payment_method: { card: cardElement },
//         });

//         if (error) {
//           setPaymentStatus(`Payment failed: ${error.message}`);
//         } else if (paymentIntent) {
//           setPaymentStatus("Payment successful!");
//         }
//       }
//     } catch (error) {
//       setPaymentStatus(`Error: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded text-black">
//       {paymentMethodType === "card" && (
//         <div className="mb-4">
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#424770",
//                   "::placeholder": { color: "#aab7c4" },
//                 },
//                 invalid: { color: "#9e2146" },
//               },
//             }}
//           />
//         </div>
//       )}
//       <button
//         type="submit"
//         disabled={!stripe || isLoading}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
//       >
//         {isLoading ? "Processing..." : "Pay"}
//       </button>
//       {paymentStatus && <p className="mt-4 text-red-500">{paymentStatus}</p>}
//     </form>
//   );
// }

// export default function PaymentPage() {
//   const [paymentMethodType, setPaymentMethodType] = useState("card"); // Default to card

//   const handleRedirect = async (selectedPaymentMethod) => {
//     try {
//       const response = await fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           paymentMethodType: selectedPaymentMethod,
//           amount: 50000, // $50 in cents
//           currency: "usd",
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to create checkout session");
//       }
  
//       const data = await response.json();
  
//       if (data.redirectUrl) {
//         // Redirect to Stripe Checkout page for PayPal/Klarna
//         window.location.href = data.redirectUrl;
//       }
//     } catch (error:any) {
//       console.error("Error redirecting to checkout page:", error.message);
//     }
//   };
  

//   return (
//     <Elements stripe={stripePromise}>
//       <div className="p-4 bg-white shadow-md rounded">
//         <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>
//         <div className="flex mb-4 space-x-4">
//           <button
//             onClick={() => setPaymentMethodType("card")}
//             className={`px-4 py-2 ${paymentMethodType === "card" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
//           >
//             Card
//           </button>
//           <button
//             onClick={() => handleRedirect("paypal")}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             PayPal
//           </button>
//           <button
//             onClick={() => handleRedirect("klarna")}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Klarna
//           </button>
//         </div>
//         {/* Render the CheckoutForm only for the card payment method */}
//         {paymentMethodType === "card" && <CheckoutForm paymentMethodType={paymentMethodType} />}
//       </div>
//     </Elements>
//   );
// }