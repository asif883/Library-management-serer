import express from 'express';
import { addBook, fetchBooks, fetchAvailableBooks, fetchBookById, updateBookById, deleteBookById } from './book.controller';

const router = express.Router();


router.post('/', addBook);

router.get('/', fetchBooks); 

router.get('/available', fetchAvailableBooks);

router.get('/:bookId', fetchBookById);  

router.put('/:bookId', updateBookById); 

router.delete('/:bookId', deleteBookById);    


export default router;
