import React from "react";
import { Link } from "react-router-dom";
import { ProductItem } from "./productItem";

import classes from "./featuredProducts.module.css";
import { useProductsContext } from "../contexts/productContext";
import { Loading } from "./loading";
import { Error } from "./error";

export const FeaturedProducts = (props) => {
  const {
    featured_products,
    isProductLoading,
    isProductError,
    productErrorMessage,
  } = useProductsContext();

  if (isProductLoading) {
    return (
      <section className={classes["featured_products_container"]}>
        <h2>featured products</h2>
        <hr className={classes["line"]} />
        <div className={classes["featured_products_list"]}>
          <Loading />
          <Link
            to={"/products"}
            className={`btn ${classes["btn_all_products"]}`}
          >
            all products
          </Link>
        </div>
      </section>
    );
  }

  if (isProductError) {
    return <Error message={productErrorMessage} />;
  }

  return (
    <section className={classes["featured_products_container"]}>
      <h2>featured products</h2>
      <hr className={classes["line"]} />
      <div className={classes["featured_products_list"]}>
        <div className={classes["featured_products_center"]}>
          {featured_products &&
            featured_products
              .slice(0, 3)
              .map((x) => <ProductItem key={x.id} {...x} />)}
        </div>
        <Link to={"/products"} className={`btn ${classes["btn_all_products"]}`}>
          all products
        </Link>
      </div>
    </section>
  );
};
