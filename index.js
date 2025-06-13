// --- Elementos do DOM ---
const body = document.body;
const themeToggleButton = document.getElementById("theme-toggle");
const accessibilityToggleButton = document.getElementById(
    "accessibility-toggle"
);
const headerLogo = document.getElementById("header-logo");

// --- Variável de Estado ---
// Guarda o último tema "normal" (claro ou escuro) para restaurar após desativar o alto contraste.
let lastNormalTheme = "dark";

// --- Funções ---

/**
 * Atualiza o src da imagem do logo com base no tema.
 * @param {string} theme - O tema atual ('light', 'dark', ou 'high-contrast').
 */
function updateLogo(theme) {
    if (theme === "light") {
        headerLogo.src = "spotfynd-logo-icon-black.png";
    } else {
        // Para temas 'dark' e 'high-contrast', usa o mesmo logo.
        headerLogo.src = "spotfynd-logo-icon.png";
    }
}

/**
 * Define o tema da aplicação, atualizando classes, logo e localStorage.
 * @param {string} theme - O nome do tema a ser aplicado ('light', 'dark', 'high-contrast').
 */
function setTheme(theme) {
    // 1. Limpa as classes de tema anteriores do body
    body.classList.remove("light-mode", "high-contrast-mode");

    // 2. Adiciona a classe do novo tema, se aplicável
    if (theme === "light") {
        body.classList.add("light-mode");
    } else if (theme === "high-contrast") {
        body.classList.add("high-contrast-mode");
    }

    // 3. Atualiza o logo
    updateLogo(theme);

    // 4. Salva a preferência no localStorage
    localStorage.setItem("theme", theme);

    // 5. Atualiza a variável de controle se o tema for 'normal'
    if (theme === "light" || theme === "dark") {
        lastNormalTheme = theme;
    }
}

// --- Event Listeners ---

// Alternador de Tema (Claro/Escuro)
themeToggleButton.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    const newTheme =
        currentTheme === "dark" || currentTheme === "high-contrast"
            ? "light"
            : "dark";
    setTheme(newTheme);
});

// Alternador de Alto Contraste
accessibilityToggleButton.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    const newTheme =
        currentTheme === "high-contrast" ? lastNormalTheme : "high-contrast";
    setTheme(newTheme);
});

// Carregar preferências ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";

    // Garante que a variável 'lastNormalTheme' esteja correta no carregamento
    if (savedTheme === 'light') {
        lastNormalTheme = 'light';
    }

    setTheme(savedTheme);
});