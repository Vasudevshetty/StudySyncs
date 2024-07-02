const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');

router.get('/', collegeController.getColleges);
router.get('/:id', collegeController.getCollegeById);
router.post('/', collegeController.addCollege);
router.delete('/:id', collegeController.deleteCollege);

module.exports = router;
