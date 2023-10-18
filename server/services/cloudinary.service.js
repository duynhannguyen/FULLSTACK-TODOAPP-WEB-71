import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});
const upLoadSingleFile = (filePath, folder = "todoapp") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        resource_type: "auto",
        folder: "todoapp",
      },
      (error, result) => {
        if (error) {
          reject(error);
          throw new Error(error);
        } else {
          fs.unlinkSync(filePath);
          console.log("result", result);
          resolve({
            url: result.secure_url,
            id: result.public_id,
          });
        }
      }
    );
  });
};

const cropImage = () => {};

const cloudinaryService = {
  upLoadSingleFile,
  cropImage,
};

export default cloudinaryService;
