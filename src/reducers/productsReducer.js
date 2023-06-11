import {
  GET_FEATURED_PRODUCTS,
  GET_PRODUCTS,
  IS_LOADING_PRODUCTS_ERROR,
  LOADING_PRODUCTS_BEGIN,
  LOADING_PRODUCTS_END,
} from "../actions/productActions";

export const productsReducer = (state, action) => {
  switch (action.type) {
    case LOADING_PRODUCTS_BEGIN:
      return { ...state, isProductLoading: true };
    case LOADING_PRODUCTS_END:
      return { ...state, isProductLoading: false };
    case GET_PRODUCTS:
      return { ...state, products: action.payload.products };
    case GET_FEATURED_PRODUCTS:
      return {
        ...state,
        featured_products: action.payload.products.filter(
          (x) => x.featured === true
        ),
      };
    case IS_LOADING_PRODUCTS_ERROR:
      return {
        ...state,
        isProductError: true,
        productErrorMessage: action.payload.error,
      };

    default:
      return state;
  }
};
