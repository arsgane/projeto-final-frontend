// src/pages/Servicos.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Importa imagens de cada serviço
import agendamento from "../assets/agendamento1.jpg";
import banho from "../assets/banho1.png";
import consulta from "../assets/consulta1.jpg";
import tosa from "../assets/tosa1.jpg";
import vacina from "../assets/vacina1.jpg";
import hotel from "../assets/hotel1.jpg";

// ✅ Importa o contexto do carrinho
import { useCarrinho } from "../context/CarrinhoContext";

function Servicos() {
  const location = useLocation();
  const [servicoAberto, setServicoAberto] = useState(null);
  const [fadeVisible, setFadeVisible] = useState(true);
  const [selecoes, setSelecoes] = useState({}); // Guarda seleção de cada serviço

  const { adicionarProduto } = useCarrinho();

  // Lista dos serviços com nome, imagem, preços e descrição
  const servicos = [
    {
      nome: "Banho",
      img: banho,
      preco: [
        "🐶 Pequeno porte: R$ 40",
        "🐕 Médio porte: R$ 55",
        "🐩 Grande porte: R$ 70",
      ],
      descricao: "Banho com produtos dermatológicos",
    },
    {
      nome: "Tosa",
      img: tosa,
      preco: [
        "✂️ Pequeno porte: R$ 50",
        "✂️ Médio porte: R$ 65",
        "✂️ Grande porte: R$ 80",
      ],
      descricao: "Tosa higiênica e estilizada",
    },
    {
      nome: "Consulta",
      img: consulta,
      preco: ["🩺 Clínica geral: R$ 100", "🩺 Retorno: R$ 60"],
      descricao: "Avaliação veterinária completa",
    },
    {
      nome: "Vacinação",
      img: vacina,
      preco: [
        "💉 Antirrábica: R$ 70",
        "💉 V10: R$ 90",
        "💉 Gripe Canina: R$ 60",
      ],
      descricao: "Imunização com vacinas confiáveis",
    },
    {
      nome: "Agendamento",
      img: agendamento,
      preco: [
        "📅 Atendimento prioritário: R$ 30",
        "📅 Horário fixo: R$ 20",
      ],
      descricao: "Reserve um horário personalizado",
    },
    {
      nome: "Hotelzinho",
      img: hotel,
      preco: [
        "🏨 Pequeno porte: R$ 90/dia",
        "🏨 Médio porte: R$ 110/dia",
        "🏨 Grande porte: R$ 130/dia",
      ],
      descricao: "Hospedagem com cuidado e carinho",
    },
  ];

  // Abre automaticamente serviço ao navegar vindo da Home
  useEffect(() => {
    if (location.state?.servico) {
      const index = servicos.findIndex((s) => s.nome === location.state.servico);
      if (index !== -1) setServicoAberto(index);
    }
  }, [location.state]);

  // Alternar serviço aberto
  const handleToggleServico = (index) => {
    if (servicoAberto === index) {
      setFadeVisible(false);
      setTimeout(() => {
        setServicoAberto(null);
        setFadeVisible(true);
      }, 300);
    } else {
      setServicoAberto(index);
      setFadeVisible(true);
    }
  };

  // Atualiza seleção do combo de preço
  const handleSelecao = (indexServico, valor) => {
    setSelecoes({ ...selecoes, [indexServico]: valor });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 overflow-hidden">
      {/* Título da página */}
      <div className="text-center pt-12 animate-fade-in">
        <h1 className="text-4xl font-bold text-blue-800 mb-10">
          Nossos Serviços
        </h1>
      </div>

      {/* Grade de serviços */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 pb-20 justify-items-center animate-fade-in">
        {servicos.map((item, index) => {
          const selecao = selecoes[index] || item.preco[0];
          const precoFinal = parseFloat(
            selecao.replace(/[^\d,]/g, "").replace(",", ".")
          );

          return (
            <div key={index} className="flex flex-col items-center">
              {/* Imagem redonda com hover */}
              <div
                className="w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-blue-400 animate-pulse hover:scale-105 transition duration-300 cursor-pointer"
                title={item.descricao}
                onClick={() => handleToggleServico(index)}
              >
                <img
                  src={item.img}
                  alt={item.nome}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nome do serviço */}
              <p className="mt-3 text-center text-lg text-gray-800 font-semibold">
                {item.nome}
              </p>

              {/* Card aberto com preço, agendamento, combo e botão */}
              {servicoAberto === index && (
                <div
                  className={`mt-4 bg-white bg-opacity-90 backdrop-blur-md p-4 rounded-lg shadow-inner w-64 text-sm text-gray-700 transform transition-all duration-500
                  ${fadeVisible ? "opacity-100 scale-100 animate-fade-in" : "opacity-0 scale-95"}`}
                >
                  <h3 className="text-md font-bold mb-2">Escolha uma opção:</h3>

                  {/* Combobox de preços */}
                  <select
                    value={selecao}
                    onChange={(e) => handleSelecao(index, e.target.value)}
                    className="w-full mb-4 px-3 py-2 rounded border border-gray-300 focus:outline-none"
                  >
                    {item.preco.map((op, idx) => (
                      <option key={idx} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>

                  {/* Botão Agendar agora - corrigido */}
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    onClick={() => window.location.href = "/login-cliente"}
                  >
                    Agendar agora
                  </button>

                  {/* Botão Adicionar ao Carrinho com seleção e tipo */}
                  <button
                    onClick={() =>
                      adicionarProduto({
                        id: Date.now() + Math.random(),
                        nome: `${item.nome} (${selecao.split(":")[0]})`,
                        preco: precoFinal,
                        imagem: item.img,
                        tipo: "servico" // <-- ESSENCIAL para backend
                      })
                    }
                    className="mt-2 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Servicos;
