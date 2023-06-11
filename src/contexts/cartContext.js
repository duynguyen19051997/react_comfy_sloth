import React, { useContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";
import {
  ADD_CART,
  CLEAR_CART,
  DELETE_CART,
  UPDATE_CART,
  UPDATE_CART_TOTALS,
} from "../actions/cartActions";

const getLocalStorageCart = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  }
  return [];
};

const cartInitial = {
  cart: getLocalStorageCart(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitial);

  const addCart = (single_product) => {
    dispatch({ type: ADD_CART, payload: { single_product: single_product } });
  };

  const updateAmountCart = (cart_id, type) => {
    dispatch({
      type: UPDATE_CART,
      payload: { cart_id: cart_id, type: type },
    });
  };

  const deleteCart = (cart_id) => {
    dispatch({ type: DELETE_CART, payload: { cart_id: cart_id } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  useEffect(() => {
    dispatch({ type: UPDATE_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addCart, updateAmountCart, deleteCart, clearCart }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
