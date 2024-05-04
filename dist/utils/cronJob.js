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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCronJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const client_1 = require("@prisma/client");
const startCronJob = () => {
    const prisma = new client_1.PrismaClient();
    node_cron_1.default.schedule("0 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Cron job executing at:", new Date().toLocaleString());
        try {
            const products = yield prisma.products.findMany({});
            if (products) {
                products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield prisma.sales.create({
                        data: {
                            product_id: product.id,
                            quantity_sold: Math.floor(Math.random() * 10) + 1,
                            sale_date: new Date(),
                        },
                    });
                }));
            }
        }
        catch (err) {
            console.log("Error while running cron job: ", err);
        }
    }));
};
exports.startCronJob = startCronJob;
//# sourceMappingURL=cronJob.js.map