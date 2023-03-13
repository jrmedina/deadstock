import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeSetUser } from "../redux/actions/userAction";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [render, setRender] = React.useState();
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
    dispatch(removeSetUser());
  };

  React.useEffect(() => {
    const toBeRendered = !user.inventory ? (
      <Link to={`/login`}>
        <MenuItem onClick={handleClose}>Login</MenuItem>
      </Link>
    ) : (
      <Link to={`/`}>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Link>
    );

    setRender(toBeRendered);
  }, [user]);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
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
        {render}
      </Menu>
    </div>
  );
};
export default Header;
