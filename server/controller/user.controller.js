import asyncHandler from "express-async-handler";

import { db } from "../config/database.js";
import { ObjectId } from "mongodb";
import cloudinaryService from "../services/cloudinary.service.js";

const uploadAvatar = asyncHandler(async (req, res) => {
  const file = req.file;
  const user = req.user;

  const { url } = await cloudinaryService.upLoadSingleFile(file.path);

  await db.users.updateOne(
    { _id: new ObjectId(user.id) },
    {
      $set: {
        avatar: url,
      },
    }
  );

  res.json({
    message: "Update user successfully",
  });
});
const updateProfile = asyncHandler(async (req, res) => {});

const UserController = {
  uploadAvatar,
  updateProfile,
};

export default UserController;
