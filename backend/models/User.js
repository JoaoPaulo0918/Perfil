const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define("Usuario", {
  nome: { type: DataTypes.STRING, allowNull: false },
  idade: { type: DataTypes.INTEGER },
  estado: { type: DataTypes.STRING },
  bairro: { type: DataTypes.STRING },
  rua: { type: DataTypes.STRING },
  biografia: { type: DataTypes.TEXT },
  imagem: { type: DataTypes.STRING },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Usuario;
