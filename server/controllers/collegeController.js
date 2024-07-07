const College = require("../models/college");

exports.getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json({
      status: "success",
      results: colleges.length,
      data: { colleges },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.createCollege = async (req, res) => {
  try {
    const newCollege = await College.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        college: newCollege,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getCollege = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({
        status: "fail",
        message: "No college found with this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        college,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!college) {
      return res.status(404).json({
        status: "fail",
        message: "No college found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        college,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id);
    if (!college) {
      return res.status(404).json({
        status: "fail",
        message: "No college found with that ID",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
