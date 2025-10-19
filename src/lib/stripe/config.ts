// This file would initialize the Stripe SDK with your API keys.
// For security, these should be stored in environment variables.

// import Stripe from 'stripe';

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2024-04-10',
//   typescript: true,
// });

console.log("Stripe config loaded (placeholders)");

// Placeholder export
export const stripe = {};

export const subscriptionPlans = {
    monthly: {
        priceId: 'price_monthly_placeholder',
        name: 'Monthly Plan',
        price: 49,
    },
    annual: {
        priceId: 'price_annual_placeholder',
        name: 'Annual Plan',
        price: 499,
    }
}
