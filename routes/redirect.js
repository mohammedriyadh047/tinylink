import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Redirect handler: GET /:code
router.get("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const result = await pool.query(
      "SELECT target_url, total_clicks FROM links WHERE shortcode = $1",
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    const { target_url, total_clicks } = result.rows[0];

    await pool.query(
      "UPDATE links SET total_clicks = $1, last_clicked_at = NOW() WHERE shortcode = $2",
      [total_clicks + 1, code]
    );

    return res.redirect(302, target_url);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});
export default router;
