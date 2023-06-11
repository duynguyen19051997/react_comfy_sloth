import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Loading } from "./loading";
import { Error } from "./error";
import { ProductImages } from "./productImages";
import { formatPrice } from "../utils/helpers";
import { single_product_url } from "../utils/constants";
import { ProductStars } from "./productStars";
import { AddToCart } from "./addToCart";

import classes from "./productDetail.module.css";

export const ProductDetail = (props) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isSingleProductLoading, setIsSingleProductLoading] = useState(false);
  const [isSingleProductError, setIsSingleProductError] = useState(false);
  const [singleProductErrorMessage, setSingleProductErrorMessage] =
    useState("");
  const [singleProduct, setSingleProduct] = useState({});

  const getSingleProduct = useCallback(() => {
    setIsSingleProductLoading(true);
    axios
      .get(`${single_product_url}${productId}`)
      .then((response) => {
        setSingleProduct(response.data);
        setIsSingleProductLoading(false);
      })
      .catch((err) => {
        setIsSingleProductError(true);
        setSingleProductErrorMessage(err.message);
        setIsSingleProductLoading(false);
      });
  }, [productId]);

  useEffect(() => {
    getSingleProduct();
  }, [getSingleProduct]);

  useEffect(() => {
    if (isSingleProductError) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [isSingleProductError, navigate]);

  if (isSingleProductLoading) {
    return <Loading />;
  }

  if (isSingleProductError) {
    return <Error message={singleProductErrorMessage} />;
  }

  return (
    <section className={classes["product_detail_container"]}>
      <ProductImages images={singleProduct.images} />
      <div className={classes["content_container"]}>
        <h2>{singleProduct.name}</h2>
        <ProductStars
          stars={singleProduct.stars}
          reviews={singleProduct.reviews}
        />
        <h4>{formatPrice(singleProduct.price)}</h4>
        <p>{singleProduct.description}</p>
        <p>
          <span className={classes["label"]}>Available:</span>
          {singleProduct.stock > 0 ? "In stock" : "Out of stock"}
        </p>
        <p>
          <span className={classes["label"]}>SKU:</span>
          {singleProduct.id}
        </p>
        <p>
          <span className={classes["label"]}>Brand:</span>
          {singleProduct.company}
        </p>
        <hr className={classes["detail_line"]} />
        <AddToCart singleProduct={singleProduct} />
      </div>
    </section>
  );
};
