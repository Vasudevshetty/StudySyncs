const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

router.get("/", subjectController.getSubjects);
router.get("/:id", subjectController.getSubjectById);
router.post("/", subjectController.addSubject);
router.delete("/:id", subjectController.deleteSubject);

module.exports = router;
