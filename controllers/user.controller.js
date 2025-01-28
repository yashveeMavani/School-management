const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


// Admin login system with authentication and role-based access control (RBAC)
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.createUser = async (req, res) => {
  const { username, password, role, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password,
      role,
      email,
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};
exports.getUserProfile = (req, res) => {
  res.send("User Profile");
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { username, role }, { new: true });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).send("User not found");
    res.send("User deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Notify parents about attendance and grades via a simulated email system (use Nodemailer)
exports.notifyParent = async (req, res) => {
  const { email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Email sent");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

