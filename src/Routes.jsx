import { Routes, Route } from 'react-router-dom';


// Rotas
import App from './App';
import Cadastro from './User/Cadastro';
import Login from './User/Login';
import Perfil from './User/Perfil';
import Navbar from '../src/Navbar';

function RoutesApp() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Perfil" element={<Perfil />} />
      </Routes>
    </>
  );
}

export default RoutesApp;
