const express = require("express");
const {
  getAllSemesters,
  getSemester,
  createSemester,
  updateSemester,
  deleteSemester,
} = require("../controllers/semesterController");

const router = express.Router();

router.route("/").get(getAllSemesters).post(createSemester);

router
  .route("/:id")
  .get(getSemester)
  .patch(updateSemester)
  .delete(deleteSemester);

module.exports = router;
