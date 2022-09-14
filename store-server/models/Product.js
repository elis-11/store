import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: {type: String},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Product = model("Product", ProductSchema);
export default Product;
