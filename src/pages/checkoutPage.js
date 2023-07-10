import React, { useEffect } from "react";
import { StripeCheckout } from "../components/stripeCheckout";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const CheckoutPage = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
    } else {
      navigate("/");
    }
  }, [navigate, user]);
  return <StripeCheckout />;
};
