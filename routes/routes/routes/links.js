import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET /api/links  -> list all links
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT shortcode, target_url, total_clicks, last_clicked_at, created_at FROM links ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/links/:code -> single link details
router.get("/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const result = await pool.query(
      "SELECT shortcode, target_url, total_clicks, last_clicked_at, created_at FROM links WHERE shortcode = $1",
      [code]
    );

    if (result.rows.length === 0) {
       return res.status(404).json({ error: "Not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
