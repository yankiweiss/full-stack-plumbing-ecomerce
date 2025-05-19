function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const id = getQueryParam("id");

if (!id) {
  console.error("No ID provided in query string");
  document.getElementById("items").textContent = "Invalid item ID.";
} else {
  fetch(
    `https://full-stack-plumbing-ecomerce.vercel.app/items/${encodeURIComponent(
      id
    )}`
  )
    .then((res) => res.json())
    .then((data) => {
      displayItem(data);

    })
    .catch((error) => {
      console.error("Error fetching items:", error);
      document.getElementById("items").textContent = "Failed to load items.";
    });
}

const item = document.getElementById("items");

function displayItem(data) {
  const div = document.createElement("div");
  div.className = 'item'

  div.innerHTML = ` 
    ${data.image ? `<img src="${data.image}" alt="${data.name}" width="200" />` : ""}
  
          <h1>${data.name}</h1>
          <h3><span style="font-style: italic;">Price: </span> $${
            data.price
          }</h3>
          <h3><span style="font-style: italic;">Description: </span><br>${
            data.description
          }</h3>
        `;

  item.appendChild(div);
}
