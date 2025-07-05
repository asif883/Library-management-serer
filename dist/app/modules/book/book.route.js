"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post('/', book_controller_1.addBook);
router.get('/', book_controller_1.fetchBooks);
router.get('/available', book_controller_1.fetchAvailableBooks);
router.get('/:bookId', book_controller_1.fetchBookById);
router.put('/:bookId', book_controller_1.updateBookById);
router.delete('/:bookId', book_controller_1.deleteBookById);
exports.default = router;
