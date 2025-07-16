const express = require('express');
const router = express.Router();
const Usuario = require('../models/User'); // Sequelize
const upload = require('../middleware/upload'); // Upload via multer
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const autenticarToken = require('../middleware/auth');

// Rota de Cadastro
router.post("/", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, idade, estado, bairro, rua, biografia, email, senha } = req.body;
    const imagem = req.file ? req.file.filename : null;

    // Criptografia da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      idade,
      estado,
      bairro,
      rua,
      biografia,
      imagem,
      email,
      senha: senhaHash
    });

    res.status(201).json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao salvar usuário." });
  }
});


// Login com JWT
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ erro: "Email não encontrado." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta." });
    }

    // Gera o token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ mensagem: "Login bem-sucedido", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro no login." });
  }
});

//Rota protegida
router.get("/protegido", autenticarToken, (req, res) => {
  res.json({ mensagem: "Você acessou uma rota protegida!", usuario: req.usuario });
});


// Rota para retornar os dados do usuário autenticado
router.get("/perfil", autenticarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: { exclude: ["senha"] } // remove o campo senha
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar dados do usuário" });
  }
});

//Rota para editar 
router.put("/atualizar", autenticarToken, upload.single("imagem"), async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

    const dadosAtualizados = req.body;

    if (req.file) {
      dadosAtualizados.imagem = req.file.filename;
    }

    await usuario.update(dadosAtualizados);

    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao atualizar usuário." });
  }
});


// Rota para listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar usuários." });
  }
});

module.exports = router;
