// src/pages/Pagamento.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Pagamento() {
  const [qrCode, setQrCode] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const limparCarrinhoBackend = async (token) => {
    try {
      await axios.delete("http://localhost:5000/carrinho/limpar", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("🧹 Carrinho limpo após pagamento.");
    } catch (err) {
      console.error("⚠️ Erro ao limpar carrinho:", err);
    }
  };

  // 📤 Função que simula o pagamento e exibe o QR code
  const realizarPagamento = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErro("Você precisa estar logado para simular o pagamento.");
      return;
    }

    try {
      setCarregando(true);
      console.log("🔐 Token enviado:", token);

      const response = await axios.post(
        "http://localhost:5000/pagamento/finalizar-compra",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("💬 Resposta completa:", response.data);

      setMensagem(response.data.mensagem);
      setQrCode(`data:image/png;base64,${response.data.qr_code_base64}`);
      setErro("");

      // ✅ Limpa carrinho depois do pagamento bem-sucedido
      await limparCarrinhoBackend(token);
    } catch (err) {
      console.error("❌ Erro ao simular pagamento:", err);

      if (err.response) {
        console.log("🔴 Status:", err.response.status);
        console.log("🔴 Dados recebidos do backend:", err.response.data);
        setErro(err.response.data?.mensagem || "Erro ao simular pagamento.");
      } else {
        setErro("Erro ao simular pagamento.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Pagamento</h1>

      <button
        onClick={realizarPagamento}
        className={`${
          carregando ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        } text-white px-6 py-2 rounded transition mb-4`}
        disabled={carregando}
      >
        {carregando ? "Processando..." : "Simular Pagamento"}
      </button>

      {mensagem && (
        <p className="text-green-700 font-semibold mb-4">{mensagem}</p>
      )}

      {qrCode && (
        <img
          src={qrCode}
          alt="QR Code para pagamento"
          className="w-64 h-64 border rounded shadow-lg"
        />
      )}

      {erro && <p className="text-red-600 mt-4">{erro}</p>}

      <button
        onClick={() => navigate("/cliente-dashboard")}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Voltar para o Painel
      </button>
    </div>
  );
}

export default Pagamento;
