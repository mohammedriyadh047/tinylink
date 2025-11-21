import express from "express";
import { pool } from "../db.js";

const router = express.Router();


router.delete("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM links WHERE shortcode = $1 RETURNING shortcode",
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({ success: true, deleted: result.rows[0].shortcode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
