import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ProductsProvider } from "./contexts/productContext";
import { FiltersProvider } from "./contexts/filterContext";
import { CartProvider } from "./contexts/cartContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./contexts/userContext";

// Domain: dev-fjremgeh6qaet2b4.us.auth0.com
// ClientId: 8BbYicX1ax2JPafTwbyLh5f3O4lxvaH3

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH_DOMAIN}
        clientId={process.env.REACT_APP_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        cacheLocation="localstorage"
      >
        <UserProvider>
          <ProductsProvider>
            <FiltersProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </FiltersProvider>
          </ProductsProvider>
        </UserProvider>
      </Auth0Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
