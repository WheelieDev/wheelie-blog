import Alpine from "alpinejs";
import collapse from "@alpinejs/collapse";
import "./styles.css";
import { blog } from "./blog.js";
import { article } from "./article.js";

Alpine.plugin(collapse);

// Register components as Alpine data. Both pages load this entry; each uses
// only the component named in its x-data ("blog" or "article").
Alpine.data("blog", blog);
Alpine.data("article", article);

window.Alpine = Alpine;
Alpine.start();
