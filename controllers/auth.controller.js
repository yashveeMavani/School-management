const jwt = require("jsonwebtoken");
const  User = require('../models/user.model.js');

const SECRET_KEY = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Login attempt:", username);
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    const validPassword = password === user.password;
    if (!validPassword) {
      console.log("Invalid password");
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send(err.message);
  }
};