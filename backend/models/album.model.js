// const mongoose = require("mongoose");
import mongoose, { Schema } from "mongoose";

const albumSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    releaseDate: {
      type: Date,
    },
    genre: {
      type: String,
    },
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumSchema);

export default Album;
