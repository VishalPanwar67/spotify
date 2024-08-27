import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  stageName: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: [String], // Multiple genres
    // required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  socialLinks: {
    type: [String],
    default: [],
  },
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
    },
  ],
});

const Artist = mongoose.model("Artist", artistSchema);

export default Artist;
