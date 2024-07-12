const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router
  .route("/")
  .post(courseController.createCourse)
  .get(courseController.getAllCourses);

router
  .route("/:id")
  .get(courseController.getCourseById)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = router;
