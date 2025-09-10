export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  year: number;
  price: number;
  available: boolean;
  addedBy: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BookResponse {
  books: Book[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
