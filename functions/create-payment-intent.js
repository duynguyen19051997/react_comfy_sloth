// TODO: .netlify function
require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handle = async (event, context) => {
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event);
    console.log(cart);

    const calculateOrderAmount = () => {
      return shipping_fee + total_amount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: error.message }),
      };
    }
  }

  return { statusCode: 404, body: "Create Payment Intent" };
};
