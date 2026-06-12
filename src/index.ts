import express from "express";
import { PORT } from "./config/env.config";
import router from "./routes/api";
import "./utils/database";
import connectDB from "./utils/database";
import docs from "./docs/route";
import cors from "cors";

async function init() {
  try {
    const result = await connectDB;
    console.log("Database status: " + result);

    const app = express();
    app.use(cors())
    app.use(express.json());

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    app.use("/api", router);

    docs(app);
  } catch (error) {
    console.error("Failed to start the server: ", error);
  }
}

init();
