// --- Elementos do DOM ---
const body = document.body;
const themeToggleButton = document.getElementById("theme-toggle");
const accessibilityToggleButton = document.getElementById(
    "accessibility-toggle"
);

// --- Funções ---

/**
 * Alterna uma classe no body e salva o estado no localStorage.
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
