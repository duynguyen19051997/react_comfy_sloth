import React from "react";

import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";

import classes from "./productItem.module.css";

export const ProductItem = (props) => {
  const { id, name, price, image } = props;

  return (
    <article className={classes["featured_product_item_container"]}>
      <div className={classes["img_container"]}>
        <img src={image} alt={name} />
        <div className={classes["overlay"]}>
          <Link
            to={`/products/${id}`}
            className={`btn ${classes["btn_icon_search"]}`}
          >
            <BsSearch className={classes["search_icon"]} />
          </Link>
        </div>
      </div>
      <div className={classes["content_container"]}>
        <h5>{name}</h5>
        <p>{formatPrice(price)}</p>
      </div>
    </article>
  );
};
