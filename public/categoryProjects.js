function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const category = getQueryParam("category");

fetch(
  `https://full-stack-plumbing-ecomerce.vercel.app/items?category=${encodeURIComponent(
    category
  )}`
)
  .then((res) => res.json())
  .then((data) => {
    displayItems(data);
  })
  .catch((error) => {
    console.error("Error fetching items:", error);
    document.getElementById("itemByCategory").textContent =
      "Failed to load items.";
  });

function displayItems(products) {
  const items = document.getElementById("itemByCategory");
  items.innerHTML = ""; // Clear old items first

  console.log(products);

  if (!Array.isArray(products) || products.length === 0) {
    items.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach((product) => {
    const item = document.createElement("div");
    item.className = "product";
    item.dataset.id = product._id;

    item.innerHTML = `
      
          ${
            product.image
              ? `<img src="${product.image}" alt="${product.name}" width="200"/>`
              : ""
          }
          <h1>${product.name}</h1>
          <h3><span style="font-style: italic;">Price: </span> $${
            product.price
          }</h3>
          <h3><span style="font-style: italic;">Description: </span><br>${
            product.description
          }</h3>
        `;

    item.addEventListener("click", (event) => {
      const clickedId = event.currentTarget.dataset.id;
      console.log("Clicked product ID:", clickedId);

      // Redirect to another page (e.g. productDetails.html?id=...)
      window.location.href = `/item.html?id=${clickedId}`;
    });
    items.appendChild(item);
  });
}
