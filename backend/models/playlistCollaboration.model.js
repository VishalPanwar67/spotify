import mongoose, { Schema } from "mongoose";
// const Schema = mongoose.Schema;

const playlistCollaborationSchema = new Schema(
  {
    playlist: {
      type: Schema.Types.ObjectId,
      ref: "Playlist",
      required: true,
    },
    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const PlaylistCollaboration = mongoose.model(
  "PlaylistCollaboration",
  playlistCollaborationSchema
);

export default PlaylistCollaboration;
