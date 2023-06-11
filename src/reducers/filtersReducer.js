import {
  LOADING_PRODUCTS,
  LIST_VIEW_PRODUCTS,
  UPDATE_SORT,
  SORT_PRODUCTS,
  PRICE_LOWEST,
  PRICE_HIGHEST,
  NAME_A_Z,
  NAME_Z_A,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
  ALL_FILTER_DEFAULTS,
} from "../actions/filterActions";

export const filtersReducer = (state, action) => {
  switch (action.type) {
    case LOADING_PRODUCTS:
      const products = action.payload.products;
      const arrPrices = products.map((x) => x.price);
      const maxPrice = Math.max(...arrPrices);
      return {
        ...state,
        all_products: products,
        filtered_products: products,
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    case LIST_VIEW_PRODUCTS:
      return {
        ...state,
        is_list_view: action.payload.isListView,
      };
    case UPDATE_SORT:
      return {
        ...state,
        sort_by: action.payload.sortBy,
      };
    case SORT_PRODUCTS:
      const { sort_by, filtered_products } = state;
      let new_filtered_products = [...filtered_products];

      switch (sort_by) {
        case PRICE_LOWEST:
          new_filtered_products = filtered_products.sort(
            (a, b) => a.price - b.price
          );
          break;
        case PRICE_HIGHEST:
          new_filtered_products = filtered_products.sort(
            (a, b) => b.price - a.price
          );
          break;
        case NAME_A_Z:
          new_filtered_products = filtered_products.sort((a, b) =>
            a.name.toUpperCase().localeCompare(b.name.toUpperCase())
          );
          break;
        case NAME_Z_A:
          new_filtered_products = filtered_products.sort((a, b) =>
            b.name.toUpperCase().localeCompare(a.name.toUpperCase())
          );
          break;

        default:
          break;
      }

      return {
        ...state,
        filtered_products: new_filtered_products,
      };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: ALL_FILTER_DEFAULTS,
          category: ALL_FILTER_DEFAULTS,
          color: ALL_FILTER_DEFAULTS,
          price: state.filters.max_price,
          free_shipping: false,
        },
      };
    case FILTER_PRODUCTS:
      const { text, category, company, color, price, free_shipping } =
        state.filters;
      let temp_products = [...state.all_products];
      if (text) {
        temp_products = temp_products.filter((x) =>
          x.name.toLowerCase().includes(text.toLowerCase())
        );
      }

      if (category !== ALL_FILTER_DEFAULTS) {
        temp_products = temp_products.filter(
          (x) => x.category.toLowerCase() === category.toLowerCase()
        );
      }

      if (company !== ALL_FILTER_DEFAULTS) {
        temp_products = temp_products.filter(
          (x) => x.company.toLowerCase() === company.toLowerCase()
        );
      }

      if (color !== ALL_FILTER_DEFAULTS) {
        temp_products = temp_products.filter((x) => {
          return x.colors.find((c) => c === color);
        });
      }

      temp_products = temp_products.filter((x) => x.price <= price);

      if (free_shipping) {
        temp_products = temp_products.filter(
          (x) => x.shipping === free_shipping
        );
      }

      return { ...state, filtered_products: temp_products };

    default:
      return { ...state };
  }
};
