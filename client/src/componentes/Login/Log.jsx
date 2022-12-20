import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { LogIn } from "./LogIn";
import { LogOut } from "./LogOut";
import { Profile } from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";

export const Log = () => {
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenProfile = () => {
    console.log(user.sub);
    window.location.replace(`/${user.sub}`);

    setAnchorElUser(null);
  };
  return isAuthenticated ? (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleOpenProfile}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Account</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Dashboard</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  ) : (
    <LogIn />
  );
};
