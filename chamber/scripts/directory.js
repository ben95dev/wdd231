// Footer Dates
document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = `Last Modified: ${document.lastModified}`;

// Responsive Navigation Toggle
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

// Asynchronous Data Fetching
const url = "data/members.json";
const container = document.getElementById("directory-container");

async function getMemberData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not lookin' good.");
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        container.innerHTML = "<p>Unable to load directory at this time.</p>";
    }
}

// Generate HTML Cards Dynamically
function displayMembers(members) {
    container.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        // Map membership level integers to strings
        let membershipText = "Member";
        if (member.membershipLevel === 2) membershipText = "Silver";
        if (member.membershipLevel === 3) membershipText = "Gold";

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <p class="tagline"><em>"${member.tagline}"</em></p>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <p class="website"><a href="${member.website}" target="_blank">Visit Website</a></p>
            <span class="badge level-${member.membershipLevel}">${membershipText} Member</span>
        `;
        container.appendChild(card);
    });
}

// Grid vs List Layout Toggling
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

// Initialize Fetch Execution
getMemberData();