import React from "react";
import { Link, useNavigate } from "react-router-dom";

import imagens from "./assets/img";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout realizado com sucesso!");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg ">
      {token ? (
        <Link className="navbar-brand text-light" to="/perfil">
          <img src={imagens.logoPerfil} alt="" className="logo"/>
        </Link>
      ) : (
        <Link className="navbar-brand text-light" to="/">SistemaUsuario</Link>
      )}

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {token && (
            <li className="nav-item">
              <Link className="nav-link text-light" to="/perfil">Perfil</Link>
            </li>
          )}
          {!token && (
            <>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/cadastro">Cadastro</Link>
              </li>
            </>
          )}
        </ul>

        {token && (
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
