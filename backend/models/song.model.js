import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // Duration in seconds
    required: true,
  },
  fileUrl: {
    type: String,
    required: true, // This will store the Cloudinary URL
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
