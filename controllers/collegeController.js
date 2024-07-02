const College = require("../models/College");

exports.getColleges = async (req, res) => {
  try {
    const colleges = await College.find().populate("courses");
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id).populate("courses");
    if (!college) return res.status(404).json({ message: "College not found" });
    res.json(college);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addCollege = async (req, res) => {
  const college = new College({ name: req.body.name });
  try {
    const newCollege = await college.save();
    res.status(201).json(newCollege);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCollege = async (req, res) => {
  try {
    await College.findByIdAndDelete(req.params.id);
    res.json({ message: "College deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
