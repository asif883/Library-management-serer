import { Request, Response } from 'express';
import { createBook, getAllBooks, getAvailableBooks, getBookById, updateBook,deleteBook } from './book.service';

export const addBook = async (req: Request, res: Response) => {
  const bookData = req.body;
  const newBook = await createBook(bookData);
  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: newBook,
  });
};

export const fetchBooks = async (req: Request, res: Response) => {
  const books = await getAllBooks(req.query);
  res.status(200).json({
    success: true,
    message: 'Books retrieved successfully',
    data: books,
  });
};

export const fetchAvailableBooks = async (_req: Request, res: Response) => {
  const books = await getAvailableBooks();
  res.status(200).json({
    success: true,
    message: 'Available books retrieved successfully',
    data: books,
  });
};

// find book by ID
export const fetchBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const book = await getBookById(bookId);
  res.status(200).json({
    success: true,
    message: 'Book retrieved successfully',
    data: book,
  });
};

// update book
export const updateBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const book = await updateBook(bookId, req.body);
  res.status(200).json({
    success: true,
    message: 'Book updated successfully',
    data: book,
  });
};

// delete single book 
export const deleteBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  await deleteBook(bookId);
  res.status(200).json({
    success: true,
    message: 'Book deleted successfully',
    data: null,
  });
};
