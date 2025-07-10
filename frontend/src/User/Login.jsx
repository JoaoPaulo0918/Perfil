import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
    useEffect(() => {
        document.activeElement?.blur();
    }, []);

    const [form, setForm] = useState({ email: '', senha: '' });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/usuario/login', form);

            localStorage.setItem('token', res.data.token);
            alert('Login com sucesso!');
            navigate('/Perfil');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.erro) {
                alert('Erro no login: ' + error.response.data.erro);
            } else {
                alert('Erro no login.');
            }
        }
    };

    const handleClick = () => {
        navigate('/Cadastro');
    }

    return (
        <div className="container-fluid mt-5">
            <form onSubmit={handleSubmit} className="col-md-4 mx-auto">
                <h1 className="mb-4">Login</h1>
                <div className="div-input mb-3">
                    <input type="email" name="email"
                        className="input"
                        placeholder="Seu email"
                        onChange={handleChange}
                        required />
                </div>
                <div className="div-input mb-3">
                    <input type="password" name="senha"
                        className="input"
                        placeholder="Sua senha"
                        onChange={handleChange}
                        required />
                </div>
                <div className="div-buttons">
                    <button type="submit" className="button-acessar">Entrar</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleClick}>Criar conta</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
