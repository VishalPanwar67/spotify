import jwt from "jsonwebtoken";

const artistGenerateTokenAndSetCookie = (artistId, res) => {
  const artisttoken = jwt.sign({ artistId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("artisttoken", artisttoken, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Expires in 15 days
    httpOnly: true, // Accessible only by web server
    sameSite: "strict", // Strictly same-site requests
    secure: process.env.NODE_ENV !== "development", // HTTPS if not in dev mode
  });
};

export default artistGenerateTokenAndSetCookie;
