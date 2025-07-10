const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('perfil', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
