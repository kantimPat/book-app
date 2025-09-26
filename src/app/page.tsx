"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Box,
  Avatar,
  Fade,
  Skeleton,
  Paper,
  Button,
  Modal,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar
} from "@mui/material";
import type { BookResponse, Book } from "../types/book";
import Link from "next/link";

export default function Home() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  
  // Form state for new book
  const [newBook, setNewBook] = useState<Omit<Book, '_id'>>({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: new Date().getFullYear(),
    price: 0,
    available: true,
  });

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/books");
      if (response.ok) {
        const data: BookResponse = await response.json();
        setBooksData(data.books);
      }
    } catch (error) {
      console.error("Failed to fetch books", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleNewBook = async () => {
    if (!newBook.title || !newBook.author) {
      setShowError(true);
      return;
    }

    setIsSaving(true);
    
    try {
      const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        setShowSuccess(true);
        setIsNewDialogOpen(false);
        // Reset form
        setNewBook({
          title: "",
          author: "",
          description: "",
          genre: "",
          year: new Date().getFullYear(),
          price: 0,
          available: true,
        });
        // Refresh book list
        await getData();
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Failed to add book", error);
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof Omit<Book, '_id'>) => (event: any) => {
    const value = event.target.value;
    setNewBook(prev => ({
      ...prev,
      [field]: field === 'year' || field === 'price' ? Number(value) : value
    }));
  };

  // Loading Component
  const LoadingCards = () => (
    <Grid container spacing={3}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Card
            sx={{
              borderRadius: 4,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="80%" height={24} />
                  <Skeleton variant="text" width="60%" height={20} />
                </Box>
              </Box>
              <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          linear-gradient(135deg, 
            rgba(102, 126, 234, 0.8) 0%, 
            rgba(118, 75, 162, 0.8) 50%,
            rgba(255, 154, 158, 0.8) 100%
          ),
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.2) 0%, transparent 50%)
        `,
        py: 6,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Floating Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' }
          }
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}
      />

      <Container maxWidth="lg">
        {/* Header Section */}
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: '0 auto 24px auto',
                background: 'linear-gradient(45deg, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.7) 90%)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                fontSize: 48,
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            >
              📚
            </Avatar>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '4rem' },
                letterSpacing: '-0.02em'
              }}
            >
              Books Application
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 300,
                mb: 3,
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              ✨ สำรวจโลกแห่งหนังสือที่น่าทึ่ง ✨
            </Typography>

            {/* Add Book Button */}
            <Button
              variant="contained"
              onClick={() => setIsNewDialogOpen(true)}
              sx={{
                px: 4,
                py: 2,
                mb: 3,
                borderRadius: 5,
                background: 'linear-gradient(45deg, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.7) 90%)',
                color: '#667eea',
                fontWeight: 600,
                fontSize: '1.1rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                  background: 'linear-gradient(45deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0.9) 90%)',
                }
              }}
            >
              ➕ เพิ่มหนังสือใหม่
            </Button>

            {/* Stats Card */}
            {!isLoading && booksData.length > 0 && (
              <Fade in={true} timeout={1200}>
                <Paper
                  sx={{
                    display: 'inline-block',
                    px: 4,
                    py: 2,
                    borderRadius: 5,
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    📖 {booksData.length} เล่ม พร้อมให้คุณสำรวจ
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Box>
        </Fade>

        {/* Loading State */}
        {isLoading && <LoadingCards />}

        {/* Empty State */}
        {!isLoading && booksData.length === 0 && (
          <Fade in={true} timeout={600}>
            <Card
              sx={{
                textAlign: 'center',
                py: 8,
                borderRadius: 6,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                maxWidth: 500,
                mx: 'auto'
              }}
            >
              <Box sx={{ fontSize: 100, mb: 3 }}>📚</Box>
              <Typography
                variant="h4"
                sx={{
                  color: 'rgba(0,0,0,0.8)',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                ยังไม่มีหนังสือ
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(0,0,0,0.6)',
                  fontSize: '1.1rem'
                }}
              >
                เริ่มเพิ่มหนังสือเพื่อสร้างคลังความรู้ของคุณ
              </Typography>
            </Card>
          </Fade>
        )}

        {/* Books Grid */}
        {!isLoading && booksData.length > 0 && (
          <Grid container spacing={4}>
            {booksData.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} key={book._id}>
                <Fade in={true} timeout={600 + index * 100}>
                  <Link
                    href={`/book/${book._id}`}
                    passHref
                    style={{ textDecoration: 'none' }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        '&:hover': {
                          transform: 'translateY(-12px) scale(1.02)',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                          background: 'rgba(255,255,255,1)',
                          '& .book-avatar': {
                            transform: 'scale(1.1) rotate(5deg)'
                          },
                          '& .book-title': {
                            color: '#667eea'
                          }
                        }
                      }}
                    >
                      {/* Gradient Accent */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 5,
                          background: `linear-gradient(90deg, 
                            hsl(${(index * 50) % 360}, 70%, 60%) 0%, 
                            hsl(${((index + 2) * 50) % 360}, 70%, 60%) 100%)`
                        }}
                      />

                      <CardActionArea sx={{ height: '100%' }}>
                        <CardContent sx={{ p: 4 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                            <Avatar
                              className="book-avatar"
                              sx={{
                                width: 64,
                                height: 64,
                                mr: 3,
                                background: `linear-gradient(135deg, 
                                  hsl(${(index * 50) % 360}, 70%, 60%) 0%, 
                                  hsl(${((index + 2) * 50) % 360}, 70%, 60%) 100%)`,
                                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                                fontSize: 28,
                                transition: 'all 0.3s ease',
                                border: '3px solid rgba(255,255,255,0.5)'
                              }}
                            >
                              📖
                            </Avatar>

                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                className="book-title"
                                variant="h6"
                                sx={{
                                  fontWeight: 700,
                                  color: 'rgba(0,0,0,0.9)',
                                  lineHeight: 1.3,
                                  mb: 1,
                                  transition: 'color 0.3s ease',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  fontSize: { xs: '1.1rem', md: '1.25rem' }
                                }}
                              >
                                {book.title}
                              </Typography>

                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ fontSize: 16, mr: 1 }}>✍️</Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: 'rgba(0,0,0,0.7)',
                                    fontWeight: 500,
                                    fontSize: '0.95rem'
                                  }}
                                >
                                  {book.author}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          {/* Decorative Bottom Section */}
                          <Box
                            sx={{
                              height: 50,
                              background: `linear-gradient(135deg, 
                                hsla(${(index * 50) % 360}, 70%, 60%, 0.08) 0%, 
                                hsla(${((index + 2) * 50) % 360}, 70%, 60%, 0.12) 100%)`,
                              borderRadius: 2,
                              border: '1px solid rgba(0,0,0,0.05)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative',
                              overflow: 'hidden'
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'rgba(0,0,0,0.5)',
                                fontWeight: 500,
                                fontSize: '0.85rem'
                              }}
                            >
                              คลิกเพื่ออ่านรายละเอียด →
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Footer Message */}
        {!isLoading && booksData.length > 0 && (
          <Fade in={true} timeout={1500}>
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: 300,
                  fontSize: '1.1rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                🌟 เลือกหนังสือที่คุณสนใจและเริ่มต้นการเดินทางแห่งความรู้ 🌟
              </Typography>
            </Box>
          </Fade>
        )}
      </Container>

      {/* Add New Book Modal */}
      <Modal 
        open={isNewDialogOpen} 
        onClose={() => setIsNewDialogOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '90%',
            maxWidth: 600,
            maxHeight: '90vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.3)',
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Box sx={{ p: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 3, 
                fontWeight: 700,
                color: '#667eea',
                textAlign: 'center'
              }}
            >
              📚 เพิ่มหนังสือใหม่
            </Typography>
            
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="ชื่อหนังสือ"
                required
                value={newBook.title}
                onChange={handleInputChange('title')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="ผู้แต่ง"
                required
                value={newBook.author}
                onChange={handleInputChange('author')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="คำอธิบาย"
                multiline
                rows={3}
                value={newBook.description}
                onChange={handleInputChange('description')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="ประเภท"
                value={newBook.genre}
                onChange={handleInputChange('genre')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="ปีที่ออกจำหน่าย"
                  type="number"
                  value={newBook.year}
                  onChange={handleInputChange('year')}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
                
                <TextField
                  label="ราคา (บาท)"
                  type="number"
                  value={newBook.price}
                  onChange={handleInputChange('price')}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={newBook.available}
                    onChange={(e) => setNewBook(prev => ({ ...prev, available: e.target.checked }))}
                    color="primary"
                  />
                }
                label="พร้อมจำหน่าย"
                sx={{ 
                  '& .MuiFormControlLabel-label': {
                    fontSize: '1.1rem',
                    fontWeight: 500
                  }
                }}
              />
              
              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <Button 
                  onClick={() => setIsNewDialogOpen(false)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600
                  }}
                >
                  ยกเลิก
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleNewBook}
                  disabled={isSaving || !newBook.title || !newBook.author}
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                    },
                    '&:disabled': {
                      background: 'rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  {isSaving ? '🔄 กำลังบันทึก...' : '💾 บันทึก'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Modal>

      {/* Success Snackbar */}
      <Snackbar 
        open={showSuccess} 
        autoHideDuration={3000} 
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ 
            borderRadius: 3,
            fontWeight: 500
          }}
        >
          ✅ เพิ่มหนังสือสำเร็จแล้ว!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar 
        open={showError} 
        autoHideDuration={3000} 
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowError(false)} 
          severity="error" 
          sx={{ 
            borderRadius: 3,
            fontWeight: 500
          }}
        >
          ❌ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง
        </Alert>
      </Snackbar>
    </Box>
  );
}