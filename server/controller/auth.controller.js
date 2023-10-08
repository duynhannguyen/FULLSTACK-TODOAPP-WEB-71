import { db } from "../config/database.js";
import { ObjectId } from "mongodb";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = asyncHandler(async (req, res) => {
  const { email, password, address, fullname, gender } = req.body;

  const existingUser = await db.users.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Email has already exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    email,
    password: hashedPassword,
    address,
    fullname,
    gender,
    createAt: new Date(),
    updateAt: new Date(),
  };

  await db.users.insertOne(newUser);

  const createdUser = await db.users.findOne(
    { email },
    {
      projection: {
        password: 0,
      },
    }
  );
  res.status(201).json(createdUser);
});
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  const existingUser = await db.users.findOne({ email });
  if (!existingUser) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  const isMatchedPassword = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isMatchedPassword) {
    res.status(400);
    throw new Error("Password or email is not match");
  }

  const payload = {
    id: existingUser._id,
    email: existingUser.email,
    fullname: existingUser.fullname,
  };

  const SECRET_KEY = process.env.SECRET_KEY;

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

  res.status(200).json({
    message: "login successfully",
    accessToken: token,
  });
});

const fetchCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const currentUser = await db.users.findOne(
    { _id: new ObjectId(userId) },
    {
      projection: {
        password: 0,
      },
    }
  );

  if (!currentUser) {
    res.status(401);
    throw new Error("Unauthorized, please try again!");
  }

  res.json(currentUser);
});

const authController = {
  signup,
  login,
  fetchCurrentUser,
};

export default authController;
