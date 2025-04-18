import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// Sign token with user data
export const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    SECRET,
    {
      expiresIn: "1d",
    }
  );
};

// Verify token and return decoded user info
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    console.error("❌ JWT verification failed:", error.message);
    return null;
  }
};
