const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', courseController.addCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
