
const router = require("express").Router();
const Attendance = require("../models/Attendance");

router.post("/", async (req, res) => {
  try {
    res.status(201).json(await Attendance.create(req.body));
  } catch {
    res.status(400).json({ message: "Attendance exists" });
  }
});

router.get("/:employeeId", async (req, res) => {
  res.json(await Attendance.find({ employeeId: req.params.employeeId }));
});

module.exports = router;
