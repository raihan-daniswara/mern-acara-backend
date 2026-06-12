import mongoose from "mongoose";
import { DATABASE_URL } from "../config/env.config";
import dns from "dns";

dns.setServers(['1.1.1.1', '8.8.8.8']);
const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: "db-acara",
    });
    return Promise.resolve("Database connected successfully");
  } catch (error) {
    return Promise.reject("Failed to connect to database: " + error);
  }
};

export default connectDB();