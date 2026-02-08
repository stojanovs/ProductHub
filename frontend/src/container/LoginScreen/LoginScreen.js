/**
 *  login Page
 */

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { login } from "../../redux/actions/AuthAction";
import { validations } from "../../util";
import { useSelector } from "react-redux";

function LoginScreen() {
  // constant initialization for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  // get userdata from authReducers
  const userlogin = useSelector((state) => state.userLogin);
  const { error } = userlogin;

  // dispatch used for action calling
  const dispatch = useDispatch();

  // submit button handler
  const submitHandler = () => {
    dispatch(login(email, password));
  };

  const validateSubmit = (e) => {
    e.preventDefault();

    const tempErrors = {
      email: validations.email(email),

      password: !password ? "Password is required" : null,
    };

    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }

    submitHandler();
  };
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      className="logincontainer-grid"
    >
      <Grid item md={4} my={6}>
        <h5 style={{ color: "orange" }}>LOG IN</h5>
        {error && (
          <>
            <div>
              <h6 style={{ color: "red" }}>{error ? error : error}</h6>
            </div>
          </>
        )}

        <form onSubmit={validateSubmit} autoComplete="off">
          <Grid container spacing={1}>
            <Grid item md={12}>
              <TextField
                label="Email"
                error={!!errors.email}
                helperText={errors.email}
                variant="standard"
                inputProps={{ maxLength: 320 }}
                value={email}
                type="email"
                onChange={(e) => {
                  setErrors({ ...errors, email: null });
                  setEmail(e.target.value);
                }}
                fullWidth
              />
            </Grid>

            <Grid item md={12}>
              <TextField
                label="Password"
                error={!!errors.password}
                helperText={errors.password}
                variant="standard"
                type="password"
                inputProps={{ maxLength: 100 }}
                onChange={(e) => {
                  setErrors({ ...errors, password: null });
                  setPassword(e.target.value);
                }}
                fullWidth
              />
            </Grid>
          </Grid>

          <Box style={{ marginTop: 40 }}>
            <Button type="submit" className="form-control" variant="success">
              LOG IN
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
}

export default LoginScreen;
