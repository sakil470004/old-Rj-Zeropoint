import jwt from "jsonwebtoken";
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // additional options for the cookie
  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days//ms format
    httpOnly: true, //prevent xxs attacks cross-site scripting attacks.
    sameSite: "strict", //csrf attacks cross-site request forgery attacks.
    secure: process.env.NODE_ENV !== "development" ? true : false,
  }); //{} is for options
};
export default generateTokenAndSetCookie;
