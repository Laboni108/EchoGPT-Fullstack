import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      // allow tools without an origin (curl, Postman) and our known frontends
      if (!origin || env.corsOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "echogpt-backend",
    time: new Date().toISOString(),
  });
});

// unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// central error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    error: env.nodeEnv === "production" ? "Internal server error" : err.message,
  });
});

export default app;