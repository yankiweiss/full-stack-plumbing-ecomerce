function displayData() {
  fetch("https://full-stack-plumbing-ecomerce.vercel.app/categories")
    .then((res) => res.json())
    .then((data) => {

      displayCategories(data);
    });
}

function displayCategories(categories) {
  const container = document.querySelector("#secondCategory");





  categories.forEach((category) => {
    const item = document.createElement("div");
    item.className = "category";
    item.innerHTML = `
      ${category.image
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
}


displayData();

function redirectToOtherPage(categoryName) {
  window.location.href = `categoryProducts.html?category=${encodeURIComponent(
    categoryName
  )}`;
}

const searchBar = document.getElementById("search");

searchBar.addEventListener("input", searchItems);

function searchItems(e) {
  const query = e.target.value;
  
  console.log(query)
  fetch(
    `https://full-stack-plumbing-ecomerce.vercel.app/items/search/${encodeURIComponent(
      query
    )}`
  ).then((response) => response.json()).then((data) => console.log(data))
}

searchBar.value = ''

