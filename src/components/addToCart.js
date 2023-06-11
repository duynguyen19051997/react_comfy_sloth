import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaCheck } from "react-icons/fa";

import classes from "./addToCart.module.css";
import { useCartContext } from "../contexts/cartContext";

export const AddToCart = ({ singleProduct = {} }) => {
  const { colors = [] } = singleProduct;
  const [amount, setAmount] = useState(1);
  const [mainColor, setMainColor] = useState(colors[0]);
  const { addCart } = useCartContext();

  const incrementAmountHandle = (event) => {
    setAmount((prevState) => {
      if (prevState < singleProduct.stock) {
        return prevState + 1;
      }
      return prevState;
    });
  };

  const decreaseAmountHandle = (event) => {
    setAmount((prevState) => {
      if (prevState > 1) {
        return prevState - 1;
      }
      return prevState;
    });
  };

  const addCartHandle = () => {
    const product = {
      ...singleProduct,
      color: mainColor,
      amount: amount,
      image: singleProduct.images[0].url,
    };
    addCart(product);
  };

  return (
    <div className={classes["action"]}>
      <div className={classes["action_colors"]}>
        <span className={classes["label"]}>Colors:</span>
        {singleProduct.colors &&
          singleProduct.colors.map((x, index) => {
            return (
              <button
                key={index}
                className={`btn ${classes["btn_color"]}`}
                style={{
                  backgroundColor: x,
                }}
                onClick={(event) => {
                  event.preventDefault();
                  setMainColor(x);
                }}
              >
                <FaCheck
                  style={{
                    color: `${
                      x === mainColor
                        ? `${x === "white" ? "#ab7a5f" : "white"}`
                        : x
                    }`,
                    fontWeight: "bolder",
                  }}
                />
              </button>
            );
          })}
      </div>
      {singleProduct.stock > 0 && (
        <div className={classes["action_amount"]}>
          <button
            className={`btn`}
            onClick={decreaseAmountHandle}
            disabled={amount === 1}
          >
            <FaMinus />
          </button>
          <h3>{amount}</h3>
          <button
            className={`btn`}
            onClick={incrementAmountHandle}
            disabled={singleProduct.stock === amount}
          >
            <FaPlus />
          </button>
        </div>
      )}
      {singleProduct.stock > 0 && (
        <Link
          to="/cart"
          className={`btn ${classes["btn_detail"]}`}
          onClick={addCartHandle}
        >
          Add to cart
        </Link>
      )}
    </div>
  );
};
