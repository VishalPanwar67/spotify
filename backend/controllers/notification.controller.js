import { Notification } from "../models/index.js";

const getNotifications = async (req, res) => {
  const userId = req.user._id;
  // const artistId = req.artist._id;
  try {
    //get notifications
    // console.log(`this is userId ${userId}`);
    // console.log(`this is userId ${artistId}`);
    const notifications = await Notification.find({ to: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "from",
        select: "username profileImg",
      });

    // console.log(`this is notifications ${notifications}`);

    //// Mark all notifications as read
    await Notification.updateMany({ to: userId }, { read: true });
    res.status(200).json({ notifications });
  } catch (error) {
    console.log(`Unable to get notifications :: ${error.message}`);
    res.status(500).json({ error: "Unable to get notifications" });
  }
};

const deleteAllNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    await Notification.deleteMany({ to: userId });
    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log(`Unable to delete notifications :: ${error.message}`);
    res.status(500).json({ error: "Unable to delete notifications" });
  }
};
const deleteNotifications = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    await Notification.deleteOne({ _id: id, to: userId });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log(`Unable to delete notification :: ${error.message}`);
    res.status(500).json({ error: "Unable to delete notification" });
  }
};

export { getNotifications, deleteNotifications, deleteAllNotifications };
