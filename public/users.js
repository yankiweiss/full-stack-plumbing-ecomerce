function displayUsersData() {
  fetch("https://full-stack-plumbing-ecomerce.vercel.app/users")
    .then((res) => res.json())
    .then((data) => {
      displayUsers(data);
    });
}

function displayUsers(users) {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = ""; // Clear old items first

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.className = "tr";

    row.innerHTML = `
        
        
        
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>01/22/1999</td>
      
    `;
    tbody.appendChild(row);
  });
}

displayUsersData();
