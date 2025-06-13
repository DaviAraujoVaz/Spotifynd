# Spotfynd - Music Discovery Interface

A fully responsive and accessible front-end for a music discovery application, built with modern HTML, CSS, and JavaScript. This project serves as a demonstration of clean code, responsive design principles, and a strong focus on user accessibility.

![Spotfynd Preview](https://storage.googleapis.com/gemini-prod-us-west1-assets/e6034c44243b35a3/spotfynd_demo.gif)

---

## ✨ Features

* **Fully Responsive Design:** The layout seamlessly adapts to any screen size, from small mobile devices to large desktop monitors, using a fluid and flexible approach.
* **Multiple Themes:**
    * **Light & Dark Mode:** A sleek theme switcher allows users to toggle between a light and dark interface.
    * **High-Contrast Mode:** A dedicated accessibility option to improve readability for users with visual impairments.
* **Accessibility First (a11y):**
    * Semantic HTML5 structure for screen reader compatibility.
    * ARIA labels for interactive elements.
    * Focus on keyboard navigability.
* **Modern CSS Architecture:**
    * **Design Tokens:** Utilizes CSS variables for a standardized system of colors, fonts, and spacing, making the theme easily customizable.
    * **Fluid Typography & Spacing:** Employs the `clamp()` function to ensure text and margins scale smoothly with the viewport.
    * **BEM Methodology:** Follows the Block, Element, Modifier naming convention for scalable and maintainable styles.

---

## 🛠️ Tech Stack

* **HTML5:** Structured with semantic tags for accessibility and SEO.
* **CSS3:**
    * **Flexbox** for layout management.
    * **CSS Custom Properties (Variables)** for theming and a clean design system.
    * **`clamp()`** for fluid typography and spacing.
    * **BEM** for class naming conventions.
* **JavaScript (ES6+):**
    * Vanilla JS for theme and accessibility toggles.
    * Uses `localStorage` to remember the user's theme preference across sessions.

---

## 🚀 How to Use

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/spotfynd.git](https://github.com/your-username/spotfynd.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd spotfynd
    ```
3.  Open the `index.html` file in your favorite web browser.

No build step or dependencies are required. It's a pure front-end project.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
