import React from "react";
import { login } from "../reducers/authReducer.js";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Notification from "./Notification.js";
import Paper from "@material-ui/core/Paper";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(
      login({
        username: event.target.username.value,
        password: event.target.password.value,
      })
    );
    event.target.username.value = "";
    event.target.password.value = "";
  };
  return (
    <Grid
      justify={"center"}
      container
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper elevation={7}>
        <Box p={2}>
          <Typography my={2} align={"center"} variant={"h4"}>
            Log in to application
          </Typography>
          <Box my={2}>
            <Notification />
          </Box>
          <form id="login" onSubmit={handleLogin}>
            <TextField
              fullWidth
              variant={"outlined"}
              name={"username"}
              label={"Username"}
              margin={"normal"}
              required
            />
            <TextField
              margin={"normal"}
              variant={"outlined"}
              fullWidth
              name={"password"}
              label={"Password"}
              type={"password"}
              required
            />
            <Box mt={1} textAlign="center">
              <Button
                variant={"contained"}
                color={"primary"}
                fullWidth
                type="submit"
              >
                login
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
};

export default LoginForm;
