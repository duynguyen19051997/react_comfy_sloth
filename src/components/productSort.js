import React from "react";
import { BsListUl, BsGrid3X2Gap } from "react-icons/bs";
import { useFiltersContext } from "../contexts/filterContext";

import classes from "./productSort.module.css";
import {
  NAME_A_Z,
  NAME_Z_A,
  PRICE_HIGHEST,
  PRICE_LOWEST,
} from "../actions/filterActions";

export const ProductSort = (props) => {
  const {
    filtered_products,
    is_list_view,
    sort_by,
    setListViewProduct,
    updateSort,
  } = useFiltersContext();

  const changeListViewHandle = (event) => {
    event.preventDefault();
    setListViewProduct();
  };

  const changeSelectSortHandle = (event) => {
    event.preventDefault();
    updateSort(event.target.value);
  };

  return (
    <div className={classes["arrange_container"]}>
      {is_list_view ? (
        <button className={`btn`} onClick={changeListViewHandle}>
          <BsListUl className={classes["arrange_icon"]} />
        </button>
      ) : (
        <button className={`btn`} onClick={changeListViewHandle}>
          <BsGrid3X2Gap className={classes["arrange_icon"]} />
        </button>
      )}
      <p>
        <span>{filtered_products.length}</span> products
      </p>
      <hr className={classes["arrange_line"]} />
      <p>sort by</p>
      <select
        name="sort"
        id="sort"
        value={sort_by}
        onChange={changeSelectSortHandle}
      >
        <option value={PRICE_LOWEST}>Price (lowest)</option>
        <option value={PRICE_HIGHEST}>Price (highest)</option>
        <option value={NAME_A_Z}>Name (a-z)</option>
        <option value={NAME_Z_A}>Name (z-a)</option>
      </select>
    </div>
  );
};
