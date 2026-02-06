
const router = require("express").Router();
const Employee = require("../models/Employee");

router.post("/", async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json(emp);
  } catch {
    res.status(400).json({ message: "Error creating employee" });
  }
});

router.get("/", async (req, res) => {
  res.json(await Employee.find());
});

router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
