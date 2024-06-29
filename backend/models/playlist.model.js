import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Song",
    },
  ],
  collaborators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

export default Playlist;
