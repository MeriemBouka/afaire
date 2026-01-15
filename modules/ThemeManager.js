export default class ThemeManager {
  constructor() {
    this.themes = [
      {
        name: "beige",
        displayName: "Beige Classique",
        background: "url('./images/arriere-plan3.png')",
        containerBg: "rgba(253,244,245, 0.8)",
        inputWrapperBg: "#f7e2e5",
        inputBg: "#f7e2e5",
        inputColor: "#a35b65",
        buttonBg: "#bd7c84",
        buttonColor: "rgb(249, 222, 225)",
        tacheBg: "#f7e2e5",
        tacheColor: "#a35b65",
        titleColor: "#db8c99",
        actionsBg: "#bd7c84",
      },
      {
        name: "blackwhite",
        displayName: "Noir & Blanc",
        background: "url('./images/arriere-plan2.jpg')",
        containerBg: "rgba(255, 255, 255, 0.9)",
        inputWrapperBg: "rgba(200, 200, 200, 0.95)",
        inputBg: "rgba(200, 200, 200, 0.95)",
        inputColor: "#1a1a1a",
        buttonBg: "#2d2d2d",
        buttonColor: "#ffffff",
        tacheBg: "#3a3a3a",
        tacheColor: "#f5f5f5",
        titleColor: "#1a1a1a",
        actionsBg: "#e0e0e0",
      },
    ];

    this.currentThemeIndex = 0;
    this.chargerTheme();
  }

  chargerTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const index = this.themes.findIndex((t) => t.name === savedTheme);
      if (index !== -1) {
        this.currentThemeIndex = index;
      }
    }
    this.appliquerTheme();
  }

  changerTheme() {
    this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
    this.appliquerTheme();
    this.sauvegarderTheme();
  }

  appliquerTheme() {
    const theme = this.themes[this.currentThemeIndex];
    const root = document.documentElement;

    // Appliquer les variables CSS
    root.style.setProperty("--bg-image", theme.background);
    root.style.setProperty("--container-bg", theme.containerBg);
    root.style.setProperty("--input-wrapper-bg", theme.inputWrapperBg);
    root.style.setProperty("--input-bg", theme.inputBg);
    root.style.setProperty("--input-color", theme.inputColor);
    root.style.setProperty("--button-bg", theme.buttonBg);
    root.style.setProperty("--button-color", theme.buttonColor);
    root.style.setProperty("--tache-bg", theme.tacheBg);
    root.style.setProperty("--tache-color", theme.tacheColor);
    root.style.setProperty("--title-color", theme.titleColor);
    root.style.setProperty("--actions-bg", theme.actionsBg);

    // Ajouter une classe au body pour le thème
    document.body.className = `theme-${theme.name}`;
  }

  sauvegarderTheme() {
    const theme = this.themes[this.currentThemeIndex];
    localStorage.setItem("theme", theme.name);
  }

  getThemeActuel() {
    return this.themes[this.currentThemeIndex];
  }
}
