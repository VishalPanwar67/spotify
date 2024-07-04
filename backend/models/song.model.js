import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    artist: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    track: {
      type: String,
    },
    album: {
      type: String,
    },
    genre: {
      type: String,
    },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", SongSchema);
export default Song;
