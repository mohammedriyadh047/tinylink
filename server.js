import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import shortenRouter from "./routes/shorten.js";
import redirectRouter from "./routes/redirect.js";
import deleteRouter from "./routes/delete.js";
import linksRouter from "./routes/links.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/shorten", shortenRouter);
app.use("/api/links", linksRouter);
app.use("/api/delete", deleteRouter);
app.use("/", redirectRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
