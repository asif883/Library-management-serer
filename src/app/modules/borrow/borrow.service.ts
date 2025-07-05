import { Borrow } from './borrow.model';
import { Book } from '../book/book.model';

export const createBorrow = async ({
  bookId,
  quantity,
  dueDate,
}: {
  bookId: string;
  quantity: number;
  dueDate: string;
}) => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error('Book not found.');
  }

  if (book.copies < quantity) {
    throw new Error('Not enough copies available.');
  }

  // Reduce available copies
  book.copies -= quantity;

  await book.save();

  const borrow = await Borrow.create({
    book: book._id,
    quantity,
    dueDate,
  });

  return borrow;
};

export const getBorrowSummary = async () => {
  return Borrow.aggregate([
    {
      $group: {
        _id: '$book',
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'book',
      },
    },
    { $unwind: '$book' },
    {
      $project: {
        _id: 0,
        title: '$book.title',
        isbn: '$book.isbn',
        totalQuantity: 1,
      },
    },
  ]);
};
