/***
 * HEADER PAGE
 */
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useHistory, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/AuthAction";

function Header() {
  // Used For Action Calling
  const dispatch = useDispatch();

  // Get UserInfo From Reducer
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const history = useHistory();

  // Action For Logout
  const logoutHandler = () => {
    dispatch(logout());
  };

  const MenuItem = ({ children, path, onClick }) => {
    return (
      <Box sx={{ display: "flex" }}>
        <Button
          onClick={() => {
            // handleCloseNavMenu();

            if (path) {
              history.push(path);
            }
            if (onClick) {
              onClick();
            }
          }}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {children}
        </Button>
      </Box>
    );
  };
  return (
    <>
      <AppBar
        position="static"
        style={{ backgroundColor: "grey" }}
        className="site-header"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <a href="/" className="navbar-brand">
              ProductHub
            </a>

            {userInfo?.userType === "patient" && (
              <>
                <Link
                  to="/patappointmentlist"
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem path="/patappointmentlist">
                    Appointment List{" "}
                  </MenuItem>
                </Link>
                <Link to="/book-appointment" style={{ textDecoration: "none" }}>
                  <MenuItem path="/book-appointment">
                    Book An Appointment{" "}
                  </MenuItem>
                </Link>
              </>
            )}
            {userInfo?.userType === "doctor" && (
              <>
                <Link
                  to="/docappointmentlist"
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem path="/docappointmentlist">
                    Appointment List{" "}
                  </MenuItem>
                </Link>
                <Link to="/revenue" style={{ textDecoration: "none" }}>
                  <MenuItem path="/revenue">Earnings </MenuItem>
                </Link>
              </>
            )}

            {userInfo ? (
              <>
                <Link to="/productform" style={{ textDecoration: "none" }}>
                  <MenuItem path="/productform">Product form</MenuItem>
                </Link>
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <MenuItem path="/profile">My Profile</MenuItem>
                </Link>
                <MenuItem onClick={logoutHandler}>LOGOUT</MenuItem>

                <MenuItem>
                  {userInfo ? (
                    <div
                      style={{
                        cursor: "default !important",
                        textTransform: "uppercase",
                      }}
                    ></div>
                  ) : (
                    " "
                  )}
                </MenuItem>
              </>
            ) : (
              <>
                <Link to="/userlogin" style={{ textDecoration: "none" }}>
                  <MenuItem path="/userlogin">Login</MenuItem>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <MenuItem path="/register">Register</MenuItem>
                </Link>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Header;
