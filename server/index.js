// server/index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const historySchema = new mongoose.Schema({
  city: String,
  timestamp: { type: Date, default: Date.now },
});

const History = mongoose.model("History", historySchema);

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.json({ error: "City is required" });

  const apiKey = "21a6874536092db1fe586ca83f094e7c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) return res.json({ error: "City not found" });

    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

app.post("/api/history", async (req, res) => {
  const { city } = req.body;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const newEntry = new History({ city });
    await newEntry.save();
    res.json({ message: "Saved" });
  } catch {
    res.status(500).json({ error: "Failed to save history" });
  }
});

app.get("/api/history", async (req, res) => {
  try {
    const history = await History.find().sort({ timestamp: -1 }).limit(10);
    res.json(history);
  } catch {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

app.delete("/api/history/clear", async (req, res) => {
  try {
    await History.deleteMany({});
    res.json({ message: "History cleared" });
  } catch {
    res.status(500).json({ error: "Failed to clear history" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
