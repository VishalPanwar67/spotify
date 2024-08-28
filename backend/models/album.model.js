import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Album title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
  },
  releaseDate: {
    // type: Date,
    type: Date,
    required: [true, "Release date is required"],
  },
  coverImage: {
    type: String,
    required: [true, "Cover image is required"],
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png)$/.test(v); // Validates image URLs
      },
      message: (props) =>
        `${props.value} is not a valid URL for an image file!`,
    },
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    // required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

albumSchema.index({
  title: "text",
});

const Album = mongoose.model("Album", albumSchema);

export default Album;
