"use client";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Avatar,
  Paper,
  Chip,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// ใช้ relative path หากยังมี error
import AuthService from "../../libs/AuthService";
import { User } from "../../../../types/RegistrationRes";
import AuthService from "../../libs/AuthService";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ตรวจสอบการ authentication
    if (!AuthService.isAuthenticated()) {
      router.push("/book");
      return;
    }

    // ดึงข้อมูลผู้ใช้จาก localStorage
    try {
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          // ถ้าไม่มีข้อมูลผู้ใช้ ให้กลับไปหน้า login
          router.push("/book");
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      router.push("/book");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    AuthService.removeToken();
    router.push("/book");
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Typography variant="h6" color="white">กำลังโหลด...</Typography>
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Header Card */}
          <Grid item xs={12}>
            <Paper
              elevation={8}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Box
                sx={{
                  background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                  color: "white",
                  p: 3,
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        fontSize: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h4" fontWeight="bold">
                        ยินดีต้อนรับ!
                      </Typography>
                      <Typography variant="h6" sx={{ opacity: 0.9 }}>
                        {user.username}
                      </Typography>
                    </Box>
                  </Stack>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleLogout}
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      color: "white",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    ออกจากระบบ
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* User Info Card */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  ข้อมูลผู้ใช้
                </Typography>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      ชื่อผู้ใช้
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {user.username}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      อีเมล
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {user.email}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      บทบาท
                    </Typography>
                    <Chip
                      label={user.role || 'user'}
                      color="primary"
                      sx={{
                        mt: 1,
                        fontWeight: "bold",
                        background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      วันที่สมัครสมาชิก
                    </Typography>
                    <Typography variant="body1">
                      {new Date(user.createdAt).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                height: "fit-content",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  เมนูด่วน
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                      boxShadow: "0 3px 5px 2px rgba(102, 126, 234, .3)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)",
                        boxShadow: "0 4px 8px 2px rgba(102, 126, 234, .4)",
                      },
                    }}
                  >
                    แก้ไขโปรไฟล์
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: "#667eea",
                      color: "#667eea",
                      "&:hover": {
                        borderColor: "#5a6fd8",
                        backgroundColor: "rgba(102, 126, 234, 0.04)",
                      },
                    }}
                  >
                    เปลี่ยนรหัสผ่าน
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}