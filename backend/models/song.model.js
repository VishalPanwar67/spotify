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
    track: {
      type: String,
      required: true,
    },
    artist: {
      type: mongoose.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    album: {
      type: String,
    },
    duration: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", SongSchema);
export default Song;
