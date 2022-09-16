import { Router } from "express";
import { auth } from "../lib/auth.middleware.js";
import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

const productRouter = Router();

// get all products
productRouter.get("/", async (req, res, next) => {
  const productsAll = await Product.find();
  res.json(productsAll);
});

// get single product
productRouter.get("/:id", async (req, res, next) => {
  const productSingle = await Product.findById(req.params.id);
  res.json(productSingle);
});

// create new product
productRouter.post("/", auth, async (req, res, next) => {
  const productData = req.body;

  try {
    //   store new product in database
    const product = await Product.create(productData);

    if (!product.image) return;
    // upload image to cloudinary
    const resCloudinary = await cloudinary.uploader.upload(product.image);

    // store resaved URL of image in database => user => avatar
    const imageUrlCloudinary = resCloudinary.secure_url;
    const productUpdated = await Product.findByIdAndUpdate(
      product._id,
      { image: imageUrlCloudinary },
      { new: true }
    );
    console.log(productUpdated);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//update product + change image
productRouter.patch("/:id", auth, async (req, res, next) => {
  const productUpdateData = req.body;
  const productId = req.params.id;

  try {
    // update product in database
    const productUpdated = await Product.findByIdAndUpdate(
      productId,
      productUpdateData,
      { new: true }
    );
    res.json(productUpdated);

    // if user not uploaded image => skip cloudinary upload
    if (!productUpdateData.image) return;

    // upload image to cloudinary
    const resCloudinary = await cloudinary.uploader.upload(
      productUpdateData.image
    );

    const avatarUrlCloudinary = resCloudinary.secure_url;
    await Product.findByIdAndUpdate(
      productUpdated._id,
      { image: avatarUrlCloudinary },
      { new: true }
    );
  } catch (err) {
    next(err);
  }
});

// delete product
productRouter.delete("/:id", auth, async (req, res, next) => {
  // findByIdAndUpdate can crash server
  // so catch it & prevent crash => just forward to error handler
  try {
    const productDeleted = await Product.findByIdAndDelete(req.params.id);
    res.json(productDeleted);
  } catch (err) {
    next(err);
  }
});

export default productRouter;
