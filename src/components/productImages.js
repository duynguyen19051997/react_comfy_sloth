import React, { useState } from "react";

import classes from "./productImages.module.css";

export const ProductImages = ({ images = [{ id: "", url: "" }] }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className={classes["image_container"]}>
      <div className={classes["main_image"]}>
        <img src={mainImage.url} alt="" />
      </div>
      <div className={classes["other_image"]}>
        {images.map((x) => (
          <img
            key={x.id}
            src={x.url}
            className={
              x.id === mainImage.id ? classes["img_active"] : undefined
            }
            alt=""
            onClick={(event) => {
              event.preventDefault();
              setMainImage(x);
            }}
          />
        ))}
      </div>
    </div>
  );
};
