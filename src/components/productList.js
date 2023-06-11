import React from "react";
import { useProductsContext } from "../contexts/productContext";
import { Error } from "./error";
import { Loading } from "./loading";
import { ProductItem } from "./productItem";
import classes from "./productList.module.css";
import { useFiltersContext } from "../contexts/filterContext";
import { ProductItemListView } from "./productItemListView";
import { ProductSort } from "./productSort";

export const ProductList = (props) => {
  const { isProductLoading, isProductError, productErrorMessage } =
    useProductsContext();

  const { filtered_products, is_list_view } = useFiltersContext();

  if (isProductLoading) {
    return <Loading />;
  }

  if (isProductError) {
    return <Error message={productErrorMessage} />;
  }
  return (
    <section className={classes["products_container"]}>
      <ProductSort />
      {is_list_view ? (
        <div className={classes["items_list_view_container"]}>
          {filtered_products.length > 0 &&
            filtered_products.map((x) => (
              <ProductItemListView key={x.id} {...x} />
            ))}
        </div>
      ) : (
        <div className={classes["items_container"]}>
          {filtered_products.length > 0 &&
            filtered_products.map((x) => <ProductItem key={x.id} {...x} />)}
        </div>
      )}
    </section>
  );
};
