"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).json({
            message: 'Validation failed',
            success: false,
            error: err,
        });
    }
    else {
        res.status(err.statusCode || 500).json({
            message: err.message || 'Internal Server Error',
            success: false,
            error: err,
        });
    }
};
exports.errorHandler = errorHandler;
