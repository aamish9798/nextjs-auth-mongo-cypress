"use client";

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSnackbar } from "@/context/SnackbarContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const { showSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", data);
      showSnackbar("Account created successfully!", "success");
      router.push("/auth/login");
    } catch (err) {
      showSnackbar(err?.response?.data?.message || "Signup failed", "error");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Sign Up
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              data-test="fname-field"
              fullWidth
              label="First Name"
              {...register("firstName", {
                required: "First name is required",
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              data-test="lname-field"
              fullWidth
              label="Last Name"
              {...register("lastName", {
                required: "Last name is required",
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Box>

          <TextField
            data-test="email-field"
            fullWidth
            margin="normal"
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <FormControl
            sx={{ mt: 2 }}
            error={!!errors.gender}
            component="fieldset"
            data-test="gender-field"
          >
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                {...register("gender", { required: "Gender is required" })}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                {...register("gender", { required: "Gender is required" })}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                {...register("gender", { required: "Gender is required" })}
              />
            </RadioGroup>
            {errors.gender && (
              <Typography variant="caption" color="error">
                {errors.gender.message}
              </Typography>
            )}
          </FormControl>

          <TextField
            data-test="password-field"
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            data-test="cpassword-field"
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            data-test="signup-button"
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isValid || loading}
            sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          <Typography
            variant="body1"
            align="center"
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          >
            Already have an account?{" "}
            <Link href="/auth/login" passHref>
              <Typography
                component="span"
                color="primary"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  ml: 1,
                }}
              >
                Login
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Container>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Signup;
