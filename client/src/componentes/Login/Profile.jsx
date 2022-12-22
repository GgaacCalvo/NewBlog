import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "../Home/Loading.jsx";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  console.log(user);
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt="no te traigo la img" />
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
    )
  );
};
