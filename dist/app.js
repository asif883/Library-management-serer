"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./app/middleware/errorHandler");
const book_route_1 = __importDefault(require("./app/modules/book/book.route"));
const borrow_route_1 = __importDefault(require("./app/modules/borrow/borrow.route"));
const app = (0, express_1.default)();
// middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// book API routes
app.use('/api/books', book_route_1.default);
app.use('/api/borrow', borrow_route_1.default);
// root route
app.get('/', (req, res) => {
    res.send('Library Management server is Running');
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
