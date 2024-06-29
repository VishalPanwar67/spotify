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
  likedSongs: {
    // We will change this to array later
    type: String,
    default: "",
  },
  likedPlaylists: {
    // We will change this to array later
    type: String,
    default: "",
  },
  subscribedArtists: {
    // We will change this to array later
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
