// Importa a página inicial
import Home from './pages/Home';

// Função principal do componente App
function App() {
  return (
    // Container com estilo de fundo e padding
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Renderiza a página Home */}
      <Home />
    </div>
  );
}

export default App;
