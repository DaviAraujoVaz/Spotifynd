document.addEventListener("DOMContentLoaded", function () {
    const chatForm = document.getElementById("chat-form");
    const chatHistory = document.getElementById("chat-history");
    const userInput = document.getElementById("userInput");
    const fileUpload = document.getElementById("fileUpload");
    const fileUploadPreview = document.getElementById(
        "file-upload-preview"
    );
    const fileNamePreview = document.getElementById("file-name-preview");
    const cancelFileButton = document.getElementById("cancel-file-button");
    const headerLogo = document.getElementById("header-logo-img");

    const accessibilityBtn = document.getElementById("accessibility-btn");
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeSwitch = themeToggleBtn.querySelector(".theme-switch");

    let attachedFile = null;
    let lastNormalTheme = "dark";

    // --- Theme & Accessibility Logic ---
    const setTheme = (theme) => {
        const html = document.documentElement;
        // Clean up old themes
        html.removeAttribute("data-theme");
        if (html.classList.contains("light-mode"))
            html.classList.remove("light-mode");
        if (html.classList.contains("high-contrast-mode"))
            html.classList.remove("high-contrast-mode");

        html.setAttribute("data-theme", theme);

        // Altera o logo com base no tema
        if (theme === 'light') {
            headerLogo.src = '/resources/spotifynd-logo-icon-black.png';
        } else { // Para 'dark' e 'high-contrast'
            headerLogo.src = '/resources/spotifynd-logo-icon.png';
        }

        if (theme === "light") {
            html.classList.add("light-mode");
        } else if (theme === "high-contrast") {
            html.classList.add("high-contrast-mode");
        }

        localStorage.setItem("theme", theme);
        updateThemeSwitch(theme);

        if (theme === "light" || theme === "dark") {
            lastNormalTheme = theme;
        }
    };

    const updateThemeSwitch = (theme) => {
        if (theme === "light") {
            themeSwitch.classList.add("toggled");
        } else {
            themeSwitch.classList.remove("toggled");
        }
    };

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");
        const newTheme =
            currentTheme === "dark" || currentTheme === "high-contrast"
                ? "light"
                : "dark";
        setTheme(newTheme);
    });

    accessibilityBtn.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");
        if (currentTheme === "high-contrast") {
            setTheme(lastNormalTheme);
        } else {
            setTheme("high-contrast");
        }
    });

    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    // --- Chat Logic ---
    const addMessage = (message, sender, isHTML = false) => {
        // As mensagens do usuário continuam como antes
        if (sender === "user") {
            const bubble = document.createElement("div");
            bubble.className = `w-full sm:max-w-md md:max-w-lg rounded-xl p-3 sm:p-4 chat-bubble chat-bubble--user`;
            if (isHTML) {
                bubble.innerHTML = message;
            } else {
                bubble.textContent = message;
            }
            chatHistory.appendChild(bubble);
            chatHistory.scrollTop = chatHistory.scrollHeight;
            return;
        }

        // Para o bot, criamos um contêiner para a imagem e a mensagem
        const messageContainer = document.createElement("div");
        messageContainer.className = "flex items-end gap-2";

        // Avatar do Chatbot (agora como <img>)
        const avatar = document.createElement("img");
        avatar.src = "/resources/Sofia-Costa.png"; // Caminho para a imagem
        avatar.alt = "Avatar do chatbot"; // Texto alternativo para acessibilidade
        avatar.className = "chatbot-avatar";
        messageContainer.appendChild(avatar);

        // Bolha de Mensagem
        const bubble = document.createElement("div");
        bubble.className = `w-full sm:max-w-md md:max-w-lg rounded-xl p-3 sm:p-4 chat-bubble`;
        if (isHTML) {
            bubble.innerHTML = message;
        } else {
            bubble.textContent = message;
        }
        messageContainer.appendChild(bubble);

        chatHistory.appendChild(messageContainer);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    };

    const showTypingIndicator = () => {
        const indicator = `<div id="typing-indicator" class="flex items-center space-x-2"><span class="block w-2 h-2 rounded-full"></span><span class="block w-2 h-2 rounded-full"></span><span class="block w-2 h-2 rounded-full"></span></div>`;
        addMessage(indicator, "bot", true);
    };

    const removeTypingIndicator = () => {
        const indicator =
            document.getElementById("typing-indicator")?.parentElement.parentElement;
        if (indicator) indicator.remove();
    };

    const handleSearch = () => {
        const query = userInput.value.trim();
        let searchBasis = query;

        if (attachedFile) {
            searchBasis = attachedFile.name;
            addMessage(`Arquivo: ${searchBasis}`, "user");
        } else if (query) {
            addMessage(query, "user");
        } else {
            addMessage(
                "Por favor, me diga o nome de uma música ou envie um arquivo para eu poder ajudar.",
                "bot"
            );
            return;
        }

        userInput.value = "";
        userInput.focus();
        resetFileUpload();
        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();
            displayResults(searchBasis);
        }, 2500);
    };

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleSearch();
    });

    fileUpload.addEventListener("change", () => {
        if (fileUpload.files.length > 0) {
            attachedFile = fileUpload.files[0];
            fileNamePreview.textContent = attachedFile.name;
            fileUploadPreview.classList.remove("hidden");
            fileUploadPreview.classList.add("flex");
        }
    });

    const resetFileUpload = () => {
        attachedFile = null;
        fileUpload.value = "";
        fileUploadPreview.classList.add("hidden");
        fileUploadPreview.classList.remove("flex");
    };

    cancelFileButton.addEventListener("click", resetFileUpload);

    const displayResults = (originalSong) => {
        const mockResults = [
            {
                title: "Feels Like We Only Go Backwards",
                artist: "Tame Impala",
                cover: "https://placehold.co/300x300/ff6f00/FFFFFF?text=Cover1",
            },
            {
                title: "On Melancholy Hill",
                artist: "Gorillaz",
                cover: "https://placehold.co/300x300/2d9cdb/FFFFFF?text=Cover2",
            },
            {
                title: "Somebody Else",
                artist: "The 1975",
                cover: "https://placehold.co/300x300/1db954/FFFFFF?text=Cover3",
            },
            {
                title: "Tokyo Drifting",
                artist: "Glass Animals",
                cover: "https://placehold.co/300x300/ff6f00/FFFFFF?text=Cover4",
            },
            {
                title: "Instant Crush",
                artist: "Daft Punk",
                cover: "https://placehold.co/300x300/2d9cdb/FFFFFF?text=Cover5",
            },
            {
                title: "Redbone",
                artist: "Childish Gambino",
                cover: "https://placehold.co/300x300/1db954/FFFFFF?text=Cover6",
            },
        ];

        let cardsHTML = `<div style="color: var(--cor-texto-primaria);" class="mb-4">Analisei a "vibe" de "${originalSong}" e encontrei estas músicas que você pode gostar:</div>`;
        cardsHTML += '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">';
        mockResults.forEach((song) => {
            cardsHTML += `
                        <div class="card rounded-lg overflow-hidden shadow-md p-0">
                            <img src="${song.cover}" alt="Capa do álbum de ${song.title}" class="w-full h-40 object-cover">
                            <div class="p-3">
                                <h3 class="text-base font-bold truncate">${song.title}</h3>
                                <p class="text-sm truncate" style="color: var(--cor-texto-secundaria);">${song.artist}</p>
                                <button class="mt-3 w-full btn-secondary font-semibold py-2 px-3 rounded-full text-sm transition-colors focus-ring">Ouvir</button>
                            </div>
                        </div>
                    `;
        });
        cardsHTML += "</div>";

        addMessage(cardsHTML, "bot", true);

        setTimeout(() => {
            addMessage("Quer tentar outra música?", "bot");
        }, 1000);
    };

    setTimeout(() => {
        addMessage(
            "Olá! Sou a Sofia. Qual música você está ouvindo hoje?",
            "bot"
        );
    }, 500);
});
