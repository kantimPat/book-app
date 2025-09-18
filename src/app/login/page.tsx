"use client";
import {
  Container, Card, CardContent, Typography, Input, Stack, Button,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "../libs/AuthService";
  
export default function LoginPage() {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await AuthService.Login(loginForm.email, loginForm.password);
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        router.push("/home");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Error: " + err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" align="center">Login</Typography>
            {error && <Typography color="error" align="center">{error}</Typography>}
            <Input name="email" placeholder="Email" type="email" fullWidth onChange={handleChange} />
            <Input name="password" placeholder="Password" type="password" fullWidth onChange={handleChange} />
            <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
