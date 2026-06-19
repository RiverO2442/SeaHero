import { Router } from "express";
import Payroll from "../models/Payroll.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const runs = await Payroll.find({}, "period createdAt entries").sort({ createdAt: -1 });
    const summary = runs.map((r) => ({
      id: r._id,
      period: r.period,
      createdAt: r.createdAt,
      totalEmployees: r.entries.length,
      totalNet: r.entries.reduce((s, e) => s + e.netPay, 0),
    }));
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:period", async (req, res) => {
  try {
    const run = await Payroll.findOne({ period: req.params.period });
    if (!run) return res.status(404).json({ error: "No payroll for this period" });
    res.json(run);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:period", async (req, res) => {
  try {
    const run = await Payroll.findOneAndUpdate(
      { period: req.params.period },
      { $set: req.body },
      { upsert: true, new: true, runValidators: true }
    );
    res.json(run);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:period/entries/:entryId", async (req, res) => {
  try {
    const run = await Payroll.findOneAndUpdate(
      { period: req.params.period, "entries._id": req.params.entryId },
      { $set: { "entries.$.status": req.body.status } },
      { new: true }
    );
    if (!run) return res.status(404).json({ error: "Not found" });
    res.json(run);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
