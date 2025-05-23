const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get("category");

const container = document.getElementById("video-list");
const heading = document.getElementById("course-heading");

fetch("/Data/coursevideo.json")
  .then((response) => response.json())
  .then((courseVideos) => {
    if (categoryName && courseVideos[categoryName]) {
      heading.innerText = categoryName;
      const weeksOrModules = courseVideos[categoryName];
      Object.keys(weeksOrModules).forEach((week) => {
        const card = document.createElement("div");
        card.classList.add("week-card");
        const header = document.createElement("div");
        header.classList.add("week-header");
        header.innerText = week;
        const content = document.createElement("div");
        content.classList.add("week-content");
        // initially hidden
        content.style.display = "none";
        weeksOrModules[week].forEach((video) => {
          const videoDiv = document.createElement("div");
          videoDiv.classList.add("video-item");
          videoDiv.innerHTML = `
            <h3>${video.title}</h3>
            <iframe width="100%" height="315" src="${
              video.url
            }" frameborder="0" allowfullscreen></iframe>
            ${video.credits ? `<p><em>Credits: ${video.credits}</em></p>` : ""}
            ${
              video.instructor
                ? `<p><strong>Instructor:</strong> ${video.instructor}</p>`
                : ""
            }
            ${
              video.institution
                ? `<p><strong>Institution:</strong> ${video.institution}</p>`
                : ""
            }
            ${
              video.source
                ? `<p><strong>Source:</strong> ${video.source}</p>`
                : ""
            }
          `;
          content.appendChild(videoDiv);
        });
        // Open only one at a time
        header.addEventListener("click", () => {
          const allContents = document.querySelectorAll(".week-content");
          allContents.forEach((el) => {
            if (el !== content) el.style.display = "none";
          });
          // current content
          content.style.display =
            content.style.display === "block" ? "none" : "block";
        });
        card.appendChild(header);
        card.appendChild(content);
        container.appendChild(card);
      });
    } else {
      container.innerHTML = `<p>No videos found for this category.</p>`;
    }
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
    container.innerHTML = `<p>Failed to load course data.</p>`;
  });