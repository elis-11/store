import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import { auth } from "../lib/auth.middleware.js";
import config from "../config.js";
import { v2 as cloudinary } from "cloudinary";
import { isAdmin } from "../lib/admin.middleware.js";

const userRouter = Router();

// get all Users
userRouter.get("/", auth, async (req, res, next) => {
  const usersAll = await User.find();
  res.json(usersAll);
});

// admin
userRouter.get("/admin", auth, isAdmin, async (req, res, next) => {
  const admins = await User.find({ role: "admin" });
  res.json(admins);
});

// single user
userRouter.get("/:id", auth, async (req, res, next) => {
  const userId = req.params.id;
  const userSingle = await User.findById(userId);
  res.json(userSingle);
});

// signup user
userRouter.post("/", async (req, res, next) => {
  const userData = req.body;
  const { email } = userData;
  const userExists = await User.findOne({ email });

  const avatarImageString = userData.avatar;
  if (userExists) {
    return res.status(400).json({
      error: "User with this email already exists",
    });
  }
  userData.password = bcrypt.hashSync(userData.password, 10);
  const user = await User.create(userData);
  res.json(user);
  if (!avatarImageString) return;
  const resCloudinary = await cloudinary.uploader.upload(avatarImageString);
  console.log(resCloudinary);

  const avatarUrlCloudinary = resCloudinary.secure_url;
  const userUpdated = await User.findByIdAndUpdate(
    user._id,
    { avatar: avatarUrlCloudinary },
    { new: true }
  );
  console.log(userUpdated);
});

// login user
userRouter.post("/login", async (req, res, next) => {
  const passwordPlain = req.body.password;
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "User does not exist" });
  }
  const matches = bcrypt.compareSync(passwordPlain, user.password);
  if (!matches) {
    return res.status(400).json({ error: "Password incorrect!" });
  }
  const userPublic = user.toJSON();
  const token = jwt.sign(userPublic, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRY,
  });
  res.json({ ...userPublic, token });
});

// update user
userRouter.patch("/:id", auth, async (req, res, next) => {
  const userUpdateData = req.body;
  const userId = req.params.id;

  try {
    const userUpdated = await User.findByIdAndUpdate(userId, userUpdateData, {
      new: true,
    });
    res.json(userUpdated);
  } catch (err) {
    next(err);
  }
});

// delete user
userRouter.delete("/:id", auth, async (req, res, next)=>{
    try {
        const userDeleted= await User.findByIdAndDelete(req.params.id)
        res.json(userDeleted);
    } catch (err) {
        next(err);
    }
})

export default userRouter;
