import React from "react";
import { Link } from "react-router-dom";
import {
  BsFillCartFill,
  BsFillPersonPlusFill,
  BsPersonDashFill,
} from "react-icons/bs";
import comfy_sloth from "../images/comfy_sloth.svg";
import classes from "./header.module.css";
import { useCartContext } from "../contexts/cartContext";
import { useUserContext } from "../contexts/userContext";

export const Header = (props) => {
  const { total_items } = useCartContext();
  const { myUser, loginWithRedirect, logout } = useUserContext();
  return (
    <section className={classes["header"]}>
      <div className={classes["header_center"]}>
        <div className={classes["logo"]}>
          <img src={comfy_sloth} alt="" />
        </div>
        <div className={classes["page"]}>
          <Link to={"/"} className={classes["btn_page"]}>
            Home
          </Link>
          <Link to={"/products"} className={`${classes["btn_page"]}`}>
            Products
          </Link>
          {/* TODO: checkout page */}
          {myUser && (
            <Link to={"/checkout"} className={classes["btn_page"]}>
              Checkout
            </Link>
          )}
          <Link to={"/about"} className={classes["btn_page"]}>
            About
          </Link>
        </div>
        <div className={classes["action"]}>
          <Link to={"/cart"} className={`${classes["btn_action"]}`}>
            Cart
            <BsFillCartFill className={classes["icon"]} />
            {total_items > 0 && (
              <span className={classes["cart_value"]}>{total_items}</span>
            )}
          </Link>
          {myUser ? (
            <button
              className={classes["btn_action"]}
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Hi, {myUser.name}
              <BsPersonDashFill className={classes["icon"]} />
            </button>
          ) : (
            <button
              className={classes["btn_action"]}
              onClick={loginWithRedirect}
            >
              Login
              <BsFillPersonPlusFill className={classes["icon"]} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
