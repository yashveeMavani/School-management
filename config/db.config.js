const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("school_management", "root", "Yashvee@3009", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate()
  .then(() => console.log("Connected to MySQL"))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
