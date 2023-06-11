import React from "react";
import { Link } from "react-router-dom";

import classes from "./error.module.css";

export const Error = (props) => {
  return (
    <section className={classes["error_container"]}>
      <div className={classes["error_center"]}>
        <h1>Error</h1>
        <p>{props.message}</p>
        <Link to="/" className={`btn ${classes["btn_back"]}`}>
          Back to home
        </Link>
      </div>
    </section>
  );
};
