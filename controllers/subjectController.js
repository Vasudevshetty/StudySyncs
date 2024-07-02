const Subject = require("../models/SubjectModel");
const Semester = require("../models/SemesterModel");

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate("modules");
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate("modules");
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addSubject = async (req, res) => {
  const subject = new Subject({ name: req.body.name });
  try {
    const newSubject = await subject.save();
    const semester = await Semester.findById(req.body.semesterId);
    semester.subjects.push(newSubject);
    await semester.save();
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
