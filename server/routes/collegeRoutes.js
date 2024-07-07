const express = require("express");
const CollegeController = require("../controllers/collegeController");

const router = express.Router();

router
  .route("/")
  .get(CollegeController.getAllColleges)
  .post(CollegeController.createCollege);

router
  .route("/:id")
  .get(CollegeController.getCollege)
  .patch(CollegeController.updateCollege)
  .delete(CollegeController.deleteCollege);

module.exports = router;
