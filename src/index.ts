import express from "express";
import { PORT } from "./config/env.config";
import router from "./routes/api";
import "./utils/database";
import connectDB from "./utils/database";

async function init() {
  try {
    const result = await connectDB;
    console.log("Database status: " + result)

    const app = express();
    app.use(express.json());

    app.use("/api", router);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server: ", error);
  }
}

init();
