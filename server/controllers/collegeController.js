const College = require("../models/college");

// Create a new college
exports.createCollege = async (req, res) => {
  try {
    const college = await College.create(req.body);
    res.status(201).json({ status: "success", data: college });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Get all colleges
exports.getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find().populate({
      path: "courses",
      select: "name slug bgImgUrl",
    });
    res.status(200).json({ status: "success", data: colleges });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Get a college by ID
exports.getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id).populate({
      path: "courses",
      name: "name",
    });
    if (!college) {
      return res
        .status(404)
        .json({ status: "fail", message: "College not found" });
    }
    res.status(200).json({ status: "success", data: college });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Update a college
exports.updateCollege = async (req, res) => {
  try {
    console.log(req.params.id);
    const college = await College.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!college) {
      return res
        .status(404)
        .json({ status: "fail", message: "College not found" });
    }
    res.status(200).json({ status: "success", data: college });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Delete a college
exports.deleteCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id);
    if (!college) {
      return res
        .status(404)
        .json({ status: "fail", message: "College not found" });
    }
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
