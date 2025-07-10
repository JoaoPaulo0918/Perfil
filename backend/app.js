const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const usuarioRoutes = require("./routes/usuario");
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/usuario", usuarioRoutes);
app.use('/uploads', express.static('uploads'));

// Sincroniza com o banco de dados
sequelize.sync().then(() => {
  console.log("Banco conectado.");
  app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
});
