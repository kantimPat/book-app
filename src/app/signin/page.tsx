"use client";
import React from "react";
import { Box, Button, Input } from "@mui/material";

export default function SignInPage() {
  const handleSignIn = () => {
    const userInput = {
      email: "tanapattara@kku.ac.th",
      password: "password123",
    };
    //call api
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    })
      .then((res) => {
        //result
        if (res.ok) {
          res.json().then((data) => {
            const user = data.user;
            const token = data.token;
            console.log(user, token);
          });
        }
      })
      .catch((err) => {
        //error
        console.error(err);
      });
  };
  return (
    <Box maxWidth={400}>
      <Input type="email" placeholder="Email" fullWidth />
      <Input type="password" placeholder="Password" fullWidth />
      <Button variant="contained" fullWidth onClick={handleSignIn}>
        Sign In
      </Button>
    </Box>
  );
}
