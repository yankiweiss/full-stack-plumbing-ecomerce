//const displayItemsData = async () => {
//  await fetch("http://localhost:3500/items")
//    .then((res) => res.json())
//    .then((data) => {
//      displayItems(data);
//
//    });
//}
//
//function displayItems(products) {
//  const items = document.getElementById("items");
//  items.innerHTML = ""; // Clear old items first
//
//  if (!Array.isArray(products) || products.length === 0) {
//        console.log('No Products were found');
//        categories.innerHTML = '<p>No categories available.</p>'; // Optional message in UI
//        return;
//    }
//
//
//  products.forEach((product) => {
//    const item = document.createElement("div");
//    item.className = "product";
//
//    item.innerHTML = `
//     ${product.image ? `<img src="${product.image}" alt="${product.name}" width="200"/>` : ''}
//      <h1> ${product.name}</h1>
//      <h3><span style="font-style: italic;">Price: </span> $${product.price}</h3>
//      <h3><span style="font-style: italic;">Description: </span><br>${product.description}</h3>
//    `;
//
//    items.appendChild(item);
//  });
//}
//
//displayItemsData()

function displayData() {
  fetch("https://full-stack-plumbing-ecomerce.vercel.app/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data);
    });
}

function displayCategories(categories) {
  const containers = document.querySelectorAll(
    "#firstCategory, #secondCategory"
  );

  if (!Array.isArray(categories) || categories.length === 0) {
    console.log("No categories were found");
    containers.forEach((container) => {
      container.innerHTML = "<p>No categories available.</p>";
    });
    return;
  }

  containers.forEach((container) => {
    container.innerHTML = ""; // Optional: clear previous content
    categories.forEach((category) => {
      const item = document.createElement("div");
      item.className = "category";
      item.innerHTML = `
      ${
        category.image
          ? `<img src="${category.image}" alt="${category.name}" width="200"/>`
          : ""
      }
      <h1>${category.category}</h1>
      `;
      item.addEventListener("click", () => {
        redirectToOtherPage(category.category);
      });
      container.appendChild(item);
    });
  });
}

displayData();

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function redirectToOtherPage(categoryName) {
  window.location.href = `categoryProducts.html?category=${encodeURIComponent(
    categoryName
  )}`;
  console.log(categoryName)
}
