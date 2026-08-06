// Asynchronously fetch inventory data with robust try...catch error handling
async function fetchProducts() {
  try {
    const response = await fetch("./data/products.json");
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Mobile Navigation Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (menuToggle && primaryNav) {
    const hamburgerIcon = menuToggle.querySelector(".hamburger");
    const closeIcon = menuToggle.querySelector(".close");

    menuToggle.addEventListener("click", () => {
      primaryNav.classList.toggle("open");
      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.classList.toggle("hidden");
        closeIcon.classList.toggle("hidden");
      }
    });
  }

  // 2. Dynamic Footer Dates & Local Storage Visitor Count
  const yearSpan = document.getElementById("currentyear");
  const lastModifiedPara = document.getElementById("lastModified");
  const visitCounterEl = document.getElementById("visit-counter");

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (lastModifiedPara) lastModifiedPara.textContent = `Last Modified: ${document.lastModified}`;

  let visits = Number(localStorage.getItem("retailHubVisits")) || 0;
  visits++;
  localStorage.setItem("retailHubVisits", visits);
  if (visitCounterEl) {
    visitCounterEl.textContent = `Page Views: ${visits}`;
  }

  // 3. Dynamic Products & Smooth Scroll Feature Target
  const products = await fetchProducts();
  const homeFeaturedGrid = document.getElementById("home-featured-grid");
  const productDisplayGrid = document.getElementById("product-display-grid");
  const viewFeaturedBtn = document.getElementById("view-featured-btn");
  const featuredSection = document.getElementById("featured");

  function createProductCardMarkup(item) {
    return `
      <article class="product-card card">
        <div>
          <h3>${item.name}</h3>
          <p class="price">${item.price}</p>
          <p class="status ${item.inStock ? 'in-stock' : 'out-of-stock'}">
            ${item.inStock ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
        <button data-id="${item.id}" class="details-btn">Quick View</button>
      </article>
    `;
  }

  // Populate Home Page Featured Section (First 3 Items)
  if (homeFeaturedGrid) {
    const featuredItems = products.slice(0, 3);
    homeFeaturedGrid.innerHTML = featuredItems.map(createProductCardMarkup).join("");
  }

  // Smooth scroll and highlight animation for View Featured Items button
  if (viewFeaturedBtn && featuredSection) {
    viewFeaturedBtn.addEventListener("click", (e) => {
      e.preventDefault();
      featuredSection.scrollIntoView({ behavior: "smooth", block: "start" });
      featuredSection.classList.add("highlight-active");
      setTimeout(() => {
        featuredSection.classList.remove("highlight-active");
      }, 1500);
    });
  }

  // Populate Full Products Page with Filtering
  if (productDisplayGrid) {
    const renderProducts = (items) => {
      productDisplayGrid.innerHTML = items.map(createProductCardMarkup).join("");
    };

    renderProducts(products);

    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");

        const category = e.target.dataset.category;
        if (category === "all") {
          renderProducts(products);
        } else {
          renderProducts(products.filter((p) => p.category === category));
        }
      });
    });
  }

  // 4. Accessible Modal Dialog Event Listener
  const modal = document.getElementById("product-modal");
  const closeModal = document.getElementById("close-modal");

  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("details-btn")) {
      const productId = Number(e.target.dataset.id);
      const selectedProduct = products.find((p) => p.id === productId);

      if (selectedProduct && modal) {
        document.getElementById("modal-title").textContent = selectedProduct.name;
        document.getElementById("modal-category").textContent = `Category: ${selectedProduct.category}`;
        document.getElementById("modal-description").textContent = selectedProduct.description;
        document.getElementById("modal-price").textContent = `Price: ${selectedProduct.price}`;
        document.getElementById("modal-stock").textContent = selectedProduct.inStock ? "Status: In Stock" : "Status: Out of Stock";
        modal.showModal();
      }
    }
  });

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => modal.close());
  }

  // 5. Parse Form Submission Data on thankyou.html
  const resultsContainer = document.getElementById("results");
  if (resultsContainer) {
    const params = new URLSearchParams(window.location.search);
    if (params.has("fullname")) {
      resultsContainer.innerHTML = `
        <p><strong>Full Name:</strong> ${params.get("fullname")}</p>
        <p><strong>Email Address:</strong> ${params.get("email")}</p>
        <p><strong>Inquiry Type:</strong> ${params.get("inquiry") || "General"}</p>
        <p><strong>Message:</strong> ${params.get("message")}</p>
      `;
    } else {
      resultsContainer.innerHTML = `<p>No form data detected.</p>`;
    }
  }
});