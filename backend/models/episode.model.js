import mongoose, { Schema } from "mongoose";

const episodeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    podcast: {
      type: Schema.Types.ObjectId,
      ref: "Podcast",
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Episode = mongoose.model("Episode", episodeSchema);
export default Episode;
