import mongoose, { Schema } from "mongoose";

const podcastSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: "Artist", // Assuming the host can be considered an artist
    },
    episodes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Episode",
      },
    ],
  },
  { timestamps: true }
);

const Podcast = mongoose.model("Podcast", podcastSchema);
export default Podcast;
