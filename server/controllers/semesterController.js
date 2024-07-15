const Semester = require("../models/semester");

// Get all semesters
exports.getAllSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find().populate({
      path: "college course",
      select: "slug",
    });
    res.status(200).json({
      status: "success",
      results: semesters.length,
      data: {
        semesters,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get a single semester by ID
exports.getSemester = async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id);
    if (!semester) {
      return res.status(404).json({
        status: "fail",
        message: "Semester not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        semester,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Create a new semester
exports.createSemester = async (req, res) => {
  try {
    const newSemester = await Semester.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        semester: newSemester,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Update a semester by ID
exports.updateSemester = async (req, res) => {
  try {
    const updatedSemester = await Semester.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedSemester) {
      return res.status(404).json({
        status: "fail",
        message: "Semester not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        semester: updatedSemester,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Delete a semester by ID
exports.deleteSemester = async (req, res) => {
  try {
    const deletedSemester = await Semester.findByIdAndDelete(req.params.id);
    if (!deletedSemester) {
      return res.status(404).json({
        status: "fail",
        message: "Semester not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
