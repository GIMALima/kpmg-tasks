import React, { useRef } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Form.css";

const theme = createTheme();

const profiles = [
  {
    value: "DZ",
    label: "Algerien assistant",
  },
  {
    value: "FR",
    label: "French assistant",
  },
];

const Signup = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");
  watch("firstname");
  watch("lastname");
  watch("email");
  watch("confirmPassword");
  watch("profile");
  watch("terms");

  const handleValidation = () => {
    return errors?.firstname
      ? errors.firstname.message
      : errors?.lastname
      ? errors.lastname.message
      : errors?.email
      ? errors.email.message
      : errors?.password
      ? errors.password.message
      : errors?.confirmPassword
      ? errors.confirmPassword.message
      : errors?.profile
      ? errors.profile.message
      : errors?.terms
      ? errors.terms.message
      : "";
  };

  const [profile, setProfile] = React.useState("FR");

  const handleChange = (event) => {
    setProfile(event.target.value);
  };

  const handleSignup = (userData) => {
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/signup`,
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
      .catch((err) => console.log(err));
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleSignup)}
              sx={{ mt: 3 }}
            >
              {handleValidation() && (
                <span className="error">{handleValidation()}</span>
              )}
              <Typography className="email error"></Typography>
              <Typography className="password error"></Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("firstname", {
                      required: "You must enter your first name",
                    })}
                    fullWidth
                    name="firstname"
                    label="First Name"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("lastname", {
                      required: "You must enter your last name",
                    })}
                    fullWidth
                    label="Last Name"
                    name="lastname"
                    size="small"
                  />
                </Grid>
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
                    id="email"
                    label="Email Address"
                    name="email"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("password", {
                      required: "You must specify a password.",
                      minLength: {
                        value: 6,
                        message: "Password must have at least 6 characters.",
                      },
                    })}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("confirmPassword", {
                      required: "You must confirm your password.",
                      validate: (value) =>
                        value === password.current ||
                        "The passwords do not match.",
                    })}
                    fullWidth
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("profile", {
                      required: "You must select your profile type",
                    })}
                    fullWidth
                    name="profile"
                    select
                    label="Profile"
                    value={profile}
                    onChange={handleChange}
                    size="small"
                  >
                    {profiles.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("terms", {
                          required: "You must agree to terms of use.",
                        })}
                        value="terms"
                        name="terms"
                      />
                    }
                    label="I have read and agreed to general terms of use and confidentiality policy."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Card>
  );
};

export default Signup;
