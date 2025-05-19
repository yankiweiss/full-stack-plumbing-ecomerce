//const categories = document.getElementById('categories');
//
//
//function getAllCategories() {
//    fetch('http://localhost:3500/category')
//        .then((res) => res.json())
//        .then((data) => {
//            displayCategories(data)
//        })
//}
//
//function displayCategories(allCategories) {
//
//     if (!Array.isArray(allCategories) || allCategories.length === 0) {
//        console.log('No categories were found');
//        categories.innerHTML = '<p>No categories available.</p>'; // Optional message in UI
//        return;
//    }
//    categories.innerHTML = ''; 
//    console.log(allCategories)
//    allCategories.forEach(category => {
//        const div = document.createElement('div');
//        div.className = 'box'
//
//        div.innerHTML = `
//        <h1>${category.category}</h1>
//        <h3>${category.items}</h3>
//
//        `
//        categories.appendChild(div)
//    });
//}
//
//getAllCategories()
//
//
//






console.log(categories)

function displayItemsData () {
    fetch("http://localhost:3500/items")
        .then((res) => res.json())
        .then((data) => {
            displayItems(data);
        });
}

function displayItems(products) {
    const allProducts = document.getElementById("categories");
    allProducts.innerHTML = ""; // Clear old items first

    products.forEach((product) => {
        const item = document.createElement("div");
        item.className = "item";

        item.innerHTML = `
        <div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">Product Name:</span>
   <input type="text" class="form-control" id="name-input"  value="${product.name
            }" />
</div>

<div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">Price</span>
   <input type="number" class="form-control" value="${product.price
            }" id="price-input" />
</div>


   <div> ${product.image
                ? `<img loading="lazy" src="${product.image}" alt="${product.name}" style="width: 300px; margin: auto; display: block"/>`
                : ""
            }</div>




    <textarea class="form-control" id="description-input" rows="6">${product.description
            }</textarea>




            <button class="save-button">Save</button>
        `;


        const saveBtn = item.querySelector(".save-button");

        saveBtn.addEventListener("click", () => {
            const updatedProduct = {
                _id: product._id,
                name: item.querySelector("#name-input").value,
                price: parseFloat(item.querySelector("#price-input").value),
                description: item.querySelector("#description-input").value,
                image: product.image,
            };
            console.log("Sending updatedProduct:", updatedProduct);

            fetch(`http://localhost:3500/items/${product._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json().catch(() => null); // Gracefully handle no JSON
                })
                .then((response) => {
                    alert("Product updated successfully!");
                })
                .catch((err) => {
                    console.error("Update failed", err);
                    alert("Error updating product.");
                });
        });
        allProducts.appendChild(item);
    });
}

displayItemsData();
