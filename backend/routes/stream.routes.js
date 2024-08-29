import express from "express";
import fs from "fs";
import path from "path";
import https from "https";

import { Song } from "../models/index.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    const fileUrl = song.fileUrl;
    const fileName =
      song.title + "_" + path.basename(new URL(fileUrl).pathname); // Generate local file name
    const localFilePath = path.join(
      process.cwd(),
      "backend/public/songs",
      fileName
    );

    // Check if the file already exists locally
    if (fs.existsSync(localFilePath)) {
      console.log(`Streaming song from local file: ${localFilePath}`);
      return streamFile(localFilePath, res, req.headers.range);
    }

    // If the file doesn't exist, download it from Cloudinary
    console.log(`Downloading song from Cloudinary: ${fileUrl}`);
    const fileStream = fs.createWriteStream(localFilePath);

    https
      .get(fileUrl, (cloudinaryRes) => {
        cloudinaryRes.pipe(fileStream);

        fileStream.on("finish", () => {
          console.log(`File downloaded and saved to ${localFilePath}`);
          streamFile(localFilePath, res, req.headers.range); // Stream the downloaded file
        });
      })
      .on("error", (error) => {
        console.error(`Error in downloading file: ${error}`);
        return res.status(500).json({ error: "Unable to download file" });
      });
  } catch (error) {
    console.error(`Error in stream: ${error}`);
    return res.status(500).json({ error: "Unable to stream the song" });
  }
});

// Helper function to stream the file
function streamFile(filePath, res, range) {
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize) {
      return res.status(416).send("Requested range not satisfiable");
    }

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "audio/mpeg",
    });

    const readStream = fs.createReadStream(filePath, { start, end });
    readStream.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "audio/mpeg",
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  }
}

export default router;
