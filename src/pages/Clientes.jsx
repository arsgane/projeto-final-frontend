// src/pages/Clientes.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const navigate = useNavigate();

  // 🔐 Proteção: Só admin acessa essa rota
  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    const token = localStorage.getItem("token");

    if (!token || tipo !== "admin") {
      alert("Acesso restrito ao administrador.");
      navigate("/");
    }
  }, []);

  // 🧠 Formata telefone: (99) 99999-9999
  const formatarTelefone = (valor) => {
    return valor
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  };

  // 🔄 Carrega clientes ao entrar na página
  useEffect(() => {
    buscarClientes();
  }, []);

  const buscarClientes = async () => {
    try {
      const token = localStorage.getItem("token");
      const resposta = await axios.get("http://localhost:5000/clientes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClientes(resposta.data);
    } catch (erro) {
      alert("Erro ao buscar clientes");
    }
  };

  const salvarCliente = async (e) => {
    e.preventDefault();

    const novoCliente = { nome, email, telefone, senha };
    const token = localStorage.getItem("token");

    try {
      if (editandoId) {
        await axios.put(`http://localhost:5000/clientes/${editandoId}`, novoCliente, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Cliente atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:5000/clientes", novoCliente, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Cliente cadastrado com sucesso!");
      }

      // Limpa o formulário
      setNome("");
      setEmail("");
      setTelefone("");
      setSenha("");
      setEditandoId(null);

      buscarClientes();
    } catch (erro) {
      alert("Erro ao salvar cliente");
    }
  };

  const editarCliente = (cliente) => {
    setNome(cliente.nome);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setSenha("");
    setEditandoId(cliente.id);
  };

  const deletarCliente = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/clientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Cliente excluído com sucesso!");
      buscarClientes();
    } catch (erro) {
      alert("Erro ao excluir cliente");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">
          Cadastro de Clientes
        </h1>

        {/* Formulário */}
        <form onSubmit={salvarCliente} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
            required
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Senha (máx. 8 dígitos)"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            maxLength={8}
            required={!editandoId}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {editandoId ? "Atualizar Cliente" : "Cadastrar Cliente"}
          </button>
        </form>

        {/* Lista de clientes */}
        <h2 className="text-xl font-semibold mb-2">Clientes cadastrados:</h2>
        <ul className="divide-y">
          {clientes.map((cliente) => (
            <li key={cliente.id} className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">{cliente.nome}</p>
                <p className="text-sm text-gray-600">
                  {cliente.email} | {cliente.telefone}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editarCliente(cliente)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => deletarCliente(cliente.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Clientes;
