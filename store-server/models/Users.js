import mongoose from "mongoose";

const { Schema, model } = mongoose;
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, documentToReturn) => {
        delete documentToReturn.password;
        return documentToReturn;
      },
    },
  }
);
const User = model("User", UserSchema);
export default User;
