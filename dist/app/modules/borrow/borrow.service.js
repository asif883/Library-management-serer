"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.createBorrow = void 0;
const borrow_model_1 = require("./borrow.model");
const book_model_1 = require("../book/book.model");
const createBorrow = (_a) => __awaiter(void 0, [_a], void 0, function* ({ bookId, quantity, dueDate, }) {
    const book = yield book_model_1.Book.findById(bookId);
    if (!book) {
        throw new Error('Book not found.');
    }
    if (book.copies < quantity) {
        throw new Error('Not enough copies available.');
    }
    // Reduce available copies
    book.copies -= quantity;
    yield book.save();
    const borrow = yield borrow_model_1.Borrow.create({
        book: book._id,
        quantity,
        dueDate,
    });
    return borrow;
});
exports.createBorrow = createBorrow;
const getBorrowSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    return borrow_model_1.Borrow.aggregate([
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
});
exports.getBorrowSummary = getBorrowSummary;
