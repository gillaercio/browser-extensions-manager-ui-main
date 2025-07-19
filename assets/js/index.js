let allExtensions = [];
let currentFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("extensions-container");
  const filterButtons = document.querySelectorAll(".filter-tab button");

  fetch("assets/data/data.json")
    .then(response => response.json())
    .then(data => {
      allExtensions = data;
      renderExtensions(allExtensions);
    })
    .catch(error => {
      console.error("Error loading JSON:", error);
      container.innerHTML = "<p style='color: white;'>Error loading extensions.</p>";
    });

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.setAttribute("aria-selected", "false"));
      button.setAttribute("aria-selected", "true");

      currentFilter = button.dataset.filter;
      renderExtensions(applyFilter(allExtensions, currentFilter));
    });
  });

  function applyFilter(datas, filter) {
    if (filter === "active") return datas.filter(dat => dat.isActive);
    if (filter === "inactive") return datas.filter(dat => !dat.isActive);
    return datas;
  }

  function renderExtensions(datas) {
    container.innerHTML = "";

    datas.forEach(data => {
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
            <input type="checkbox" ${data.isActive ? "checked" : ""}
            data-name="${data.name}" />
            <span class="slider"></span>
          </label>
        </div>
        `;
        container.appendChild(card);
      });

      container.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.addEventListener("change", (e) => {
          const name = e.target.dataset.name;
          const updatedStatus = e.target.checked;

          const dat = allExtensions.find(dat => dat.name === name);
          if (dat) {
            dat.isActive = updatedStatus;

            if (currentFilter !== "all") {
              renderExtensions(applyFilter(allExtensions, currentFilter));
            }
          }
        });
      });
  }
});

document.querySelector(".theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const icon = document.querySelector(".theme-toggle img");
  const isLight = document.body.classList.contains("light-theme");
  const logo = document.querySelector(".top-logo");
  icon.src = isLight ? "assets/images/icon-moon.svg" : "assets/images/icon-sun.svg";
  icon.alt = isLight ? "Icon moon" : "Icon sun";
  logo.src = isLight ? "assets/images/logo.svg" : "assets/images/logo-extensions-white.svg";
  logo.alt = isLight ? "Logo Extensions Light Theme" : "Logo Extensions Dark Theme";
});