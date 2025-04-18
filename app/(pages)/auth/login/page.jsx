"use client";

import { useForm } from "react-hook-form";
import { useSnackbar } from "@/context/SnackbarContext";
import Link from "next/link";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const { showSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/login", data);
      localStorage.setItem("token", res.data.token);
      showSnackbar("Login successful!", "success");
      reset();
      router.push("/dashboard");
    } catch (err) {
      showSnackbar(err?.response?.data?.message || "Login failed", "error");
      reset();
    } finally {
      setLoading(false);
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
            Login
          </Typography>

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

          <Button
            data-test="login-button"
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}
            disabled={!isValid || loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Typography
            variant="body1"
            align="center"
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          >
            Not a member yet?{" "}
            <Link href="/auth/signup" passHref>
              <Typography
                component="span"
                color="primary"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  ml: 1,
                }}
              >
                Sign up
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

export default Login;
