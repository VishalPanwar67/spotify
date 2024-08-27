import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// import path from "path";

// Multer configuration for file uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "songs",
    resource_type: "auto",
  },
});

const upload = multer({ storage: storage });

export default upload;
