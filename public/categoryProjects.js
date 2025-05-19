console.log("hi and hello") 
 
 function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }

    const category = getQueryParam("category");

    fetch(`https://full-stack-plumbing-ecomerce.vercel.app?category=${encodeURIComponent(category)}`)
      .then(res => res.json())
      .then(data => {
        displayItems(data);
      })
      .catch(error => {
        console.error("Error fetching items:", error);
        document.getElementById("items").textContent = "Failed to load items.";
      });

    function displayItems(products) {
      const items = document.getElementById("items");
      items.innerHTML = ""; // Clear old items first

      if (!Array.isArray(products) || products.length === 0) {
        items.innerHTML = "<p>No products found.</p>";
        return;
      }

      products.forEach((product) => {
        const item = document.createElement("div");
        item.className = "product";

        item.innerHTML = `
          ${product.image ? `<img src="${product.image}" alt="${product.name}" width="200"/>` : ''}
          <h1>${product.name}</h1>
          <h3><span style="font-style: italic;">Price: </span> $${product.price}</h3>
          <h3><span style="font-style: italic;">Description: </span><br>${product.description}</h3>
        `;

        items.appendChild(item);
      });
    }