// Shared accessibility state: background theme, typeface, text size.
// Persisted in localStorage and applied on every page. Mixed into the page
// components via spread (`...a11y()`), so members must be plain values or
// methods — never getters (spread evaluates getters once and freezes them).
export function a11y() {
  return {
    panelOpen: false,
    theme: "light", // light | sepia | dark | contrast
    font: "serif", // serif | sans | dyslexic
    fontScale: 100, // percent, 80–160
    themes: [
      { k: "light", l: "Light", swatch: "background:#f5f1e8;color:#1f1c17" },
      { k: "sepia", l: "Sepia", swatch: "background:#f4ecd8;color:#3c3021" },
      { k: "dark", l: "Dark", swatch: "background:#151411;color:#f0ebe0" },
      { k: "contrast", l: "High", swatch: "background:#000;color:#fff" },
    ],
    initA11y() {
      this.theme =
        localStorage.getItem("a11y-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      this.font = localStorage.getItem("a11y-font") || "serif";
      this.fontScale = parseInt(localStorage.getItem("a11y-scale") || "100", 10);
    },
    // A regular method, not a getter (see note above).
    htmlClass() {
      const bg =
        { light: "", sepia: "theme-sepia", dark: "dark", contrast: "dark theme-contrast" }[this.theme] || "";
      return `${bg} font-${this.font}`;
    },
    setTheme(t) {
      this.theme = t;
      localStorage.setItem("a11y-theme", t);
    },
    setFont(f) {
      this.font = f;
      localStorage.setItem("a11y-font", f);
    },
    bumpScale(d) {
      this.fontScale = Math.min(160, Math.max(80, this.fontScale + d));
      localStorage.setItem("a11y-scale", this.fontScale);
    },
    resetScale() {
      this.fontScale = 100;
      localStorage.setItem("a11y-scale", "100");
    },
  };
}
