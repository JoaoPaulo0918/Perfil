import React, { useEffect, useState } from "react";
import './Perfil.css'
import imagens from "../assets/img";

function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [formEdicao, setFormEdicao] = useState({});
    const [imagemPreview, setImagemPreview] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        fetch("http://localhost:3001/usuario/perfil", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                setUsuario(data);
                setFormEdicao(data);
            })
            .catch(err => console.error(err));
    }, [token]);

    const abrirModal = () => setMostrarModal(true);
    const fecharModal = () => {
        setMostrarModal(false);
        setImagemPreview(null);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imagem" && files.length > 0) {
            setFormEdicao({ ...formEdicao, imagem: files[0] });
            setImagemPreview(URL.createObjectURL(files[0]));
        } else {
            setFormEdicao({ ...formEdicao, [name]: value });
        }
    };

    const handleSalvar = async () => {
        try {
            const formData = new FormData();
            for (const key in formEdicao) {
                formData.append(key, formEdicao[key]);
            }

            const resposta = await fetch("http://localhost:3001/usuario/atualizar", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (resposta.ok) {
                const usuarioAtualizado = await resposta.json();
                setUsuario(usuarioAtualizado);
                fecharModal();
                alert("Perfil atualizado com sucesso!");
            } else {
                alert("Erro ao atualizar dados.");
            }
        } catch (erro) {
            console.error("Erro:", erro);
            alert("Erro ao atualizar.");
        }
    };

    if (!usuario) return <p>Carregando...</p>;

    return (
        <div className="container">
            <h2>Perfil do Usuário</h2>
            <div className="div-topo">
                <button className="btn btn-warning mt-2" onClick={abrirModal} >
                    <img src={imagens.logoEditar} alt="" />
                </button>
                {usuario.imagem && (
                    <img className="imagem-perfil"
                        src={`http://localhost:3001/uploads/${usuario.imagem}`}
                        alt="Usuário"
                        width={160}
                    />
                )}
            </div>

            <div className="div-infor">
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>Idade:</strong> {usuario.idade}</p>
            </div>
            <div className="div-infor">
                <p><strong>Estado:</strong> {usuario.estado}</p>
                <p><strong>Bairro:</strong> {usuario.bairro}</p>
                <p><strong>Rua:</strong> {usuario.rua}</p>
            </div>

            <div className="div-infor">
                <p><strong>Biografia:</strong> {usuario.biografia}</p>
            </div>


            {mostrarModal && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Perfil</h5>
                                <button type="button" className="btn-close" onClick={fecharModal}></button>
                            </div>
                            <div className="modal-body">
                                <input className="form-control mb-2" type="text" name="nome" value={formEdicao.nome} onChange={handleChange} />
                                <input className="form-control mb-2" type="number" name="idade" value={formEdicao.idade} onChange={handleChange} />
                                <input className="form-control mb-2" type="text" name="estado" value={formEdicao.estado} onChange={handleChange} />
                                <input className="form-control mb-2" type="text" name="bairro" value={formEdicao.bairro} onChange={handleChange} />
                                <input className="form-control mb-2" type="text" name="rua" value={formEdicao.rua} onChange={handleChange} />
                                <textarea className="form-control mb-2" name="biografia" value={formEdicao.biografia} onChange={handleChange}></textarea>

                                <label>Nova Imagem:</label>
                                <input className="form-control mb-2" type="file" name="imagem" onChange={handleChange} />
                                {imagemPreview && <img src={imagemPreview} alt="Preview" width={150} />}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={fecharModal}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleSalvar}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Perfil;
