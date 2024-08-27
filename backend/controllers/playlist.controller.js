import { User, Playlist } from "../models/index.js";

const createPlaylist = async (req, res) => {
  const userId = req.user._id;
  console.log("this is user " + userId);
  try {
    const { name, description } = req.body;
    const playlist = await Playlist.create({
      name,
      description,
      user: userId,
    });
    await playlist.save();

    const user = await User.findById(userId);
    user.playlist.push(playlist._id);
    await user.save();
    res.status(201).json(playlist);
  } catch (error) {
    console.log(`Unable to create playlist: ${error}`);
    return res.status(500).json({ error: "Unable to create playlist" });
  }
};

const getAllPlaylist = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).json(playlists);
  } catch (error) {
    console.log(`Unable to get playlists: ${error}`);
    return res.status(500).json({ error: "Unable to get playlists" });
  }
};

const getPlaylist = async (req, res) => {
  const id = req.params.id;
  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    res.status(200).json(playlist);
  } catch (error) {
    console.log(`Unable to get playlist: ${error}`);
    return res.status(500).json({ error: "Unable to get playlist" });
  }
};

const updatePlaylist = async (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    if (playlist.user.toString() !== userId.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    playlist.name = name || playlist.name;
    playlist.description = description || playlist.description;
    await playlist.save();
    res.status(200).json(playlist);
  } catch (error) {
    console.log(`Unable to update playlist: ${error}`);
    return res.status(500).json({ error: "Unable to update playlist" });
  }
};

const deletePlaylist = async (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    if (playlist.user.toString() !== userId.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(userId);
    user.playlist.pull(playlist._id);
    await user.save();
    await Playlist.findByIdAndDelete(id);
    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.log(`Unable to delete playlist: ${error}`);
    return res.status(500).json({ error: "Unable to delete playlist" });
  }
};

const addSongToPlaylist = async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    if (playlist.user.toString() !== userId.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const songId = req.body.songs;
    // console.log("this is song id " + songId);
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    } else {
      console.log("song already in playlist");
    }
    res.status(200).json(playlist);
  } catch (error) {
    console.log(`Unable to add song to playlist: ${error}`);
    return res.status(500).json({ error: "Unable to add song to playlist" });
  }
};

const removeSongFromPlaylist = async (req, res) => {
  const id = req.params.id;
  const songId = req.params.songId;
  const userId = req.user._id;
  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    if (playlist.user.toString() !== userId.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (playlist.songs.includes(songId)) {
      playlist.songs.pull(songId);
      await playlist.save();
    } else {
      console.log("song not found in playlist");
    }

    res.status(200).json(playlist);
  } catch (error) {
    console.log(`Unable to remove song from playlist: ${error}`);
    return res
      .status(500)
      .json({ error: "Unable to remove song from playlist" });
  }
};

export {
  createPlaylist,
  getPlaylist,
  getAllPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
};
