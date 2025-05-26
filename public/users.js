function displayUsersData() {
  fetch("http://localhost:3500/users")
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
    `;
    tbody.appendChild(row);
  });
}

displayUsersData();
