document.getElementById("resetForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const newPassword = document.getElementById("newPassword").value;

  // Validate password
  if (
    newPassword.length < 8 ||
    !/[0-9]/.test(newPassword) ||
    !/[!@#$%^&*]/.test(newPassword)
  ) {
    document.getElementById("message").innerText =
      "Weak password. Include number & special character.";
    document.getElementById("message").style.color = "red";
    return;
  }

  // Extract token from URL
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (!token) {
    document.getElementById("message").innerText = "Invalid or missing token.";
    document.getElementById("message").style.color = "red";
    return;
  }

  try {
    const res = await fetch(
      `https://knowledgem.onrender.com/api/auth/reset-password/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: newPassword }),
      }
    );

    const data = await res.json();
    document.getElementById("message").innerText = data.message;

    if (res.ok) {
      document.getElementById("message").style.color = "green";
      alert("Password has been reset successfully.");
      window.location.href = "../Html/login.html";
    } else {
      document.getElementById("message").style.color = "red";
    }
  } catch (error) {
    document.getElementById("message").innerText = "Server error. Try again.";
    document.getElementById("message").style.color = "red";
  }
});
