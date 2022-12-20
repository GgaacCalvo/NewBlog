import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
export const LogIn = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => {
        loginWithRedirect();
      }}
      color="inherit"
    >
      Login
    </Button>
  );
};
