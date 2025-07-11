/** @type {import('tailwindcss').Config} */
module.exports = {
  // 🧠 Define onde o Tailwind deve procurar classes CSS para gerar os estilos
  content: [
    "./index.html",             // Página HTML principal
    "./src/**/*.{js,jsx}",      // Todos os arquivos .js e .jsx dentro de src/
  ],

  theme: {
    extend: {
      // 🎯 Animações personalizadas
      animation: {
        // Faz o fundo animado andar da esquerda para a direita continuamente
        moverHorizontal: 'scrollBg 30s linear infinite',

        // Faz o gif andar de um lado pro outro (gatinho)
        walkSideways: 'walkSideways 8s linear infinite',
      },

      // 🎞️ Keyframes da animação moverHorizontal e walkSideways
      keyframes: {
        scrollBg: {
          '0%': { backgroundPosition: 'left center' },
          '100%': { backgroundPosition: 'right center' },
        },
        walkSideways: {
          '0%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },

  // 📦 Plugins opcionais do Tailwind (pode adicionar `@tailwindcss/forms`, etc)
  plugins: [],
}
