import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUserId } from "../../redux/actions/actions";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(
        createUser({
          ID: user.sub,
          email: user.email,
          img: user.picture,
        })
      );
    }
  }, [dispatch, isAuthenticated]);

  return children;
};

export default ProtectedRoute;
