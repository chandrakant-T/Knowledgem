window.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn =
    localStorage.getItem("user") || sessionStorage.getItem("user");

  if (!isLoggedIn) {
    alert("You must be logged in to access the quiz.");
    window.location.href = "../Html/login.html";
  }

  const user = JSON.parse(isLoggedIn);
  const username = document.getElementById("username");
  const userdisplay = document.getElementById("userNameDisplay");
  const Email = document.getElementById("userEmail");

  username.innerText = user.name;
  userdisplay.innerText = user.name;
  Email.innerText = user.email;

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

  const catbtns = document.getElementsByClassName("showmorebtn");
  Array.from(catbtns).forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      window.location.href = `../Html/Quizes.html?category=${encodeURIComponent(
        category
      )}`;
    });
  });
});
