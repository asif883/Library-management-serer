import { Request, Response } from 'express';
import { createBorrow, getBorrowSummary } from './borrow.service';

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { quantity, dueDate } = req.body;

    const borrow = await createBorrow({ bookId, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong while borrowing.',
    });
  }
};

export const borrowedSummary = async (_req: Request, res: Response) => {
  try {
    const summary = await getBorrowSummary();

    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch summary',
    });
  }
};
