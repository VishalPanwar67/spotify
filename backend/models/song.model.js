import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Song title is required"],
    minlength: [3, "Title must be at least 3 characters long"],
  },
  duration: {
    type: Number, // Duration in seconds
    required: [true, "Song duration is required"],
    min: [1, "Duration must be at least 1 second"],
  },
  fileUrl: {
    type: String,
    required: [true, "File URL is required"],
    validate: {
      validator: function (v) {
        return (
          /^https?:\/\/.+\.(mp3|wav)$/.test(v) ||
          /^[A-Za-z]:\\.+\.(mp3|wav)$/.test(v)
        );
      },
      message: (props) =>
        `${props.value} is not a valid URL for an audio file!`,
    },
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
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
});

songSchema.index({
  title: "text",
});

const Song = mongoose.model("Song", songSchema);

export default Song;
