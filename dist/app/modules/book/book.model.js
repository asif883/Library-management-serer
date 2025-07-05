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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
        type: String,
        required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: [0, 'Copies must be a positive number'] },
    available: { type: Boolean, default: true },
}, {
    timestamps: true,
});
// Instance method to borrow book copies
bookSchema.methods.borrowBook = function (quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.copies < quantity) {
            throw new Error('Not enough copies available.');
        }
        this.copies -= quantity;
        if (this.copies === 0) {
            this.available = false;
        }
        yield this.save();
    });
};
// Static method to get available books
bookSchema.statics.getAvailableBooks = function () {
    return this.find({ available: true });
};
// Middleware to ensure available flag consistency
bookSchema.pre('save', function (next) {
    if (this.copies === 0) {
        this.available = false;
    }
    else {
        this.available = true;
    }
    next();
});
// Remove _v from JSON output
bookSchema.set('toJSON', {
    transform: (_doc, ret) => {
        delete ret.__v;
        return ret;
    },
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
