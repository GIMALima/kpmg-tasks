import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Typography,
  Container,
  Box,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  TextField,
  Button,
  Card,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Form.css";

const theme = createTheme();

const Signin = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  watch("password");
  watch("email");

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleValidation = () => {
    return errors?.email
      ? errors?.email.message
      : errors?.password
      ? errors.password.message
      : "";
  };

  const handleSignin = (userData) => {
    const emailError = document.querySelector(".email.form__error");
    const passwordError = document.querySelector(".password.form__error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/signin`,
      withCredentials: true,
      data: userData,
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#0693e3" }}>
              <LockOutlinedIcon style={{ color: "#fff" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleSignin)}
              sx={{ mt: 3 }}
            >
              {handleValidation() && (
                <Typography className="form__error">
                  {handleValidation()}
                </Typography>
              )}
              <Typography className="email form__error"></Typography>
              <Typography className="password form__error"></Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    {...register("email", {
                      required: "You must specify an email",
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: "Please enter a valid email.",
                      },
                    })}
                    fullWidth
                    label="Email Address"
                    name="email"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("password", {
                      required: "You must specify a password.",
                    })}
                    fullWidth
                    name="password"
                    label="Password"
                    type={passwordShown ? "text" : "password"}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="remember" />}
                    onClick={togglePassword}
                    label="Show password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                className="form__button"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Card>
  );
};

export default Signin;
