// Importa o React (recomendado em arquivos JSX)
import React from 'react';

// Define o componente da página de Pets
function Pets() {
  return (
    // Container principal da página
    <div className="p-4">
      {/* Título da página */}
      <h1 className="text-2xl font-bold text-center text-blue-700">
        Página de Pets
      </h1>
    </div>
  );
}

// Exporta o componente para ser usado nas rotas
export default Pets;
