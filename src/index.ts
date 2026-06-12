import express from "express";
import cors from "cors";
import router from "./routes/api";
import docs from "./docs/route";
import "./utils/database";

const app = express();

app.use(cors());
app.use(express.json());

docs(app);

app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Backend Acara API is running",
    data: "OK"
  });
});

export default app;
