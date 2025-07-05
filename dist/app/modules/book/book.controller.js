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
exports.deleteBookById = exports.updateBookById = exports.fetchBookById = exports.fetchAvailableBooks = exports.fetchBooks = exports.addBook = void 0;
const book_service_1 = require("./book.service");
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    const newBook = yield (0, book_service_1.createBook)(bookData);
    res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: newBook,
    });
});
exports.addBook = addBook;
const fetchBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield (0, book_service_1.getAllBooks)(req.query);
    res.status(200).json({
        success: true,
        message: 'Books retrieved successfully',
        data: books,
    });
});
exports.fetchBooks = fetchBooks;
const fetchAvailableBooks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield (0, book_service_1.getAvailableBooks)();
    res.status(200).json({
        success: true,
        message: 'Available books retrieved successfully',
        data: books,
    });
});
exports.fetchAvailableBooks = fetchAvailableBooks;
// find book by ID
const fetchBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const book = yield (0, book_service_1.getBookById)(bookId);
    res.status(200).json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
    });
});
exports.fetchBookById = fetchBookById;
// update book
const updateBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const book = yield (0, book_service_1.updateBook)(bookId, req.body);
    res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        data: book,
    });
});
exports.updateBookById = updateBookById;
// delete single book 
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    yield (0, book_service_1.deleteBook)(bookId);
    res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
        data: null,
    });
});
exports.deleteBookById = deleteBookById;
