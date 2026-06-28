import { marked } from "marked";
import { a11y } from "./a11y.js";

// Article page: fetches posts/<slug>.md, parses front matter, renders the
// markdown body in a newspaper layout.
export function article() {
  return {
    ...a11y(),
    state: "loading", // loading | ready | error
    errorMsg: "",
    meta: {},
    html: "",
    year: new Date().getFullYear(),
    edition: 1,
    readingTime: "",

    init() {
      this.initA11y();
      this.load();
    },

    // Parse simple "key: value" YAML front matter between --- fences.
    parseFrontMatter(text) {
      const m = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
      if (!m) return { meta: {}, body: text };
      const meta = {};
      for (const line of m[1].split(/\r?\n/)) {
        const idx = line.indexOf(":");
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();
        val = val.replace(/^["']|["']$/g, ""); // strip surrounding quotes
        meta[key] = val;
      }
      return { meta, body: m[2] };
    },

    async load() {
      const params = new URLSearchParams(location.search);
      const slug = (params.get("post") || "").replace(/[^a-z0-9-]/gi, "");
      if (!slug) {
        this.state = "error";
        this.errorMsg = "No article was specified.";
        return;
      }
      try {
        const res = await fetch(`posts/${slug}.md`, { cache: "no-cache" });
        if (!res.ok) throw new Error(`Couldn't load posts/${slug}.md (${res.status}).`);
        const text = await res.text();
        const { meta, body } = this.parseFrontMatter(text);
        this.meta = meta;
        this.readingTime = Math.max(1, Math.round(body.split(/\s+/).length / 200)) + " min";
        this.html = marked.parse(body);
        this.state = "ready";
        document.title = (meta.title ? meta.title + " — " : "") + "The Wheelie";
      } catch (err) {
        this.state = "error";
        this.errorMsg = err.message + " (Tip: open the site over http://, not file://.)";
      }
    },
  };
}
