// import { NextApiRequest, NextApiResponse } from "next";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(
//   "sk_test_51QVeYlEKe5DEHcrDUm9EdatYnsMTqCRgAvpU1BaVXYDAzXUZTVQ4Oua4i8tdKlBTtjh3y6hlQkkorFmK8qdml5cZ00nNnAaJJh",

// );

// export const POST = async (req: Request, res: NextApiResponse) => {

//   const body = await req.json()


//   if (req.method === "POST") {
//     try {
//       const { amount, currency }:any = body;

//       console.log(amount, currency);
      

//       if (!amount || !currency) {
//         // return res.status(400).json({
//         //   message: "Amount and currency are required",
//         // });
//         return NextResponse.json(
//           {
//             message: "Amount and currency are required",
            
//           },
//           { status: 400 }
//         );
        
//       }

//       const paymentIntent = await stripe.paymentIntents.create({
//         amount, // Amount in smallest currency unit
//         currency, // Currency (e.g., "usd")
//         automatic_payment_methods: { enabled: true },
//       });

//       // return res.status(200).json({
//       //   message: "Payment intent created successfully",
//       //   paymentData: { clientSecret: paymentIntent.client_secret },
//       // });
//       return NextResponse.json(
//         {
//             message: "Payment intent created successfully",
//             paymentData: { clientSecret: paymentIntent.client_secret },
//           },
//         { status: 200 }
//       );
//     } catch (error: any) {
//       console.error("Error creating payment intent:", error);
//       return NextResponse.json(
//               {
//                 message: "Internal server error",
//                 error: error.message,
//               },
//               { status: 500 }
//             );
//     }
//   } else {
//     // return res.status(405).json({
//     //   message: `Method ${req.method} Not Allowed`,
//     // });
//     return NextResponse.json(
//       {
//         message: `Method ${req.method} Not Allowed`,
        
//       },
//       { status: 405 }
//     );

//   }
// };




// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(
//   "sk_test_51QVeYlEKe5DEHcrDUm9EdatYnsMTqCRgAvpU1BaVXYDAzXUZTVQ4Oua4i8tdKlBTtjh3y6hlQkkorFmK8qdml5cZ00nNnAaJJh",
 
// );

// export const POST = async (req: Request) => {
//   const body = await req.json();
//   const { amount, currency, paymentMethodType } = body;

//   if (!amount || !currency || !paymentMethodType) {
//     return NextResponse.json(
//       { message: "Amount, currency, and payment method type are required" },
//       { status: 400 }
//     );
//   }

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount, // Amount in smallest currency unit
//       currency, // Currency (e.g., "usd")
//       payment_method_types: [paymentMethodType], // Pass dynamic payment methods
//     });

//     return NextResponse.json(
//       {
//         message: "Payment intent created successfully",
//         paymentData: { clientSecret: paymentIntent.client_secret },
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error creating payment intent:", error);
//     return NextResponse.json(
//       { message: "Internal server error", error: error.message },
//       { status: 500 }
//     );
//   }
// };



import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51QVeYlEKe5DEHcrDUm9EdatYnsMTqCRgAvpU1BaVXYDAzXUZTVQ4Oua4i8tdKlBTtjh3y6hlQkkorFmK8qdml5cZ00nNnAaJJh"
);

export const POST = async (req: Request) => {
  const body = await req.json();
  const { amount, currency, paymentMethodType } = body;

  if (!amount || !currency || !paymentMethodType) {
    return NextResponse.json(
      { message: "Amount, currency, and payment method type are required" },
      { status: 400 }
    );
  }

  try {
    if (paymentMethodType === "card") {
      // Create a Payment Intent for card payments
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // Amount in smallest currency unit
        currency, // Currency (e.g., "usd")
        payment_method_types: ["card"], // Use "card" for card payments
      });

      return NextResponse.json(
        {
          message: "Payment intent created successfully",
          paymentData: { clientSecret: paymentIntent.client_secret },
        },
        { status: 200 }
      );
    } else {
      // Create a Checkout Session for other payment methods (e.g., PayPal, Klarna)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: [paymentMethodType], // PayPal or Klarna
        line_items: [
          {
            price_data: {
              currency,
              product_data: { name: "Sample Product" },
              unit_amount: amount, // Amount in smallest currency unit
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "https://yourdomain.com/success", // Redirect after successful payment
        cancel_url: "https://yourdomain.com/cancel",   // Redirect after cancellation
      });

      return NextResponse.json(
        { message: "Checkout session created successfully", redirectUrl: session.url },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error creating payment intent or session:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
};