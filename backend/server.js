import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // to get cookies from req object and set cookies in res object

import { authRoutes } from "./routes/index.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config({
  path: "././.env",
}); //dotevn file configed
const PORT = process.env.PORT;

const app = express();
app.use(express.json()); // to parse req.body
app.use(urlencoded({ extended: true }));
app.use(cookieParser()); // to get cookies from req object and set cookies in res object

app.get("/", (req, res) => {
  res.send("This is Spotify app");
});

app.use("/api/auth", authRoutes);

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });

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
