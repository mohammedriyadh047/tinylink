import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { url, customCode } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortcode = customCode || Math.random().toString(36).substring(2, 8);

  try {
    const check = await pool.query(
      "SELECT shortcode FROM links WHERE shortcode = $1",
      [shortcode]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ error: "Shortcode already exists" });
    }

    await pool.query(
      "INSERT INTO links (shortcode, target_url, total_clicks) VALUES ($1, $2, 0)",
      [shortcode, url]
    );
    res.json({
      shortcode,
      shortUrl: ${req.headers.host}/${shortcode}
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
