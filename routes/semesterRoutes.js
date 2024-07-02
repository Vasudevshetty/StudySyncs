const express = require('express');
const router = express.Router();
const semesterController = require('../controllers/semesterController');

router.get('/', semesterController.getSemesters);
router.get('/:id', semesterController.getSemesterById);
router.post('/', semesterController.addSemester);
router.delete('/:id', semesterController.deleteSemester);

module.exports = router;
