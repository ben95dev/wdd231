// ==========================================================================
// Regional Chamber of Commerce — Business Directory
// directory.js
// ==========================================================================

const DATA_URL = "data/members.json";

const container = document.querySelector("#directory-container");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

const TIER_LABELS = {
  gold: "Gold Member",
  silver: "Silver Member",
  member: "Member"
};

// ---------- Fetch and render directory data ----------
async function loadDirectory() {
  container.setAttribute("aria-busy", "true");
  container.innerHTML = `<p class="loading-message">Loading member businesses…</p>`;

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const members = await response.json();
    renderDirectory(members);
  } catch (error) {
    container.innerHTML = `
      <p class="error-message">
        Sorry — the member directory couldn't be loaded right now.
        Please refresh the page or try again later.
      </p>`;
    console.error("Failed to load directory data:", error);
  } finally {
    container.removeAttribute("aria-busy");
  }
}

// ---------- Build a single business card ----------
function createCard(member) {
  const card = document.createElement("div");
  card.className = "business-card";

  const tierLabel = TIER_LABELS[member.tier] || "Member";

  card.innerHTML = `
    <span class="member-seal ${member.tier}">${tierLabel}</span>
    <h3>${member.name}</h3>
    <p class="category">${member.category}</p>
    <p class="description">${member.description}</p>
    <div class="details">
      <span class="address">${member.address}</span>
      <span class="phone">${member.phone}</span>
      <a href="${member.website}" target="_blank" rel="noopener">Visit website</a>
    </div>
  `;

  return card;
}

// ---------- Render all cards into the container ----------
function renderDirectory(members) {
  container.innerHTML = "";

  if (!members || members.length === 0) {
    container.innerHTML = `<p class="empty-message">No member businesses to display yet.</p>`;
    return;
  }

  members
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((member) => {
      container.appendChild(createCard(member));
    });
}

// ---------- Grid / list view toggle ----------
function setView(view) {
  const isGrid = view === "grid";

  container.classList.toggle("grid-view", isGrid);
  container.classList.toggle("list-view", !isGrid);

  gridBtn.classList.toggle("active", isGrid);
  listBtn.classList.toggle("active", !isGrid);

  gridBtn.setAttribute("aria-pressed", String(isGrid));
  listBtn.setAttribute("aria-pressed", String(!isGrid));
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

// ---------- Mobile nav toggle ----------
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// ---------- Footer: current year + last modified ----------
document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent =
  `Last updated: ${document.lastModified}`;

// ---------- Init ----------
loadDirectory();