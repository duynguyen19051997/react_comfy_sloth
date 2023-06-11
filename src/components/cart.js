import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";
import { useCartContext } from "../contexts/cartContext";
import { CartItem } from "./cartItem";
import classes from "./cart.module.css";
import { useUserContext } from "../contexts/userContext";

export const Cart = (props) => {
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const { myUser, loginWithRedirect } = useUserContext();
  return (
    <section className={classes["cart_container"]}>
      <div className={classes["cart_title"]}>
        <h5>Item</h5>
        <h5>Price</h5>
        <h5>Quantity</h5>
        <h5>Subtotal</h5>
      </div>
      <hr className={classes["line"]} />
      {cart.length === 0 && (
        <h3 className={classes["empty"]}>Your cart is empty</h3>
      )}
      {cart.length > 0 &&
        cart.map((x) => <CartItem key={x.cart_id} cartItem={x} />)}
      <div className={classes["shopping_action"]}>
        <Link to={"/products"} className={`btn ${classes["continue_btn"]}`}>
          Continue Shopping
        </Link>
        {cart.length > 0 && (
          <button
            className={`btn ${classes["clear_btn"]}`}
            onClick={() => {
              clearCart();
            }}
          >
            Clear Shopping Cart
          </button>
        )}
      </div>
      {cart.length > 0 && (
        <div className={classes["bill_center"]}>
          <div className={classes["bill_area"]}>
            <div className={classes["bill"]}>
              <h4>
                subtotal: <span>{formatPrice(total_amount)}</span>
              </h4>
              <p>
                shipping fee: <span>{formatPrice(shipping_fee)}</span>
              </p>
              <hr className={classes["line"]} />
              <h3>
                order total:{" "}
                <span>{formatPrice(total_amount + shipping_fee)}</span>
              </h3>
            </div>
            {myUser ? (
              <Link className={`btn ${classes["login_btn"]}`} to="/checkout">
                Checkout
              </Link>
            ) : (
              <button
                className={`btn ${classes["login_btn"]}`}
                onClick={loginWithRedirect}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
