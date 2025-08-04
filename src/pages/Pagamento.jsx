// src/pages/Pagamento.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Pagamento() {
  const [qrCode, setQrCode] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  // 📤 Faz a simulação do pagamento e exibe o QR Code
  const realizarPagamento = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/pagamento/finalizar-compra",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensagem(response.data.mensagem);
      setQrCode(`data:image/png;base64,${response.data.qr_code_base64}`);
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("Erro ao simular pagamento.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Pagamento</h1>

      {/* Botão que aciona o backend para gerar o QR code */}
      <button
        onClick={realizarPagamento}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition mb-4"
      >
        Simular Pagamento
      </button>

      {/* Exibe mensagem de sucesso */}
      {mensagem && (
        <p className="text-green-700 font-semibold mb-4">{mensagem}</p>
      )}

      {/* Exibe QR code */}
      {qrCode && (
        <img
          src={qrCode}
          alt="QR Code para pagamento"
          className="w-64 h-64 border rounded shadow-lg"
        />
      )}

      {/* Exibe mensagem de erro */}
      {erro && <p className="text-red-600 mt-4">{erro}</p>}

      {/* Botão para voltar à dashboard após pagamento */}
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
