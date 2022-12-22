import { NavBar } from "../NavBar/Navbar";
import React from "react";
import { changeStatus, getUsers, setOnline } from "../../redux/actions/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUserId } from "../../redux/actions/actions";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Profile } from "../Login/Profile";
export const Landing = () => {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  return (
    <>
      <NavBar />
      <Profile />
    </>
  );
};
