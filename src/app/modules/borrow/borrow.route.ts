import express from 'express';
import { borrowBook, borrowedSummary } from './borrow.controller';

const router = express.Router();

router.post('/:bookId', borrowBook);    
router.get('/summary', borrowedSummary); 



export default router;
