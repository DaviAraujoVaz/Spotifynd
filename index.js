// --- Elementos do DOM ---
const body = document.body;
const themeToggleButton = document.getElementById("theme-toggle");
const accessibilityToggleButton = document.getElementById(
    "accessibility-toggle"
);
const headerLogo = document.getElementById("header-logo");

// --- Funções ---

/**
 * Atualiza o src da imagem do logo com base no tema atual.
 */
function updateLogo() {
    if (body.classList.contains("high-contrast-mode")) {
        // Usa o logo padrão para o tema de alto contraste
        headerLogo.src = 'spotfynd-logo-icon.png';
    } else if (body.classList.contains("light-mode")) {
        headerLogo.src = 'spotfynd-logo-icon-black.png';
    } else {
        // Usa o logo padrão para os temas escuro e de alto contraste
        headerLogo.src = 'spotfynd-logo-icon.png';
    }
}

/**
 * Alterna uma classe no body, salva o estado e atualiza o logo.
 * @param {string} className - O nome da classe para alternar.
 * @param {string} storageKey - A chave para usar no localStorage.
 */
function toggleAndSave(className, storageKey) {
    body.classList.toggle(className);
    if (body.classList.contains(className)) {
        localStorage.setItem(storageKey, "enabled");
    } else {
        localStorage.removeItem(storageKey);
    }
    updateLogo(); // Atualiza o logo sempre que um tema é alterado
}

/**
 * Carrega as configurações salvas do localStorage ao iniciar.
 */
function loadPreferences() {
    if (localStorage.getItem("lightMode") === "enabled") {
        body.classList.add("light-mode");
    }
    if (localStorage.getItem("highContrast") === "enabled") {
        body.classList.add("high-contrast-mode");
    }
    updateLogo(); // Garante que o logo correto seja exibido no carregamento da página
}

// --- Event Listeners ---

// Alternador de Tema (Claro/Escuro)
themeToggleButton.addEventListener("click", () => {
    toggleAndSave("light-mode", "lightMode");
});

// Alternador de Alto Contraste
accessibilityToggleButton.addEventListener("click", () => {
    toggleAndSave("high-contrast-mode", "highContrast");
});

// Carregar preferências ao iniciar a página
document.addEventListener("DOMContentLoaded", loadPreferences);
