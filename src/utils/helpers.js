import { ALL_FILTER_DEFAULTS } from "../actions/filterActions";

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
};

export const getUniqueValues = (data = [], type = "", isDefaultAll = true) => {
  let unique = data.map((x) => x[type]);

  if (type === "colors") {
    unique = unique.flat();
  }

  if (isDefaultAll) {
    return [ALL_FILTER_DEFAULTS, ...new Set(unique)];
  }
  return [...new Set(unique)];
};
