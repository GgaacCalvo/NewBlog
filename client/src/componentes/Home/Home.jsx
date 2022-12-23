import { useAuth0 } from "@auth0/auth0-react";

import { Profile } from "../Login/Profile";
import { NavBar } from "../NavBar/Navbar";
import { Loading } from "./Loading";

export const Home = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div class="fondo">
      <NavBar />
      <div>
        <h1>hola</h1>
      </div>
      {isAuthenticated ? <Profile /> : <h1>hy mas si te logeas</h1>}
    </div>
  );
};
