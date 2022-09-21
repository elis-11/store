import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
    group: {
      type: String,
      default: "trend",
      enum: ["trend", "wedding", "chiffon", "flourless"],
    },
    price: { type: Number, required: true },
    image: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ProductSchema.plugin(autopopulate);

const Product = model("Product", ProductSchema);
export default Product;
