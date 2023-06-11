import React from "react";
import { ProductList } from "./productList";

import classes from "./products.module.css";
import { ProductsFilter } from "./productsFilter";

export const Products = (props) => {
  return (
    <section className={classes["products_container"]}>
      <ProductsFilter />
      <ProductList />
    </section>
  );
};
