function getCsrfToken() {
  const name = 'csrftoken';
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }

  return null;
}

document.getElementById("login-form").addEventListener("submit", async function(e) {
  e.preventDefault();
  const login = document.getElementById("login").value.trim();
  const password = document.getElementById("password").value.trim();

  const response = await fetch('http://127.0.0.1:8080/api/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCsrfToken(), // Для Django CSRF защиты
    },
    credentials: 'include', // Важно для cookies!
    body: JSON.stringify({ login, password })
  });

  const result = await response.json();

  if (result.ok) {
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error-modal").classList.remove("hidden");
  }
  });

  function closeModal() {
  document.getElementById("error-modal").classList.add("hidden");
  };