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
exports.borrowedSummary = exports.borrowBook = void 0;
const borrow_service_1 = require("./borrow.service");
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { quantity, dueDate } = req.body;
        const borrow = yield (0, borrow_service_1.createBorrow)({ bookId, quantity, dueDate });
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong while borrowing.',
        });
    }
});
exports.borrowBook = borrowBook;
const borrowedSummary = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield (0, borrow_service_1.getBorrowSummary)();
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch summary',
        });
    }
});
exports.borrowedSummary = borrowedSummary;
