import React from "react";

import classes from "./footer.module.css";

export const Footer = (props) => {
  return (
    <footer className={classes["footer_container"]}>
      <h5>
        © {new Date().getFullYear()} <span>ComfySloth</span>
      </h5>
      <h5>All rights reserved</h5>
    </footer>
  );
};
