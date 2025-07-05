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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAvailableBooks = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("./book.model");
// create book
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.Book.create(bookData);
});
exports.createBook = createBook;
// all books
const getAllBooks = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = queryParams;
    const filterCondition = {};
    if (filter) {
        filterCondition.genre = filter;
    }
    const sortCondition = {};
    sortCondition[sortBy] = sort === 'asc' ? 1 : -1;
    return book_model_1.Book.find(filterCondition).sort(sortCondition).limit(Number(limit));
});
exports.getAllBooks = getAllBooks;
// check available
const getAvailableBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    return book_model_1.Book.getAvailableBooks();
});
exports.getAvailableBooks = getAvailableBooks;
// find single book
const getBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return book_model_1.Book.findById(bookId);
});
exports.getBookById = getBookById;
// update
const updateBook = (bookId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    return book_model_1.Book.findByIdAndUpdate(bookId, updatedData, { new: true });
});
exports.updateBook = updateBook;
// delete
const deleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    yield book_model_1.Book.findByIdAndDelete(bookId);
    return null;
});
exports.deleteBook = deleteBook;
