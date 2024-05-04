import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import productRouter from "./routes/products";
import { startCronJob } from "./utils/cronJob";
import { executeOnceOnServerStart } from "./controllers/products";
import GlobalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

executeOnceOnServerStart();
startCronJob();

app.use("/products", productRouter);
app.use(GlobalErrorHandler);

app.listen(process.env.PORT, () => {
  return console.log(
    `Server is listening at http://localhost:${process.env.PORT}`
  );
});
