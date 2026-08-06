// Array of Product Data
const products = [
  {
    id: 1,
    name: "Standard Office Paper Pack",
    category: "supplies",
    price: "$12.50",
    inStock: true,
    description: "500 sheets of high-quality white printer paper."
  },
  {
    id: 2,
    name: "Wireless USB Mouse",
    category: "electronics",
    price: "$22.00",
    inStock: true,
    description: "Ergonomic 2.4GHz optical wireless mouse."
  },
  {
    id: 3,
    name: "Retail Store Bundle Kit",
    category: "packages",
    price: "$85.00",
    inStock: true,
    description: "Includes barcode scanner, receipt roll pack, and stand."
  },
  {
    id: 4,
    name: "Thermal Receipt Rolls (10 Pack)",
    category: "supplies",
    price: "$18.00",
    inStock: true,
    description: "Standard size thermal paper rolls for POS machines."
  },
  {
    id: 5,
    name: "USB-C Multi-Port Hub",
    category: "electronics",
    price: "$34.99",
    inStock: false,
    description: "Aluminum 6-in-1 adapter with HDMI, USB 3.0, and SD reader."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navigation Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      primaryNav.classList.toggle("open");
    });
  }

  // 2. Dynamic Footer Info
  const yearSpan = document.getElementById("currentyear");
  const lastModifiedPara = document.getElementById("lastModified");

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (lastModifiedPara) lastModifiedPara.textContent = `Last Modified: ${document.lastModified}`;

  // 3. Products Page Functionality
  const productDisplay = document.getElementById("product-display-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const modal = document.getElementById("product-modal");
  const closeModal = document.getElementById("close-modal");

  if (productDisplay) {
    // Render Products
    function renderProducts(items) {
      productDisplay.innerHTML = "";
      items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "product-card card";
        card.innerHTML = `
          <div>
            <h3>${item.name}</h3>
            <p class="price">${item.price}</p>
            <p class="status ${item.inStock ? 'in-stock' : 'out-of-stock'}">
              ${item.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
          <button onclick="openProductModal(${item.id})">Details</button>
        `;
        productDisplay.appendChild(card);
      });
    }

    renderProducts(products);

    // Category Filtering
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");

        const category = e.target.dataset.category;
        if (category === "all") {
          renderProducts(products);
        } else {
          const filtered = products.filter((p) => p.category === category);
          renderProducts(filtered);
        }
      });
    });
  }

  // Modal Functions
  window.openProductModal = function (id) {
    const product = products.find((p) => p.id === id);
    if (product && modal) {
      document.getElementById("modal-title").textContent = product.name;
      document.getElementById("modal-category").textContent = `Category: ${product.category}`;
      document.getElementById("modal-description").textContent = product.description;
      document.getElementById("modal-price").textContent = `Price: ${product.price}`;
      document.getElementById("modal-stock").textContent = product.inStock ? "Status: In Stock" : "Status: Out of Stock";
      modal.showModal();
    }
  };

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => modal.close());
  }

  // 4. Contact Form Handling
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("fullname").value;
      
      formFeedback.textContent = `Thank you, ${name}! Your inquiry has been submitted. We will contact you shortly.`;
      formFeedback.classList.remove("hidden");
      contactForm.reset();
    });
  }
});