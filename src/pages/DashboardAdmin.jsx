import React from 'react';

const DashboardAdmin = () => {
  const nomeAdmin = localStorage.getItem('nomeUsuario') || 'Administrador';

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-700">
        Painel do Admin – {nomeAdmin}
      </h1>
      <p className="text-lg mb-6">Gerencie os dados do sistema abaixo:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Clientes cadastrados</h2>
          <p className="text-gray-600">Você pode acessar a lista completa em <strong>/clientes</strong>.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Relatórios e estatísticas</h2>
          <p className="text-gray-600">Em breve: métricas de vendas, serviços e mais.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
