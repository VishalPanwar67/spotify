import { User, Song, Playlist, Album } from "../models/index.js";

const songRecomdFromMutualUsers = async (req, res) => {
  const userId = req.user._id;
  try {
    const currentUser = await User.findById(userId)
      .select("-password")
      .populate("likedSongs")
      .exec();

    // console.log(`this is currentUser ${currentUser}`);

    const mutualUsers = await User.find({
      _id: { $ne: userId },
      likedSongs: { $in: currentUser.likedSongs.map((song) => song._id) },
    })
      .select("likedSongs")
      .populate("likedSongs")
      .exec();

    // console.log(`this is mutualUsers ${mutualUsers}`);

    if (mutualUsers.length === 0) {
      return res.status(200).json({
        recomdsSongs: [],
        message: "No recommendations found based on mutual user preferences.",
      });
    }

    let songScores = {};
    mutualUsers.forEach((user) => {
      user.likedSongs.forEach((song) => {
        if (!currentUser.likedSongs.some((s) => s._id.equals(song._id))) {
          if (!songScores[song._id]) {
            songScores[song._id] = { song: song, score: 0 };
          }
          songScores[song._id].score += 1;
        }
      });
    });

    // Sort songs by score
    const recommendations = Object.values(songScores).sort(
      (a, b) => b.score - a.score
    );
    const recomdsSongs = recommendations.map((item) => item.song);

    return res.status(200).json({ recomdsSongs });
  } catch (error) {
    console.log(`Unable to get song: ${error.message}`);
    return res.status(500).json({ error: "Unable to get song Recomd" });
  }
};

const playlistRecomdFromMutualUsers = async (req, res) => {};

const artistRecomdFromMutualUsers = async (req, res) => {};

export {
  songRecomdFromMutualUsers,
  playlistRecomdFromMutualUsers,
  artistRecomdFromMutualUsers,
};
