import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUserId } from "../../redux/actions/actions";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { NavBar } from "../NavBar/Navbar";

import { changeStatus, getUsers, setOnline } from "../../redux/actions/actions";
import { Profile } from "../Login/Profile";

const ProtectedRoute = ({ children }) => {
  return children;
};

export default ProtectedRoute;
