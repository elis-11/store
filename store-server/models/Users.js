import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"
const { Schema, model } = mongoose;


const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        autopopulate: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
    // use toJSON hook function transform
    // is always called on res.json BEFORE data is sent
    // can be used to hide confidential information to frontend like passwords
    toJSON: {
      transform: (doc, documentToReturn) => {
        delete documentToReturn.password;
        return documentToReturn;
      },
    },
  }
);

UserSchema.plugin(autopopulate)

export default mongoose.model("User", UserSchema);
// const User = model("User", UserSchema);
// export default User;
