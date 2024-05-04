"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodError = void 0;
const formatZodError = (err) => {
    if (err === null || err === void 0 ? void 0 : err.length) {
        const formattedErrors = err === null || err === void 0 ? void 0 : err.map((err) => {
            const path = err.path.join(".");
            return `${path}: ${err.message}`;
        });
        return formattedErrors === null || formattedErrors === void 0 ? void 0 : formattedErrors.join(", ");
    }
    return null;
};
exports.formatZodError = formatZodError;
//# sourceMappingURL=formatZodError.js.map