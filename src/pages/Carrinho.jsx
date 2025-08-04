// src/pages/Carrinho.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../context/CarrinhoContext";

function Carrinho() {
  const [erro, setErro] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [dadosCartao, setDadosCartao] = useState({
    nome: "",
    numero: "",
    validade: "",
    cvv: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    carrinho,
    removerProduto,
    limparCarrinho,
  } = useCarrinho();

  const [itens, setItens] = useState(null);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/carrinho", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setItens(res.data.itens);
        })
        .catch((err) => {
          console.error("Erro ao carregar carrinho:", err);
          if (err.response?.status === 401 || err.response?.status === 403) {
            alert("Sua sessão expirou. Faça login novamente.");
            localStorage.clear();
            navigate("/login-cliente");
          } else {
            setErro("Erro ao carregar carrinho.");
            setItens([]);
          }
        });
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setItens(carrinho);
    }
  }, [carrinho, token]);

  const remover = async (id) => {
    if (token) {
      try {
        await axios.delete(`http://localhost:5000/carrinho/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItens((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        console.error(err);
        setErro("Erro ao remover item.");
      }
    } else {
      removerProduto(id);
      setItens((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const limparTudo = async () => {
    if (token) {
      try {
        await axios.delete("http://localhost:5000/carrinho/limpar", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Após limpar, busca novamente o carrinho no backend para garantir sincronização
        const res = await axios.get("http://localhost:5000/carrinho", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItens(res.data.itens);
      } catch (err) {
        console.error("Erro ao limpar carrinho:", err);
      }
    }
    limparCarrinho();
    setItens([]);
  };

  const totalCalculado = itens
    ? itens.reduce((total, item) => total + item.preco * item.quantidade, 0)
    : 0;

  const finalizarCompra = async () => {
    if (!token) {
      alert("Você precisa estar logado para finalizar a compra.");
      navigate("/login-cliente");
      return;
    }

    if (!metodoPagamento) {
      alert("Selecione um método de pagamento.");
      return;
    }

    if (metodoPagamento === "cartao") {
      const { nome, numero, validade, cvv } = dadosCartao;
      if (!nome || !numero || !validade || !cvv) {
        alert("Preencha todos os campos do cartão.");
        return;
      }
      alert("Compra finalizada com cartão (simulada).");
      limparTudo();
      return;
    }

    if (metodoPagamento === "pix") {
      try {
        const response = await axios.post(
          "http://localhost:5000/pagamento/finalizar-compra",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Pagamento simulado:", response.data);
        limparTudo();
        navigate("/pagamento");
      } catch (err) {
        console.error(err);
        alert("Erro ao processar pagamento via Pix.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Meu Carrinho
      </h1>

      {erro && <p className="text-red-600 text-center mb-4">{erro}</p>}

      {itens === null ? (
        <p className="text-center text-gray-600">Carregando carrinho...</p>
      ) : itens.length === 0 ? (
        <p className="text-center text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
          {itens.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <h2 className="text-lg font-bold text-blue-800">{item.nome}</h2>
                {item.tipo && (
                  <p className="text-sm text-gray-600 capitalize">
                    Tipo: {item.tipo}
                  </p>
                )}
                <p className="text-sm text-gray-700">
                  Preço: R$ {item.preco.toFixed(2)}
                </p>
                <p className="text-sm font-semibold text-green-600">
                  Quantidade: {item.quantidade}
                </p>
              </div>

              <button
                onClick={() => remover(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remover
              </button>
            </div>
          ))}

          <div className="pt-4 border-t space-y-4">
            <h2 className="text-xl font-bold text-blue-700">
              Total: R$ {totalCalculado.toFixed(2)}
            </h2>

            <div>
              <h3 className="text-lg font-semibold text-blue-800">
                Método de Pagamento:
              </h3>

              <select
                value={metodoPagamento}
                onChange={(e) => setMetodoPagamento(e.target.value)}
                className="w-full border p-2 rounded"
                disabled={!token}
              >
                <option value="">Selecione</option>
                <option value="cartao">Cartão de Crédito</option>
                <option value="pix">Pix</option>
              </select>

              {metodoPagamento === "cartao" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    placeholder="Nome no cartão"
                    value={dadosCartao.nome}
                    onChange={(e) =>
                      setDadosCartao({ ...dadosCartao, nome: e.target.value })
                    }
                    className="border p-2 rounded"
                    disabled={!token}
                  />
                  <input
                    type="text"
                    placeholder="Número do cartão"
                    value={dadosCartao.numero}
                    onChange={(e) =>
                      setDadosCartao({ ...dadosCartao, numero: e.target.value })
                    }
                    className="border p-2 rounded"
                    disabled={!token}
                  />
                  <input
                    type="text"
                    placeholder="Validade (MM/AA)"
                    value={dadosCartao.validade}
                    onChange={(e) =>
                      setDadosCartao({ ...dadosCartao, validade: e.target.value })
                    }
                    className="border p-2 rounded"
                    disabled={!token}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={dadosCartao.cvv}
                    onChange={(e) =>
                      setDadosCartao({ ...dadosCartao, cvv: e.target.value })
                    }
                    className="border p-2 rounded"
                    disabled={!token}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={limparTudo}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Limpar Carrinho
            </button>

            <button
              onClick={finalizarCompra}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrinho;
