const Course = require("../models/Course");
const College = require("../models/College");

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("semesters");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("semesters");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addCourse = async (req, res) => {
  const course = new Course({ name: req.body.name });
  try {
    const newCourse = await course.save();
    const college = await College.findById(req.body.collegeId);
    college.courses.push(newCourse);
    await college.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
