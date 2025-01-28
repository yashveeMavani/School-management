const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("../config/db.config");

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js')
  .forEach(file => {
    const modelClass = require(path.join(__dirname, file));
    let model;
    if (typeof modelClass === 'function') {
      if (/^\s*class\s+/.test(modelClass.toString())) {
        model = new modelClass(sequelize, Sequelize.DataTypes);
      } else {
        model = modelClass(sequelize, Sequelize.DataTypes);
      }
    } else if (typeof modelClass === 'object' && modelClass !== null && typeof modelClass.init === 'function') {
      modelClass.init(sequelize, Sequelize.DataTypes);
      model = modelClass;
    }
    if (model) {
      db[model.name] = model;
      console.log(`Loaded model: ${model.name}`);
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
if (db.Teacher && db.Class) {
  db.Teacher.belongsToMany(db.Class, { through: 'TeacherClasses' });
  db.Class.belongsToMany(db.Teacher, { through: 'TeacherClasses' });
}

if (db.Teacher && db.Subject) {
  db.Teacher.belongsToMany(db.Subject, { through: 'TeacherSubjects' });
  db.Subject.belongsToMany(db.Teacher, { through: 'TeacherSubjects' });
}

if (db.Class && db.Subject) {
  db.Class.belongsToMany(db.Subject, { through: 'ClassSubjects' });
  db.Subject.belongsToMany(db.Class, { through: 'ClassSubjects' });
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;