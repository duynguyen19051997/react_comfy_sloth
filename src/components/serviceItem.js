import React from "react";
import { BsCompass, BsHammer, BsClipboardDataFill } from "react-icons/bs";
import classes from "./serviceItem.module.css";

export const ServiceItem = (props) => {
  return (
    <article className={classes["service_item_container"]}>
      {props.type === 1 && <BsCompass className={classes["service_icon"]} />}
      {props.type === 2 && <BsHammer className={classes["service_icon"]} />}
      {props.type === 3 && (
        <BsClipboardDataFill className={classes["service_icon"]} />
      )}

      <h4>{props.name}</h4>
      <p>{props.details}</p>
    </article>
  );
};
