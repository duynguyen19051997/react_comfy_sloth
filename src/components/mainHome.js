import React from "react";
import { Link } from "react-router-dom";

import main_home_1 from "../images/main_home_1.jpeg";
import main_home_2 from "../images/main_home_2.jpeg";
import classes from "./mainHome.module.css";

export const MainHome = (props) => {
  return (
    <section className={classes["main_home_container"]}>
      <article className={classes["content_container"]}>
        <h1>design your comfort zone</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
          sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
          aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis
          alias?
        </p>
        <Link to={"/products"} className={`btn ${classes["btn_main_home"]}`}>
          shop now
        </Link>
      </article>
      <article className={classes["image_container"]}>
        <img
          className={classes["main_img"]}
          src={main_home_1}
          alt="Main Home 1"
        />
        <img
          className={classes["accent_img"]}
          src={main_home_2}
          alt="Main Home 2"
        />
      </article>
    </section>
  );
};
