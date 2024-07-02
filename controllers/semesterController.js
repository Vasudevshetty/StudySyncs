const Semester = require("../models/SemesterModel");
const Course = require("../models/CourseModel");

exports.getSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find().populate("subjects");
    res.json(semesters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSemesterById = async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id).populate(
      "subjects"
    );
    if (!semester)
      return res.status(404).json({ message: "Semester not found" });
    res.json(semester);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addSemester = async (req, res) => {
  const semester = new Semester({ name: req.body.name });
  try {
    const newSemester = await semester.save();
    const course = await Course.findById(req.body.courseId);
    course.semesters.push(newSemester);
    await course.save();
    res.status(201).json(newSemester);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSemester = async (req, res) => {
  try {
    await Semester.findByIdAndDelete(req.params.id);
    res.json({ message: "Semester deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
