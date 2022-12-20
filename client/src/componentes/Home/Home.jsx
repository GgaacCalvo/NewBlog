import { useAuth0 } from "@auth0/auth0-react";
import { Profile } from "../Login/Profile";
import { NavBar } from "../NavBar/Navbar";
import { Loading } from "./Loading";

export const Home = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <NavBar />
      {isAuthenticated ? <Profile /> : <h1>Si te logeas hay mas</h1>}
      <Loading />
    </>
  );
};