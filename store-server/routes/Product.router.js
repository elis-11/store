import { Router } from "express";

const productRouter = Router();

// get all products
productRouter.get("/", async (req, res, next) => {
  const productsAll = await Product.find();
  res.json(productsAll);
});

export default productRouter;
