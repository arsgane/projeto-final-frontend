// src/pages/Home.jsx

import Header from '../components/Header'; 

function Home() {
  return (
    <div>
      <Header />
      <main className="mt-6 p-4">
        <h2 className="text-xl font-semibold text-center">
          Bem-vindo ao Sistema Petshop
        </h2>
        {/* Aqui virão os próximos componentes das páginas */}
      </main>
    </div>
  );
}

export default Home;
