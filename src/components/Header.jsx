// src/components/Header.jsx

function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sistema Petshop</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Pets</a>
          <a href="#" className="hover:underline">Clientes</a>
          <a href="#" className="hover:underline">Agendamentos</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
