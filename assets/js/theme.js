(() => {
  const KEY = "easykity-theme";
  const root = document.documentElement;

  function applyTheme(theme) {
    const mode = theme === "light" ? "light" : "dark";
    root.dataset.theme = mode;
    localStorage.setItem(KEY, mode);
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.textContent = mode === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", mode === "dark" ? "Switch to light mode" : "Switch to dark mode");
      btn.title = mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    });
    window.dispatchEvent(new CustomEvent("ek-theme-change", { detail: { theme: mode } }));
  }

  applyTheme(localStorage.getItem(KEY) || root.dataset.theme || "dark");

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
})();
