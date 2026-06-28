import { a11y } from "./a11y.js";

// Home page: hero, writing index (with category filter), about.
export function blog() {
  return {
    ...a11y(),
    imgError: false,
    year: new Date().getFullYear(),
    activeCat: "All",

    // Index of essays. Each links to article.html?post=<slug>,
    // which renders posts/<slug>.md as a newspaper page.
    posts: [
      {
        slug: "person-centred-at-7am",
        title: "What 'person-centred' actually means at 7am",
        category: "Adult Social Care",
        date: "12 Jun 2026",
        read: "5 min",
        excerpt: "We say it in every meeting. Here's what it looks like before the kettle's even boiled.",
      },
      {
        slug: "the-budget-meeting",
        title: "The budget meeting nobody wants to chair",
        category: "Local Government",
        date: "28 May 2026",
        read: "7 min",
        excerpt: "Setting a council budget when every line is already someone's lifeline. Notes from the room.",
      },
      {
        slug: "ramps-lifts-and-dignity",
        title: "Ramps, lifts, and the dignity of just getting in",
        category: "Life on Wheels",
        date: "16 May 2026",
        read: "6 min",
        excerpt: "Accessibility isn't a checkbox. It's the difference between being invited and being an afterthought.",
      },
      {
        slug: "burnout-is-not-a-badge",
        title: "Burnout isn't a badge of honour",
        category: "Wellbeing",
        date: "9 May 2026",
        read: "4 min",
        excerpt: "Caring for others while running on empty helps no one. What I learned the hard way.",
      },
    ],

    init() {
      this.initA11y();
    },
    get categories() {
      return ["All", ...new Set(this.posts.map((p) => p.category))];
    },
    get filteredPosts() {
      return this.activeCat === "All"
        ? this.posts
        : this.posts.filter((p) => p.category === this.activeCat);
    },
  };
}
