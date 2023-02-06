import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Shop2Icon from "@mui/icons-material/Shop2";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import {
  NavbarItems,
  Logo,
  MenuIconContainer,
  Menu,
  MenuItem,
} from "./style-component/Navbar";
const Navbar = () => {
  const { currentUser: user } = useSelector((state) => state.user);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    setClicked(!clicked);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setClicked(false);
  };
  return (
    <NavbarItems style={{ display: user ? "" : "none" }}>
      <Logo onClick={() => navigate("/")}>
        <Shop2Icon style={{ marginRight: "10px" }} /> Shopping
      </Logo>
      <MenuIconContainer onClick={handleClick}>
        {clicked ? (
          <CloseIcon style={{ fontSize: "25px" }} />
        ) : (
          <MenuIcon style={{ fontSize: "25px" }} />
        )}
      </MenuIconContainer>
      <Menu active={clicked} user={!!user}>
        <MenuItem onClick={() => setClicked(false)}>
          <Link className="nav-menu-link" to="/">
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setClicked(false)}>
          <Link className="nav-menu-link" to="/products">
            Products
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setClicked(false)}>
          <Link className="nav-menu-link" to="/products/new">
            Create Products
          </Link>
        </MenuItem>
        {user && (
          <>
            <MenuItem onClick={handleLogout}>
              <Link className="nav-menu-link" to="/">
                Logout
              </Link>
            </MenuItem>
          </>
        )}
      </Menu>
    </NavbarItems>
  );
};

export default Navbar;
