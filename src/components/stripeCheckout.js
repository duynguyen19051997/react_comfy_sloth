import React, { useEffect, useState } from "react";
import classes from "./stripeCheckout.module.css";
import { useCartContext } from "../contexts/cartContext";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useUserContext } from "../contexts/userContext";
import { formatPrice } from "../utils/helpers";
import { Error } from "./error";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const { myUser } = useUserContext();
  const navigate = useNavigate();

  const [isSucceed, setIsSucceed] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        "/functions/create-payment-intent",
        JSON.stringify({ cart, shipping_fee, total_amount })
      );

      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    createPaymentIntent();
    // eslint-disable-next-line
  }, []);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setIsSucceed(true);
      clearCart();
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div>
      {isSucceed ? (
        <article>
          <h4>Thank you</h4>
          <h4>Your payment was successful!</h4>
          <h4>Redirecting to home page shortly</h4>
        </article>
      ) : (
        <article>
          <h4>Hello, {myUser ? myUser.name : ""}</h4>
          <p>
            Your total is{" "}
            <strong>{formatPrice(total_amount + shipping_fee)}</strong>
          </p>
          <p>
            Test Card Number: <strong>4242 4242 4242 4242</strong>
          </p>
        </article>
      )}
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement id="cart-element" onChange={handleChange} options={""} />
        <button
          disabled={processing || disabled || isSucceed}
          id="submit"
          className={`btn ${classes["pay_btn"]}`}
        >
          Pay
        </button>
        {/* Show error */}
        {error && (
          <div className={classes["card-error"]}>
            <Error message={error.message} />
          </div>
        )}
        {/* Show a success message */}
        {isSucceed && (
          <p>
            Payment succeed, see the result in your{" "}
            <a href={`https://dashboard.stripe.com/test/payments`} title="">
              Stripe Dashboard.
            </a>{" "}
            Refresh the page to pay again.
          </p>
        )}
      </form>
    </div>
  );
};

export const StripeCheckout = (props) => {
  const { cart } = useCartContext();

  return (
    <main className={classes["stripe_checkout_container"]}>
      {cart.length > 0 ? (
        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <>
          <h2>Your cart is empty</h2>
          <Link to={"/products"} className={`btn ${classes["continue_btn"]}`}>
            Continue Shopping
          </Link>
        </>
      )}
    </main>
  );
};
