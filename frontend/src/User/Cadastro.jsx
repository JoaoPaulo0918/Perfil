import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles.css';

function Cadastro() {

  //Para navegar com rotas estaticas
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    estado: '',
    bairro: '',
    rua: '',
    biografia: '',
    imagem: null,
    email: '',
    senha: ''
  });


  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "imagem") {
      setFormData({ ...formData, imagem: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    const resposta = await fetch("http://localhost:3001/usuario", {
      method: "POST",
      body: data
    });

    if (resposta.ok) {
      alert("Usuário cadastrado com sucesso!");

      //Se sucesso redireciona para rota de Login
      navigate('/Login');
    } else {
      alert("Erro ao cadastrar.");
    }
  }

  return (
    <section className='formulario'>
      <div className='interface'>
        <h2 className='titulo'>Cadastro</h2>

        <form onSubmit={handleSubmit}>
          <input type="file" name="imagem" onChange={handleChange} />
          <input type="text" name="nome" placeholder="Seu nome completo" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Seu email" required onChange={handleChange} />
          <input type="password" name="senha" placeholder="Sua senha" required onChange={handleChange} />
          <input type="number" name="idade" placeholder="Sua idade" required onChange={handleChange} />
          <div className="div-informacoes">
            <input type="text" name="estado" placeholder="Estado" required onChange={handleChange} />
            <input type="text" name="bairro" placeholder="Bairro" required onChange={handleChange} />
            <input type="text" name="rua" placeholder="Rua" required onChange={handleChange} />
          </div>
          <textarea name="biografia" placeholder="Biografia" onChange={handleChange}></textarea>
          <div className="btn-enviar">
            <input type="submit" value="Enviar" className="submit" />
          </div>
        </form>
      </div>
    </section>
  );
}

export default Cadastro;
