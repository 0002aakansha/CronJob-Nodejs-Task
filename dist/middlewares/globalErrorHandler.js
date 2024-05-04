"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ error: message });
};
exports.default = GlobalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map