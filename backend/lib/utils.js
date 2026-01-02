import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
  const secret = process.env.JWT_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret not configured. Please set JWT_SECRET in your .env file");
  }

  const token = jwt.sign({ userId }, secret, { expiresIn: "7d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // prevents XSS attacks
    sameSite: "Strict", // prevents CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
}