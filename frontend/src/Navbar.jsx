import React from "react";
import { Link, useNavigate } from "react-router-dom";

import './Navbar.css';
import imagens from './assets/img';


function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout realizado com sucesso!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="div-perfil">
        {token ? (
          <Link to="/perfil">
            <img src={imagens.logoPerfil} alt="" className="img-logo"/>
          </Link>
        ) : (
          <Link to="/" className="link-logo">SistemaUsuario</Link>
        )}
      </div>


      <div className="div-main-navbar">
        <ul className="ul-navbar">
          {token && (
            <li className="links">
              <Link to="/perfil" className="link-perfil">Perfil</Link>
            </li>
          )}
          {!token && (
            <>
              <li>
                <Link to="/login" className="links-acessos">Login</Link>
              </li>
              <li >
                <Link to="/cadastro" className="links-acessos">Cadastro</Link>
              </li>
            </>
          )}
        </ul>

        {token && (
          <button className="btn btn-danger" onClick={handleLogout}>
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
