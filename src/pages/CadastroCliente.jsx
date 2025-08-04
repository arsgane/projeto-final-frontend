// src/pages/CadastroCliente.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CadastroCliente = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/clientes", {
        nome,
        email,
        telefone,
        senha,
      });

      alert(response.data.mensagem || "Cadastro realizado com sucesso!");
      navigate("/login-cliente");
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      alert(
        error.response?.data?.erro || "Erro ao cadastrar. Verifique os dados."
      );
    }
  };

  // 📞 Máscara de telefone dinâmica
  const formatarTelefone = (valor) => {
    valor = valor.replace(/\D/g, "").slice(0, 11);
    if (valor.length > 2) {
      valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    }
    if (valor.length > 10) {
      valor = `${valor.slice(0, 10)}-${valor.slice(10)}`;
    }
    return valor;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100">
      <form
        onSubmit={handleCadastro}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md animate-fade-in"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
          Criar Nova Conta
        </h2>

        <label className="block mb-2 font-medium">Nome completo</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <label className="block mb-2 font-medium">Telefone</label>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <label className="block mb-2 font-medium">Senha</label>
        <div className="relative mb-4">
          <input
            type={mostrarSenha ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border rounded pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-2 top-2 text-sm text-blue-500"
          >
            {mostrarSenha ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        <label className="block mb-2 font-medium">Confirmar Senha</label>
        <div className="relative mb-6">
          <input
            type={mostrarConfirmarSenha ? "text" : "password"}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="w-full p-2 border rounded pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
            className="absolute right-2 top-2 text-sm text-blue-500"
          >
            {mostrarConfirmarSenha ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
        >
          Cadastrar
        </button>

        <p className="mt-4 text-center text-sm">
          Já tem conta?{" "}
          <span
            onClick={() => navigate("/login-cliente")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Faça login
          </span>
        </p>
      </form>
    </div>
  );
};

export default CadastroCliente;
