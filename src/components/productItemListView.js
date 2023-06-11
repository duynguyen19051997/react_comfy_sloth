import React from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

import classes from "./productItemListView.module.css";
import { formatPrice } from "../utils/helpers";

export const ProductItemListView = (props) => {
  const { id, name, price, image, description } = props;

  return (
    <article className={classes["product_item_container"]}>
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
      <div className={classes["content"]}>
        <h2>{name}</h2>
        <h4>{formatPrice(price)}</h4>
        <p>
          {description.length > 150
            ? `${description.substring(0, 150)}...`
            : description}
        </p>
        <Link to={`/products/${id}`} className={`btn ${classes["btn_detail"]}`}>
          Detail
        </Link>
      </div>
    </article>
  );
};
