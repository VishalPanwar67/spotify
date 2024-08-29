import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  likedSongs: [
    {
      // We will change this to array later
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      default: "",
    },
  ],
  likedPlaylists: {
    // We will change this to array later
    type: String,
    default: "",
  },
  playlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
      default: [], // required: true,
    },
  ],
  subscribedArtists: [
    {
      type: mongoose.Schema.Types.ObjectId, // taking the following form the User model
      ref: "Artist",
      default: [],
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
