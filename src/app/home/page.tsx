"use client";
import { Container, Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../../types/User";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 5, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h5">Welcome</Typography>
            {user && (
              <>
                <Typography variant="h6">Username: {user.username}</Typography>
                <Typography variant="body1">Email: {user.email}</Typography>
              </>
            )}
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
