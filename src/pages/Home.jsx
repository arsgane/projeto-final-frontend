// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dogWelcomeGif from '../assets/home1.gif';
import sobrePetGif from '../assets/cat02.gif';

function Home() {
  const navigate = useNavigate();
  const [servicoAtivo, setServicoAtivo] = useState(null);

  // Lista dos serviços oferecidos com descrição
  const servicos = [
    { title: "Banho", text: "Higiene e cuidado com produtos de qualidade, deixando seu pet limpo e perfumado." },
    { title: "Tosa", text: "Tosa higiênica, na tesoura ou na máquina, sempre respeitando o estilo do seu pet." },
    { title: "Consulta", text: "Avaliação veterinária completa para garantir a saúde e bem-estar do seu pet." },
    { title: "Vacina", text: "Proteja seu pet com vacinas atualizadas e aplicadas por profissionais capacitados." },
    { title: "Agendamento", text: "Marque serviços com rapidez e praticidade para seu pet no melhor horário." },
    { title: "Hotel", text: "Hospedagem confortável e segura para o seu pet com atenção 24 horas." },
  ];

  return (
    // Gradiente aplicado na página inteira via camada de fundo
    <div className="min-h-screen relative overflow-hidden">

      {/* Fundo gradiente ocupando toda a página */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100 z-0"></div>

      {/* Conteúdo sobreposto ao fundo com z-index */}
      <div className="relative z-10 text-gray-800">

        {/* Seção inicial (Hero) */}
        <section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-16">
          <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
            <img src={dogWelcomeGif} alt="Dog animado" className="w-96 md:w-[600px]" />
          </div>
          <div className="md:w-1/2 text-center md:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Bem-vindo ao Petshop</h1>
            <p className="text-lg text-gray-700 mb-6">
              Cuidando do seu pet com amor, carinho e profissionalismo. Agende agora!
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded shadow-md transition-transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </section>

        {/* Seção de Serviços com detalhes */}
        <section className="py-20 px-6 text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-blue-600 mb-12">Nossos Serviços</h2>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Lista dos serviços */}
            <div className="space-y-4">
              {servicos.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setServicoAtivo(item.title)}
                  onDoubleClick={() => navigate(`/servicos?abrir=${encodeURIComponent(item.title)}`)}
                  className={`block w-full text-left px-4 py-2 rounded shadow-sm transition duration-300 
                    ${servicoAtivo === item.title
                      ? 'bg-blue-200 text-blue-800 font-bold'
                      : 'bg-white hover:bg-blue-100'}`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Detalhes do serviço selecionado */}
            <div className="bg-white shadow-md rounded p-6 min-h-[160px] transition duration-300">
              {servicoAtivo ? (
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">
                    {servicoAtivo}
                  </h3>
                  <p className="text-gray-700">
                    {servicos.find(item => item.title === servicoAtivo)?.text}
                  </p>
                  <button
                    onClick={() => navigate(`/servicos?abrir=${encodeURIComponent(servicoAtivo)}`)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded transition"
                  >
                    Ver Preços
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">Selecione um serviço para ver os detalhes.</p>
              )}
            </div>
          </div>
        </section>

        {/* Seção Sobre Nós */}
        <section className="py-20 px-6 animate-fade-in">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-600 mb-4">Sobre Nós</h2>
              <p className="text-gray-700 mb-4">
                Somos um petshop comprometido com o bem-estar e a saúde dos animais. Nossa missão é oferecer
                serviços de qualidade, atendimento humanizado e um ambiente acolhedor para pets e tutores.
              </p>
              <p className="text-gray-600">
                Nossa equipe é formada por profissionais experientes e apaixonados por animais.
                Desde banhos e tosa até consultas e agendamentos, estamos aqui para cuidar com amor.
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

        {/* Seção Fale Conosco */}
        <section className="py-16 px-6 animate-fade-in">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">Fale Conosco</h2>
            <p className="text-gray-600 mb-6">
              Nossa equipe está sempre pronta para te atender com carinho e agilidade.
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
                📞 (81) 99999-9999
              </a>
            </div>
          </div>
        </section>

      </div> {/* Fim da camada de conteúdo */}
    </div>
  );
}

export default Home;
