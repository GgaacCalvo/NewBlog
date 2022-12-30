import { useAuth0 } from "@auth0/auth0-react";

import { Profile } from "../Login/Profile";
import { NavBar } from "../NavBar/Navbar";
import { SearchBar } from "../SearchBar/SearchBar";
import { Loading } from "./Loading";

export const Home = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      <NavBar />

      <div className="googsearch">
        <h3>Busca en Google aqui!</h3>
        <div class="gcse-search"></div>
      </div>
      <SearchBar />

      {isAuthenticated ? <Profile /> : <h1>hy mas si te logeas</h1>}
    </div>
  );
};
