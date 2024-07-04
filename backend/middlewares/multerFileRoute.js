import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/"); // Uploads directory
  },
  filename: function (req, file, cb) {
    // Rename uploaded file (you can customize filename as needed)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const multerUpload = multer({ storage: storage });

export default multerUpload;
