(() => {
  const searchInput = document.querySelector("[data-tool-search]");
  const tabs = [...document.querySelectorAll("[data-filter]")];
  const categoryBoxes = [...document.querySelectorAll("[data-category-box]")];
  const emptyState = document.querySelector("[data-empty-state]");
  let activeCategory = "all";

  function applyFilters() {
    const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    let totalVisible = 0;

    categoryBoxes.forEach((box) => {
      const boxCat = box.dataset.categoryBox;
      const categoryMatches = activeCategory === "all" || activeCategory === boxCat;
      const cards = [...box.querySelectorAll("[data-tool-card]")];
      let visibleInBox = 0;

      cards.forEach((card) => {
        const text = (card.textContent + " " + (card.dataset.keywords || "")).toLowerCase();
        const show = categoryMatches && (!query || text.includes(query));
        card.hidden = !show;
        if (show) visibleInBox++;
      });

      box.hidden = visibleInBox === 0;
      totalVisible += visibleInBox;
    });

    if (emptyState) {
      emptyState.style.display = totalVisible === 0 ? "block" : "none";
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeCategory = tab.dataset.filter;
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  // Drawer category jump support
  document.querySelectorAll("[data-drawer-jump]").forEach((link) => {
    link.addEventListener("click", () => {
      activeCategory = "all";
      tabs.forEach((t) => t.classList.toggle("active", t.dataset.filter === "all"));
      if (searchInput) searchInput.value = "";
      applyFilters();
    });
  });
})();
