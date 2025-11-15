const API = "http://localhost:3000";

async function fetchUsers() {
    const res = await fetch(`${API}/users`);
    const users = await res.json();

    const container = document.getElementById("users");
    container.innerHTML = "";

    users.forEach(u => {
        const card = document.createElement("div");
        card.className = "user-card";
        card.innerHTML = `<strong>ID:</strong> ${u.id} <br> <strong>Name:</strong> ${u.name}`;
        container.appendChild(card);
    });
}

async function addUser() {
    const name = document.getElementById("username").value;

    if (!name) {
        alert("Name cannot be empty!");
        return;
    }

    await fetch(`${API}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    });

    document.getElementById("username").value = "";
    fetchUsers(); // refresh list
}