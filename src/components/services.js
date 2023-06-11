import React from "react";
import { ServiceItem } from "./serviceItem";

import classes from "./services.module.css";

export const Services = (props) => {
  const details =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum debitis consectetur reprehenderit non aliquam voluptates dolore aut vero consequuntur.";
  return (
    <section className={classes["services_container"]}>
      <div className={classes["services_center"]}>
        <div className={classes["title"]}>
          <h2>custom furniture built only for you</h2>
          <p>{details}</p>
        </div>
        <div className={classes["service_list"]}>
          <ServiceItem type={1} name="mission" details={details} />
          <ServiceItem type={2} name="vision" details={details} />
          <ServiceItem type={3} name="history" details={details} />
        </div>
        <div className={classes["contact_container"]}>
          <h2>Join our newsletter and get 20% off</h2>
          <div className={classes["info_contact"]}>
            <p>{details}</p>
            <div className={classes["contact"]}>
              <form
                className={classes["contact_form"]}
                action="https://formspree.io/f/xwkjreyj"
                method="POST"
              >
                <input
                  className={classes["form_input"]}
                  name="email"
                  type="email"
                />
                <button type="submit" className={classes["btn_contact"]}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
