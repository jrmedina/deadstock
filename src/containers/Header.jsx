import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeSetUser } from "../redux/actions/userAction";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { deleteAccessToken } from "../apiCalls";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleClose();
    deleteAccessToken(localStorage.getItem("token"));
    localStorage.removeItem("token");
    dispatch(removeSetUser());
  };

  const loginButton = !user.inventory ? (
    <Link to={`/login`}>
      <MenuItem onClick={handleClose}>Login</MenuItem>
    </Link>
  ) : (
    [
      <Link to={`/${user.username}/inventory`} key="closet">
        <MenuItem>My Closet</MenuItem>
      </Link>,
      <Link to={`/`} key="logout">
        <MenuItem onClick={() => logout}>Logout</MenuItem>
      </Link>,
    ]
  );

  return (
    <div className="header-container">
      {user.username && (
        <p className="status">
          {user.username}
          <br /> Logged In
        </p>
      )}
      <Link to={`/`}>
        <h1 className="header">DEADSTOCK</h1>
      </Link>

      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon className="menu" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to={`/`}>
          <MenuItem onClick={handleClose}>Home</MenuItem>
        </Link>
        <Link to={`/list`}>
          <MenuItem onClick={handleClose}>List View</MenuItem>
        </Link>
        {loginButton}
      </Menu>
    </div>
  );
};
export default Header;
