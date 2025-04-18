"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/auth/login");

      try {
        const res = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  if (!user) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#242426",
      }}
    >
      <Typography variant="h4" color="white">
        Welcome {user.lastName}
      </Typography>
      <Paper elevation={3} sx={{ mt: 2, p: 6, borderRadius: 3 }}>
        <Typography variant="h5" mb={2}>
          User Data
        </Typography>

        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1">
          <strong>User ID:</strong> {user._id}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Full Name:</strong> {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Gender:</strong> {user.gender}
        </Typography>

        <Divider sx={{ mb: 3, mt: 2 }} />

        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Paper>
    </Container>
  );
}
