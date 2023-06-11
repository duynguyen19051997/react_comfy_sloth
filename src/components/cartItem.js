import React from "react";
import { Link } from "react-router-dom";
import { BsFillCircleFill } from "react-icons/bs";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { formatPrice } from "../utils/helpers";
import { useCartContext } from "../contexts/cartContext";
import classes from "./cartItem.module.css";
import { DECREASE_AMOUNT, INCREASE_AMOUNT } from "../actions/cartActions";

export const CartItem = ({ cartItem }) => {
  const { deleteCart, updateAmountCart } = useCartContext();
  const incrementAmountHandle = (event) => {
    event.preventDefault();
    updateAmountCart(cartItem.cart_id, INCREASE_AMOUNT);
  };

  const decreaseAmountHandle = (event) => {
    event.preventDefault();
    updateAmountCart(cartItem.cart_id, DECREASE_AMOUNT);
  };

  return (
    <React.Fragment>
      <article className={classes["cart_detail"]}>
        <div className={classes["item_info"]}>
          <Link to={`/products/${cartItem.product_id}`}>
            <img src={cartItem.image} alt={cartItem.name} />
          </Link>
          <div className={classes["item_content"]}>
            <h5>{cartItem.name}</h5>
            <p>
              Color: <BsFillCircleFill style={{ color: cartItem.color }} />
            </p>
          </div>
        </div>
        <p className={classes["price"]}>{formatPrice(cartItem.price)}</p>
        <div className={classes["quantity_action"]}>
          <button
            className={`btn`}
            disabled={cartItem.amount === 1}
            onClick={decreaseAmountHandle}
          >
            <FaMinus />
          </button>
          <h3>{cartItem.amount}</h3>
          <button
            className={`btn`}
            disabled={cartItem.amount === cartItem.max_amount}
            onClick={incrementAmountHandle}
          >
            <FaPlus />
          </button>
        </div>
        <p className={classes["subtotal"]}>
          {formatPrice(cartItem.price * cartItem.amount)}
        </p>
        <div className={classes["remove_action"]}>
          <button
            className={`btn ${classes["remove_btn"]}`}
            onClick={() => {
              deleteCart(cartItem.cart_id);
            }}
          >
            <FaTrashAlt />
          </button>
        </div>
      </article>
      <hr className={classes["line"]} />
    </React.Fragment>
  );
};
