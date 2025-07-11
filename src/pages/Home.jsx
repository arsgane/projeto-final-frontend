// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para redirecionamento

// Imagens e gifs
import dogWelcomeGif from '../assets/home1.gif';
import sobrePetGif from '../assets/cat02.gif';
import dogGif from '../assets/center1.gif'; // gif animado dentro dos círculos

function Home() {
  const navigate = useNavigate(); // Hook do React Router para navegação

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">

      {/* Seção Hero (Boas-vindas com botão que redireciona para login) */}
      <section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-16">
        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            src={dogWelcomeGif}
            alt="Dog animado"
            className="w-96 md:w-[600px]"
          />
        </div>

        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            Bem-vindo ao Petshop
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Cuidando do seu pet com amor, carinho e profissionalismo. Agende agora!
          </p>
          {/* Botão que redireciona para /login */}
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded shadow-md transition"
          >
            Login
          </button>
        </div>
      </section>

      {/* Seção Nossos Serviços */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl font-bold text-blue-600 
          hover:text-blue-800 hover:underline hover:scale-105 
          transition-all duration-300 cursor-pointer text-center mb-12">
          Nossos Serviços
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {[ // Lista de serviços com ícone, texto e gif
            { title: "Banho", icon: "🛁", text: "Higiene e cuidado com produtos de qualidade, deixando seu pet limpo e perfumado." },
            { title: "Tosa", icon: "✂️", text: "Tosa higiênica, na tesoura ou na máquina, sempre respeitando o estilo do seu pet." },
            { title: "Consulta", icon: "🩺", text: "Avaliação veterinária completa para garantir a saúde e bem-estar do seu pet." },
            { title: "Vacina", icon: "💉", text: "Proteja seu pet com vacinas atualizadas e aplicadas por profissionais capacitados." },
            { title: "Agendamento", icon: "🗓️", text: "Marque serviços com rapidez e praticidade para seu pet no melhor horário." },
            { title: "Hotel", icon: "🏨", text: "Hospedagem confortável e segura para o seu pet com atenção 24 horas." },
          ].map((card, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-full shadow-md w-[180px] h-[180px] mx-auto bg-blue-100 
              transform transition-transform duration-300 hover:scale-105 flex flex-col justify-center items-center text-center p-4"
            >
              {/* Título centralizado */}
              <h3 className="text-md font-semibold flex items-center justify-center gap-1 text-center leading-tight">
                {card.title} <span>{card.icon}</span>
              </h3>

              {/* Texto com tamanho ajustado e centralizado */}
              <p className="text-xs mt-1 leading-tight">{card.text}</p>

              {/* Gif centralizado no fim do círculo */}
              <img
                src={dogGif}
                alt="pet gif"
                className="w-[32px] h-[32px] mt-1"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Seção Sobre Nós */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Sobre Nós</h2>
            <p className="text-gray-700 mb-4">
              Somos um petshop comprometido com o bem-estar e a saúde dos animais. Nossa missão é oferecer serviços de qualidade, atendimento humanizado e um ambiente acolhedor para pets e tutores.
            </p>
            <p className="text-gray-600">
              Nossa equipe é formada por profissionais experientes e apaixonados por animais. Desde banhos e tosa até consultas e agendamentos, estamos aqui para cuidar com amor.
            </p>
          </div>

          <div className="flex justify-end pr-8 md:pr-0">
            <img
              src={sobrePetGif}
              alt="Gato animado andando"
              className="w-32 md:w-40 animate-walkSideways"
            />
          </div>
        </div>
      </section>

      {/* Seção Contato */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Fale Conosco</h2>
          <p className="text-gray-600 mb-6">
            Nossa equipe é formada por profissionais experientes e apaixonados por animais...
          </p>

          <div className="inline-block text-left mx-auto space-y-2">
            <a
              href="mailto:petsystem123@gmail.com"
              className="flex items-center gap-2 hover:text-blue-600 transition"
              target="_blank" rel="noopener noreferrer"
            >
              📧 petsystem123@gmail.com
            </a>
            <a
              href="https://www.instagram.com/petsystem123"
              className="flex items-center gap-2 hover:text-pink-600 transition"
              target="_blank" rel="noopener noreferrer"
            >
              📷 @petsystem123
            </a>
            <a
              href="https://wa.me/5581999999999"
              className="flex items-center gap-2 hover:text-green-600 transition"
              target="_blank" rel="noopener noreferrer"
            >
              📱 (81) 99999-9999
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
