

const category = document.getElementById("category");
const items = document.getElementById("items");
const submit = document.querySelector(".submit");

function addCategory() {
  const categoryValue = category.value;
  const itemsValue = items.value;
  fetch("http://localhost:3500/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: categoryValue,
      items: itemsValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("POST response", data);
    })
    .catch((error) => {
      console.error("Error during POST:", error);
    });
}

submit.addEventListener("click", addCategory);


// show all users

const users = document.getElementById('users')

function showUsers (){

}


