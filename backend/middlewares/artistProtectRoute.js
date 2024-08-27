import jwt from "jsonwebtoken";
import Artist from "../models/artist.model.js";
// import User from "../models/user.model.js";

const artistProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.artisttoken;
    if (!token) {
      return res.status(401).json({ error: "User not logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const artist = await Artist.findById(decoded.artistId);
    // console.log("vishal artist protected " + artist);
    if (!artist) {
      return res.status(401).json({ error: "Unauthorized: User not artist" });
    }

    req.artist = artist; //set user in req
    next();
  } catch (error) {
    console.log(`Error in protectRoute middleware: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export default artistProtectRoute;
