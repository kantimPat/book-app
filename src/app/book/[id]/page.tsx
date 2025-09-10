"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import type { Book } from "../../../types/book";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data.book);
        }
      } catch (error) {
        console.error("Failed to fetch book", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  if (isLoading)
    return (
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Grid>
    );

  if (!book)
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        ❌ ไม่พบข้อมูลหนังสือ
      </Typography>
    );

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 2, boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {book.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom color="text.secondary">
            ✍️ ผู้แต่ง: {book.author}
          </Typography>

          <Typography variant="body1" paragraph>
            {book.description}
          </Typography>

          <Box mb={2}>
            <Chip
              label={`หมวดหมู่: ${book.genre}`}
              color="primary"
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip label={`ปี: ${book.year}`} sx={{ mr: 1, mb: 1 }} />
            <Chip label={`ราคา: ${book.price} บาท`} sx={{ mr: 1, mb: 1 }} />
            <Chip
              label={book.available ? "✅ มีจำหน่าย" : "❌ หมด"}
              color={book.available ? "success" : "error"}
              sx={{ mr: 1, mb: 1 }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            👤 เพิ่มโดย: {book.addedBy.username} ({book.addedBy.email})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🕒 สร้างเมื่อ: {new Date(book.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🔄 แก้ไขล่าสุด: {new Date(book.updatedAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
