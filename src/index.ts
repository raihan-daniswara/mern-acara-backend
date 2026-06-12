import express from "express";
import { PORT } from "./config/env.config";
import router from "./routes/api";

export const app = express();

app.use(express.json());

app.use("/api", router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
