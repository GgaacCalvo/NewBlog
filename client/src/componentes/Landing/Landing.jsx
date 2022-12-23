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
  const userDetail = useSelector((state) => state.user);
  const userRedux = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  const filterOnline = function (users) {
    let onlines = users.filter((u) => {
      return u.isOnline == true;
    });
    return onlines;
  };
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserId(user.sub));
      if (!userDetail.length) {
        dispatch(
          createUser({
            ID: user.sub,
            email: user.email,
            img: user.picture,
          })
        );
      }
    }
  }, [dispatch, isAuthenticated]);
  useEffect(() => {
    let on = filterOnline(users);
    dispatch(setOnline(on));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(changeStatus(user.sub, true));
    }
  }, [dispatch, userRedux.isOnline]);
  return (
    <>
      <NavBar />
      <Profile />
    </>
  );
};
