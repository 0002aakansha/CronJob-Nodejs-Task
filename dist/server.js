"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./routes/products"));
const cronJob_1 = require("./utils/cronJob");
const products_2 = require("./controllers/products");
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
(0, products_2.executeOnceOnServerStart)();
(0, cronJob_1.startCronJob)();
app.use("/products", products_1.default);
app.use(globalErrorHandler_1.default);
app.listen(process.env.PORT, () => {
    return console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map