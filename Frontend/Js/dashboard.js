document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
    window.location.href = "../Html/login.html";
  }
  const userData =
    localStorage.getItem("user") || sessionStorage.getItem("user");

  if (userData) {
    const user = JSON.parse(userData);

    // Display user info
    document.getElementById("username").innerText = user.name;
    document.getElementById("userNameDisplay").innerText = user.name;
    document.getElementById("userEmail").innerText = user.email;
    const btn = document.getElementById("menubtn");
    const navigation = document.getElementById("menu");

    if (btn && navigation) {
      btn.addEventListener("click", () => {
        navigation.style.display =
          navigation.style.display === "block" ? "none" : "block";
      });
    }

    const userprofiles = document.getElementById("userprofile");
    const details = document.getElementById("userDetails");

    if (userprofiles && details) {
      // Show details when userprofiles is clicked
      userprofiles.addEventListener("click", (e) => {
        // Prevent click from bubbling to window
        e.stopPropagation();
        userprofiles.classList.add("hidden");
        details.classList.remove("hidden");
      });

      // Hide details when clicking outside it
      window.addEventListener("click", (e) => {
        if (!details.contains(e.target)) {
          details.classList.add("hidden");
          userprofiles.classList.remove("hidden");
        }
      });

      // hide details when mouse leaves the details div
      details.addEventListener("mouseleave", () => {
        details.classList.add("hidden");
        userprofiles.classList.remove("hidden");
      });

      // Prevent window click when clicking inside details
      details.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    // Logout button functionality
    document.getElementById("logoutbtn").addEventListener("click", function () {
      localStorage.clear();
      sessionStorage.clear();
      // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });

    // for category lectures display
    const catbtns = document.getElementsByClassName("showmorebtn");
    Array.from(catbtns).forEach((btn) => {
      btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");
        window.location.href = `../Html/coursevideo.html?category=${encodeURIComponent(
          category
        )}`;
      });
    });
  } else {
    alert("You are not logged in. Redirecting to login page...");
    window.location.href = "../Html/login.html";
  }
});