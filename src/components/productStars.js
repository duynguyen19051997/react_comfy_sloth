import React from "react";

import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import classes from "./productStars.module.css";

export const ProductStars = ({ stars = 0, reviews = 0 }) => {
  let starsTemp = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className={classes["start_icon"]} />
        ) : stars >= index + 0.5 ? (
          <FaStarHalfAlt className={classes["start_icon"]} />
        ) : (
          <FaRegStar className={classes["start_icon"]} />
        )}
      </span>
    );
  });

  return (
    <div className={classes["feed_back"]}>
      {starsTemp}
      <p>({reviews} customer reviews)</p>
    </div>
  );
};
