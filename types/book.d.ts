export interface Book {
  _id?: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  year: number;
  price: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookResponse {
  books: Book[];
  total?: number;
  success?: boolean;
  message?: string;
}

export interface SingleBookResponse {
  book: Book;
  success?: boolean;
  message?: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  description: string;
  genre: string;
  year: number;
  price: number;
  available: boolean;
}

export interface UpdateBookRequest extends CreateBookRequest {
  _id: string;
}

export interface DeleteBookResponse {
  success: boolean;
  message: string;
}