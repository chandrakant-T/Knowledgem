document.addEventListener("DOMContentLoaded", () => {
  // Check if a token exists in localStorage or sessionStorage
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (token) {
    // Check for user
    const userData =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (userData) {
      const user = JSON.parse(userData);

      // Redirect to dashboard if user is logged in
      window.location.href = "../Html/dashboard.html";
    }
  }

  // Menu toggle for mobile
  const btn = document.getElementById("menubtn");
  const navigation = document.getElementById("menu");

  if (btn && navigation) {
    btn.addEventListener("click", () => {
      navigation.style.display =
        navigation.style.display === "block" ? "none" : "block";
    });
  }

  // Category page functionality
  const catbtns = document.getElementsByClassName("showmorebtn");
  Array.from(catbtns).forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      window.location.href = `../Html/coursevideo.html?category=${encodeURIComponent(
        category
      )}`;
    });
  });

  // Forgot password form submission
  const forgotForm = document.getElementById("forgotForm");
  if (forgotForm) {
    forgotForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      document.getElementById("forgot-success").style.display = "none";
      const email = document.getElementById("forgot-email").value.trim();

      if (!email) {
        alert("Please enter your email.");
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:3000/api/auth/forgot-password",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );
        const data = await res.json();

        if (res.ok) {
          alert("Reset link sent! Check your email (including spam).");
          document.getElementById("forgot-success").style.display = "block";
          document.getElementById("forgot-success").innerText =
            "Reset link sent to your email";
          setTimeout(() => showForm("login"), 2000);
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error("❌ Error:", err);
        alert("Something went wrong. Try again later.");
      }
    });
  }

  // Form submission for login
  document.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value.trim();
    const rememberMe = document.getElementById("remember").checked;

    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", data.token);
      storage.setItem("user", JSON.stringify(data.user));
      alert("Login successful!");
      window.location.href = "../Html/dashboard.html";
    } else {
      alert(data.message);
    }
  });

  // Form submission for registration
  document
    .querySelector("#registerForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.querySelector("#register-name").value;
      const email = document.querySelector("#register-email").value;
      const password = document.querySelector("#register-password").value;
      const confirmPassword = document.querySelector(
        "#register-confirm-password"
      ).value;

      if (
        password.length < 8 ||
        !/[0-9]/.test(password) ||
        !/[!@#$%^&*]/.test(password)
      ) {
        alert("Weak password");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registration successful! Please login.");
        showForm("login");
      } else {
        alert(data.message);
      }
    });
});

// Show active form
function showForm(formType) {
  document.querySelectorAll(".form-container").forEach((form) => {
    form.classList.remove("active");
  });
  document.getElementById(formType + "-form").classList.add("active");

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    if (tab.textContent.toLowerCase().includes(formType)) {
      tab.classList.add("active");
    }
  });
}