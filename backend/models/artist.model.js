import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
  },
  stageName: {
    type: String,
    required: [true, "Stage name is required"],
    unique: true,
  },
  genre: {
    type: [String], // Multiple genres
    // required: [true, "At least one genre is required"],
  },
  bio: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "",
    validate: {
      validator: function (v) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png)$/.test(v); // Validates image URLs
      },
      message: (props) =>
        `${props.value} is not a valid URL for an image file!`,
    },
  },
  coverPicture: {
    type: String,
    default: "",
    validate: {
      validator: function (v) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png)$/.test(v); // Validates image URLs
      },
      message: (props) =>
        `${props.value} is not a valid URL for an image file!`,
    },
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
  subscriber: [
    {
      type: mongoose.Schema.Types.ObjectId, // taking the following form the User model
      ref: "User",
      default: [],
    },
  ],
});

artistSchema.index(
  {
    stageName: "text",
    firstName: "text",
    lastName: "text",
  },
  {
    weights: {
      stageName: 5, // Higher weight to stageName for better relevance
      firstName: 3,
      lastName: 1,
    },
  }
);

const Artist = mongoose.model("Artist", artistSchema);

export default Artist;
