const Module = require("../models/ModuleModel");
const Subject = require("../models/SubjectModel");

exports.getModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addModule = async (req, res) => {
  const module = new Module({
    name: req.body.name,
    documents: req.body.documents,
  });
  try {
    const newModule = await module.save();
    const subject = await Subject.findById(req.body.subjectId);
    subject.modules.push(newModule);
    await subject.save();
    res.status(201).json(newModule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteModule = async (req, res) => {
  try {
    await Module.findByIdAndDelete(req.params.id);
    res.json({ message: "Module deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
