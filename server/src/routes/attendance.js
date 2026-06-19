import { Router } from "express";
import Attendance from "../models/Attendance.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;
    const filter = {};
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = from;
      if (to)   filter.date.$lte = to;
    }
    const records = await Attendance.find(filter).sort({ date: -1 }).limit(60);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:date", async (req, res) => {
  try {
    const record = await Attendance.findOne({ date: req.params.date });
    if (!record) return res.status(404).json({ error: "No attendance for this date" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:date", async (req, res) => {
  try {
    const record = await Attendance.findOneAndUpdate(
      { date: req.params.date },
      { $set: req.body },
      { upsert: true, new: true, runValidators: true }
    );
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:date/commit", async (req, res) => {
  try {
    const record = await Attendance.findOneAndUpdate(
      { date: req.params.date },
      { $set: { committed: true } },
      { new: true }
    );
    if (!record) return res.status(404).json({ error: "Not found" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
