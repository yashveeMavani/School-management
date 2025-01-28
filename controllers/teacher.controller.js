const Teacher = require("../models/teacher.model");


exports.createTeacher = async (req, res) => {
  const { name, email } = req.body;

  try {
    const teacher = await Teacher.create({ name, email });
    res.status(201).json(teacher);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      include: {
        model: Subject,
        through: { attributes: [] },
      },
    });
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
  
    try {
      const teacher = await Teacher.findByPk(id);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      teacher.name = name || teacher.name;
      teacher.email = email || teacher.email;
      await teacher.save();
  
      res.status(200).json(teacher);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findByPk(id);
    if (!teacher) return res.status(404).send("Teacher not found");

    await teacher.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};