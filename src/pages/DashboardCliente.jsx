import React from 'react';

const DashboardCliente = () => {
  const nomeCliente = localStorage.getItem('nomeUsuario') || 'Cliente';

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">
        Bem-vindo(a), {nomeCliente}!
      </h1>
      <p className="text-lg mb-6">Este é o seu painel de cliente.</p>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Serviços agendados</h2>
        <p className="text-gray-600">Em breve você poderá acompanhar seus agendamentos aqui.</p>
      </div>
    </div>
  );
};

export default DashboardCliente;
