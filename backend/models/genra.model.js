import mongoose, { Schema } from "mongoose";

const genreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
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

const Genre = mongoose.model("Genre", genreSchema);
export default Genre;
