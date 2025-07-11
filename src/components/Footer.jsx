function Footer() {
  return (
    // Container com fundo escuro, texto branco e centralizado
    <footer className="bg-gray-800 text-white text-center py-4 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} Petshop System. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
