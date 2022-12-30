import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserSearch } from "../../redux/actions/actions";

import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import style from "./SearchBar.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
export const SearchBar = () => {
  const { isAuthenticated, user } = useAuth0();

  const users = useSelector((state) => state.userSearch);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUserSearch(input));
  };
  return (
    <div>
      <form className={style.search} onSubmit={handleSubmit}>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextField
            id="standard-basic"
            label="Buscar un oficio o nombre de trabajador"
            type="text"
            variant="outlined"
            fullWidth
            value={input}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            size="small"
            type="submit"
            endIcon={<SearchIcon />}
          >
            Buscar
          </Button>
        </Box>
      </form>
    </div>
  );
};
