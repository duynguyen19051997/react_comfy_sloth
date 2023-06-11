import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import {
  GET_FEATURED_PRODUCTS,
  GET_PRODUCTS,
  IS_LOADING_PRODUCTS_ERROR,
  LOADING_PRODUCTS_BEGIN,
  LOADING_PRODUCTS_END,
} from "../actions/productActions";
import { productsReducer } from "../reducers/productsReducer";
import { products_url } from "../utils/constants";

const productsInitial = {
  isProductLoading: false,
  isProductError: false,
  productErrorMessage: "",
  products: [],
  featured_products: [],
};

const ProductsContext = React.createContext();

export const ProductsProvider = (props) => {
  const [state, dispatch] = useReducer(productsReducer, productsInitial);

  const getProducts = async () => {
    dispatch({ type: LOADING_PRODUCTS_BEGIN });
    await axios
      .get(products_url)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          dispatch({
            type: GET_PRODUCTS,
            payload: { products: response.data },
          });
          dispatch({
            type: GET_FEATURED_PRODUCTS,
            payload: { products: response.data },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: IS_LOADING_PRODUCTS_ERROR,
          payload: { error: error.message },
        });
      });
    dispatch({ type: LOADING_PRODUCTS_END });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ ...state }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
