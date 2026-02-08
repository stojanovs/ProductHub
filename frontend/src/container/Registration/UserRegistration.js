/**
 * User Registration Page
 */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { register, resetMessages } from "../../redux/actions/AuthAction";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { validations } from "../../util";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .error": {
      color: theme.palette.error.main,
    },
  },
}));

// Required field star mark
const RequiredLabel = ({ label }) => (
  <Typography>
    {label}
    <Typography style={{ color: "red", fontSize: "20px" }} component="span">
      {" "}
      *
    </Typography>
  </Typography>
);

function UserRegistration({ history, match }) {
  const classes = useStyles();

  // constant initialization for name,email, password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  // dispatch used for action calling
  const dispatch = useDispatch();

  // get userdata from authReducers
  const userRegister = useSelector((state) => state.userLogin);
  const { error } = userRegister;

  // errors Validations all fields
  const validateSubmit = (e) => {
    e.preventDefault();

    const tempErrors = {
      name: validations.name(name),
      email: validations.email(email),
      password: validations.password(password),
      confirmPassword: validations.confirmPassword(password, confirmPassword),
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

  // SubmitHandler
  const submitHandler = async () => {
    if (password !== confirmPassword) {
    } else {
      // Get User Details
      const success = await dispatch(
        register({
          name: name,
          email,
          password,
        })
      );

      if (success) {
        swal({
          icon: "success",
          text: "You have been registered successfully",

          closeOnConfirm: resetMessages,
        }).then((e) => {
          window.location = "/";
        });
        clearFields();
        return;
      }

      if (error) {
        swal({
          icon: "error",
          text: error,
          closeOnConfirm: resetMessages,
        });
        return;
      }
    }
  };

  //  ClearFields
  const clearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Grid
      className={classes.root}
      container
      spacing={0}
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item md={7} my={6}>
        <>
          <h5 style={{ color: "orange" }}>REGISTER</h5>

          <form onSubmit={validateSubmit} autoComplete="off">
            <Grid container spacing={4}>
              <Grid item md={6}>
                <TextField
                  label={<RequiredLabel label="Name" />}
                  error={!!errors.name}
                  helperText={errors.name}
                  variant="standard"
                  value={name}
                  onChange={(e) => {
                    setErrors({ ...errors, name: null });
                    setName(e.target.value.replace(/[^a-z A-Z']/g, ""));
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  label={<RequiredLabel label="Email" />}
                  error={!!errors.email}
                  helperText={errors.email}
                  inputProps={{ maxLength: 320 }}
                  type="text"
                  variant="standard"
                  value={email}
                  onChange={(e) => {
                    setErrors({ ...errors, email: null });
                    setEmail(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  label={<RequiredLabel label="Password" />}
                  error={!!errors.password}
                  helperText={errors.password}
                  inputProps={{ maxLength: 100 }}
                  type="password"
                  variant="standard"
                  value={password}
                  onChange={(e) => {
                    setErrors({ ...errors, password: null });
                    setPassword(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  label={<RequiredLabel label="Confirm password" />}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  inputProps={{ maxLength: 100 }}
                  type="password"
                  variant="standard"
                  value={confirmPassword}
                  onChange={(e) => {
                    setErrors({ ...errors, confirmPassword: null });
                    setConfirmPassword(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Box style={{ marginTop: 40 }}>
              <Button type="submit" className="form-control" variant="success">
                Register
              </Button>
            </Box>
          </form>
        </>
      </Grid>
    </Grid>
  );
}
export default UserRegistration;
