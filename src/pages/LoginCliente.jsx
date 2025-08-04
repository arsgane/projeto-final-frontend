// src/pages/LoginCliente.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginCliente() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const clienteRes = await axios.post("http://localhost:5000/clientes/login", {
        email,
        senha,
      });

      const { access_token, nome, tipo } = clienteRes.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("nomeUsuario", nome);
      localStorage.setItem("tipoUsuario", tipo);

      setMensagem("Login realizado com sucesso!");
      setTimeout(() => navigate("/cliente-dashboard"), 1000);
    } catch (clienteError) {
      try {
        const adminRes = await axios.post("http://localhost:5000/auth/login", {
          email,
          senha,
        });

        const { access_token, nome, tipo } = adminRes.data;

        localStorage.setItem("token", access_token);
        localStorage.setItem("nomeUsuario", nome);
        localStorage.setItem("tipoUsuario", tipo);

        setMensagem("Login realizado com sucesso!");
        setTimeout(() => navigate("/admin"), 1000);
      } catch (adminError) {
        setMensagem("Email ou senha incorretos.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-white to-blue-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md animate-fade-in">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        {mensagem && (
          <p className="mt-4 text-center text-red-600 font-semibold">
            {mensagem}
          </p>
        )}

        {/* 🔹 Link para cadastro */}
        <p className="mt-6 text-center text-sm text-gray-700">
          Não tem conta?{" "}
          <span
            onClick={() => navigate("/cadastro-cliente")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginCliente;
