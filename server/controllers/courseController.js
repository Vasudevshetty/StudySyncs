const Course = require("../models/course");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ status: "success", data: course });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate({
      path: "semesters college",
      select: "number slug bgImgUrl",
    });
    res.status(200).json({ status: "success", data: courses });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Get a course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: "semesters",
      select: "number",
    });
    if (!course) {
      return res
        .status(404)
        .json({ status: "fail", message: "Course not found" });
    }
    res.status(200).json({ status: "success", data: course });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res
        .status(404)
        .json({ status: "fail", message: "Course not found" });
    }
    res.status(200).json({ status: "success", data: course });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ status: "fail", message: "Course not found" });
    }
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
