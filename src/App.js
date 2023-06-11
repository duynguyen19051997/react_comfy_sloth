import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import {
  HomePage,
  ProductsPage,
  ProductDetailPage,
  CartPage,
  AboutPage,
  ErrorPage,
  CheckoutPage,
  AuthWrapper,
} from "./pages/index";

import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user } = useAuth0();
  return (
    <div className="App">
      <AuthWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route exact path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            exact
            path="/checkout"
            render={() => {
              return user ? <CheckoutPage /> : <Navigate replace to="/" />;
            }}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </AuthWrapper>
    </div>
  );
}

export default App;
