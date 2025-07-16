document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("extensions-container");

  fetch("assets/data/data.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(data => {
        const card = document.createElement("article");
        card.className = "extension-card";

        card.innerHTML = `
          <div class="extension-header">
            <div class="extension-icon" style="background-image: url('${data.logo}');"></div>
            <div class="extension-description">
              <h2 class="extension-title">${data.name}</h2>
              <p class="extension-body">${data.description}</p>
            </div>
          </div>
          <div class="extension-actions">
            <button class="remove-button">Remove</button>
            <label class="switch">
              <input type="checkbox" ${data.isActive ? "checked" : ""} />
              <span class="slider"></span>
            </label>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error loading JSON:", error);
      container.innerHTML = "<p style='color: white;'>Error loading extensions.</p>";
    });
})