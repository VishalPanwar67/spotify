import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // to get cookies from req object and set cookies in res object
import { v2 as cloudinary } from "cloudinary"; //for using cloudinary
import {
  authRoutes,
  songRoutes,
  artistRoutes,
  albumRoutes,
  playlistRoutes,
  searchRoutes,
  streamRoutes,
} from "./routes/index.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

//configs
dotenv.config({
  path: "././.env",
}); //dotevn file configed
const PORT = process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

//middlewares
app.use(express.json()); // to parse req.body
app.use(urlencoded({ extended: true }));
app.use(cookieParser()); // to get cookies from req object and set cookies in res object

//routes
app.get("/", (req, res) => {
  res.send("This is Spotify app");
});
app.use("/api/auth", authRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/song", songRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/stream", streamRoutes);

//connect to mongoDB
connectMongoDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`app is not able to connect :: ${error}`);
      throw error;
    });
    app.listen(PORT || 3000, () => {
      console.log(`app is listening on port :: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`index.js :: connectDB connection failed  :: ${error}`);
  });
