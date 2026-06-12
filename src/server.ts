import app from "./index";
import { PORT } from "./config/env.config";
import connectDB from "./utils/database";

async function init() {
  try {
    const result = await connectDB;
    console.log("Database status: " + result);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

init();