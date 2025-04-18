// dbConnect.js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) return;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "next-auth-mui",
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};
