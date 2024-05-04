import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
};

export const startCronJob = () => {
  const prisma = new PrismaClient();
  cron.schedule("0 * * * *", async () => {
    console.log("Cron job executing at:", new Date().toLocaleString());
    try {
      const products = await prisma.products.findMany({});
      if (products) {
        products.map(
          async (product) =>
            await prisma.sales.create({
              data: {
                product_id: product.id,
                quantity_sold: Math.floor(Math.random() * 10) + 1,
                sale_date: new Date(),
              },
            })
        );
      }
    } catch (err) {
      console.log("Error while running cron job: ", err);
    }
  });
};
