import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Loading } from "../components/loading";
import { Error } from "../components/error";

export const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return <>{children}</>;
};
