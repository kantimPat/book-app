"use client";
import {
  Container, Card, CardContent, Typography, Input, Stack, Button,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "../libs/AuthService";
import { RegisterForm } from "../../../types/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    const data: RegisterForm = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
    };
    try {
      const response = await AuthService.Register(data);
      if (response.status === 201) {
        router.push("/login");
      } else {
        setError("Registration failed. Try again.");
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
            <Typography variant="h5" align="center">Register</Typography>
            {error && <Typography color="error" align="center">{error}</Typography>}
            <Input name="username" placeholder="Username" fullWidth onChange={handleChange} />
            <Input name="email" placeholder="Email" type="email" fullWidth onChange={handleChange} />
            <Input name="password" placeholder="Password" type="password" fullWidth onChange={handleChange} />
            <Input name="confirmPassword" placeholder="Confirm Password" type="password" fullWidth onChange={handleChange} />
            <Button variant="contained" fullWidth onClick={handleRegister}>Register</Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
