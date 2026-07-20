/**
 * Collect status data with counts from DOM cards on the current page
 */
function collectStatuses() {
  return DOM.qsa(".project-card").reduce((acc, card) => {
    parseArrayFromAttr(card.getAttribute("data-statuses"))
      .filter(Boolean)
      .forEach((s) => {
        acc[s] = (acc[s] || 0) + 1;
      });
    return acc;
  }, {});
}

/**
 * Collect tag counts from DOM cards on the current page
 */
function collectTags() {
  return DOM.qsa(".project-card").reduce((acc, card) => {
    parseArrayFromAttr(card.getAttribute("data-tags")).forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});
}

/**
 * DOM Helpers
 */
const DOM = {
  clear: (el) => (el.innerHTML = ""),
  create: (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else el.setAttribute(k, v);
    });
    children.forEach((child) => el.appendChild(child));
    return el;
  },
  qs: (selector) => document.querySelector(selector),
  qsa: (selector) => Array.from(document.querySelectorAll(selector)),
};

/**
 * Display functions
 */
function displayStatuses(statusData) {
  const container = DOM.qs("#status-list");
  DOM.clear(container);

  const sortedStatuses = Object.keys(statusData).sort();
  const maxVisible = 5;

  sortedStatuses.forEach((status, i) => {
    const count = statusData[status];
    const row = DOM.create("div", { class: "status-row" });
    if (i >= maxVisible) row.style.display = "none";

    const checkbox = DOM.create("input", {
      type: "checkbox",
      id: `status-${CSS.escape(status)}`,
      "data-status": status,
    });
    checkbox.addEventListener("change", handleFilterChange);

    const name = DOM.create("span", { class: "status-name", text: status });
    const countEl = DOM.create("span", {
      class: "status-count",
      text: String(count),
    });

    row.append(checkbox, name, countEl);
    container.appendChild(row);
  });

  setupShowMore(
    ".status .show-more",
    "#status-list .status-row",
    maxVisible,
  );
}

function displayTags(tagCounts) {
  const container = DOM.qs("#product-tags-list");
  DOM.clear(container);

  const sortedTags = Object.keys(tagCounts).sort();
  const maxVisible = 5;

  sortedTags.forEach((tag, i) => {
    const count = tagCounts[tag];
    const row = DOM.create("div", { class: "tag-row" });
    if (i >= maxVisible) row.style.display = "none";

    const checkbox = DOM.create("input", {
      type: "checkbox",
      id: `tag-${CSS.escape(tag)}`,
      "data-tag": tag,
    });
    checkbox.addEventListener("change", handleFilterChange);

    const name = DOM.create("span", { class: "tag-name", text: tag });
    const countEl = DOM.create("span", {
      class: "tag-count",
      text: String(count),
    });

    row.append(checkbox, name, countEl);
    container.appendChild(row);
  });

  setupShowMore(
    ".product-tags .show-more",
    "#product-tags-list .tag-row",
    maxVisible,
  );
}

/**
 * Show more/less handler
 */
function setupShowMore(buttonSelector, rowSelector, maxVisible) {
  const button = DOM.qs(buttonSelector);
  const rows = DOM.qsa(rowSelector);
  let expanded = false;

  rows.forEach(
    (row, i) => (row.style.display = i < maxVisible ? "flex" : "none"),
  );
  if (button) button.textContent = "Show more";

  button?.addEventListener("click", () => {
    expanded = !expanded;
    rows.forEach((row, i) => {
      row.style.display = expanded || i < maxVisible ? "flex" : "none";
    });
    button.textContent = expanded ? "Show less" : "Show more";
  });
}

/**
 * Helpers
 */
function getIconPath(icon, theme) {
  const darkModeIcon =
    theme === "dark" && icon === "ansys-icon-light.svg"
      ? "ansys-icon-dark.svg"
      : icon;
  const basePath = window.location.pathname.match(
    /version\/(dev|stable)|pull\//,
  )
    ? ""
    : "version/dev/";
  return `${basePath}${darkModeIcon}`;
}

function parseArrayFromAttr(value) {
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    console.warn("Unable to parse data attribute:", value);
    return [];
  }
}

/**
 * Filtering logic
 */
function handleFilterChange() {
  applyFilters();
}

function applyFilters() {
  const selectedStatuses = DOM.qsa("#status-list input:checked").map(
    (cb) => cb.dataset.status,
  );
  const selectedTags = DOM.qsa("#product-tags-list input:checked").map(
    (cb) => cb.dataset.tag,
  );

  updateSelectedPills(selectedStatuses, selectedTags);
  updateProjectCards(selectedStatuses, selectedTags);

  if (selectedTags.length > 0 && selectedStatuses.length === 0) {
    // Tags only → tag counts stay fixed, statuses update
    updateStatusCountsFromVisible();
  } else if (selectedStatuses.length > 0 && selectedTags.length === 0) {
    // Statuses only → status counts stay fixed, tags update
    updateTagCountsFromVisible();
  } else if (selectedTags.length > 0 && selectedStatuses.length > 0) {
    // Both selected → both statuses and tags update
    updateCountsFromVisible();
  } else {
    resetAllCounts();
  }

  updateVisibleProjectsLimit();
}

function updateProjectCards(selectedStatuses, selectedTags) {
  DOM.qsa(".project-card").forEach((card) => {
    const statuses = parseArrayFromAttr(card.getAttribute("data-statuses"));
    const tags = parseArrayFromAttr(card.getAttribute("data-tags"));

    let visible = true;

    if (selectedTags.length > 0) {
      visible = selectedTags.every((t) => tags.includes(t));
      if (visible && selectedStatuses.length > 0) {
        visible = selectedStatuses.some((s) => statuses.includes(s));
      }
    } else if (selectedStatuses.length > 0) {
      visible = selectedStatuses.some((s) => statuses.includes(s));
    }

    card.style.display = visible ? "flex" : "none";
  });
}

/**
 * Dynamic counts updates
 */
function updateStatusCountsFromVisible() {
  const visibleCards = DOM.qsa(".project-card").filter(
    (c) => c.style.display !== "none",
  );
  const statusCounts = {};
  visibleCards.forEach((card) => {
    const statuses = parseArrayFromAttr(card.getAttribute("data-statuses"));
    statuses.forEach((s) => (statusCounts[s] = (statusCounts[s] || 0) + 1));
  });

  DOM.qsa("#status-list .status-row").forEach((row) => {
    const status = row.querySelector("input")?.dataset.status;
    const count = statusCounts[status] || 0;
    const countSpan = row.querySelector(".status-count");
    if (countSpan) countSpan.textContent = String(count);
    row.style.display = count > 0 ? "flex" : "none";
  });
}

function updateTagCountsFromVisible() {
  const visibleCards = DOM.qsa(".project-card").filter(
    (c) => c.style.display !== "none",
  );
  const tagCounts = {};
  visibleCards.forEach((card) => {
    const tags = parseArrayFromAttr(card.getAttribute("data-tags"));
    tags.forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1));
  });

  DOM.qsa("#product-tags-list .tag-row").forEach((row) => {
    const tag = row.querySelector("input")?.dataset.tag;
    const count = tagCounts[tag] || 0;
    const countSpan = row.querySelector(".tag-count");
    if (countSpan) countSpan.textContent = String(count);
    row.style.display = count > 0 ? "flex" : "none";
  });
}

function updateCountsFromVisible() {
  // Both selected → update both sides
  updateStatusCountsFromVisible();
  updateTagCountsFromVisible();
}

function resetAllCounts() {
  // Show all project cards again
  DOM.qsa(".project-card").forEach((card) => (card.style.display = "flex"));

  const statusCounts = {};
  const tagCounts = {};

  // Count all projects (no filters)
  DOM.qsa(".project-card").forEach((card) => {
    const statuses = parseArrayFromAttr(card.getAttribute("data-statuses"));
    const tags = parseArrayFromAttr(card.getAttribute("data-tags"));
    statuses.forEach((s) => (statusCounts[s] = (statusCounts[s] || 0) + 1));
    tags.forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1));
  });

  // Reset status list counts and show all statuses
  DOM.qsa("#status-list .status-row").forEach((row) => {
    const status = row.querySelector("input")?.dataset.status;
    const countSpan = row.querySelector(".status-count");
    const count = statusCounts[status] || 0;
    if (countSpan) countSpan.textContent = String(count);
    row.style.display = "flex";
  });

  // Reset tag list counts and show all tags
  DOM.qsa("#product-tags-list .tag-row").forEach((row) => {
    const tag = row.querySelector("input")?.dataset.tag;
    const countSpan = row.querySelector(".tag-count");
    const count = tagCounts[tag] || 0;
    if (countSpan) countSpan.textContent = String(count);
    row.style.display = "flex";
  });

  // Restore sidebar “Show more” truncation (optional)
  setupShowMore(
    ".status .show-more",
    "#status-list .status-row",
    5,
  );
  setupShowMore(".product-tags .show-more", "#product-tags-list .tag-row", 5);
}

/**
 * UI updates
 */
function updateSelectedPills(statuses, tags) {
  const tagContainer = DOM.qs("#selected-product-tags-list");
  const statusContainer = DOM.qs("#selected-status-list");
  if (tagContainer) DOM.clear(tagContainer);
  if (statusContainer) DOM.clear(statusContainer);

  tags.forEach((t) =>
    tagContainer?.appendChild(
      DOM.create("span", { class: "selected-tag", text: t }),
    ),
  );
  statuses.forEach((s) =>
    statusContainer?.appendChild(
      DOM.create("span", { class: "selected-status", text: s }),
    ),
  );

  const clearTagsBtn = DOM.qs("#clear-tags-button");
  const clearStatusesBtn = DOM.qs("#clear-status");
  if (clearTagsBtn) clearTagsBtn.style.display = tags.length ? "flex" : "none";
  if (clearStatusesBtn)
    clearStatusesBtn.style.display = statuses.length ? "flex" : "none";
}

/**
 * Pagination control
 */
function updateVisibleProjectsLimit(limit = 5) {
  // const visibleCards = DOM.qsa(".project-card").filter(
  //   (c) => c.style.display !== "none"
  // );
  // visibleCards.forEach((card, idx) => {
  //   card.style.display = idx < limit ? "flex" : "none";
  // });

  const showMoreBtn = DOM.qs("#show-more-button");
  if (showMoreBtn) {
    showMoreBtn.style.display = visibleCards.length > limit ? "flex" : "none";
    showMoreBtn.onclick = () => showRemainingProjects(limit);
  }
}

function showRemainingProjects(limit) {
  DOM.qsa(".project-card").forEach((card) => {
    if (card.style.display !== "none") card.style.display = "flex";
  });
  const btn = DOM.qs("#show-more-button");
  if (btn) btn.style.display = "none";
}

/**
 * Theme icon updater
 */
function updateIcon() {
  const theme = document.documentElement.dataset.theme || "light";
  DOM.qsa(".ansys-icon").forEach((img) => {
    img.src =
      theme === "dark"
        ? img.src.replace("ansys-icon-light.svg", "ansys-icon-dark.svg")
        : img.src.replace("ansys-icon-dark.svg", "ansys-icon-light.svg");
  });
}
const observer = new MutationObserver(updateIcon);
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"],
});

/**
 * Initialization
 */
document.addEventListener("DOMContentLoaded", () => {
  displayStatuses(collectStatuses());
  displayTags(collectTags());

  DOM.qs("#clear-tags-button")?.addEventListener("click", () => {
    DOM.qsa('#product-tags-list input[type="checkbox"]').forEach(
      (cb) => (cb.checked = false),
    );
    applyFilters();
  });

  DOM.qs("#clear-status")?.addEventListener("click", () => {
    DOM.qsa('#status-list input[type="checkbox"]').forEach(
      (cb) => (cb.checked = false),
    );
    applyFilters();
  });

  updateIcon();
});
