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
    const semester = await Semester.findById(req.params.id).populate({
      path: "college course",
      select: "slug",
    });
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

// Controller to get subject details by subject code, college slug, and course slug
exports.getSubjectDetails = async (req, res) => {
  const { collegeSlug, courseSlug, subjectCode } = req.params;
  const { query } = req.query;

  try {
    // Find the semesters that match the college slug and course slug
    const semesters = await Semester.find().populate({
      path: "college course",
      select: "slug",
    });

    const filteredSemesters = semesters.filter(
      (semester) =>
        semester.college.slug === collegeSlug &&
        semester.course.slug === courseSlug
    );

    if (!filteredSemesters.length) {
      return res.status(404).json({ message: "No semesters found" });
    }

    if (query) {
      // If query is present, find subjects matching the query within the filtered semesters
      const matchingSubjects = [];
      filteredSemesters.forEach((semester) => {
        const subjects = semester.subjects.filter((subject) =>
          subject.code.includes(query.toUpperCase())
        );
        matchingSubjects.push(...subjects);
      });

      if (!matchingSubjects.length) {
        return res.status(404).json({ message: "No matching subjects found" });
      }

      return res.status(200).json({
        status: "success",
        results: matchingSubjects.length,
        data: matchingSubjects,
      });
    } else if (subjectCode) {
      // If subjectCode is present, find the subject by subject code within the filtered semesters
      const subject = filteredSemesters[0].subjects.find(
        (sub) => sub.code === subjectCode
      );

      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }

      return res.status(200).json({
        status: "success",
        data: subject,
      });
    }

    return res.status(400).json({ message: "Invalid request parameters" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
