function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
}

function switchForm() {
  document.getElementById('signin').classList.toggle('hidden');
  document.getElementById('signup').classList.toggle('hidden');
}

// ==========================
// ✅ REGISTER FUNCTION
// ==========================
function registerUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('signupPass').value;

  fetch('http://localhost:9090/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, password })
  })
    .then(res => {
      if (!res.ok) throw new Error("Registration failed");
      return res.json();
    })
    .then(() => {
      alert("Registration successful! Please login.");
      switchForm(); // switch to sign-in form
    })
    .catch(err => alert("Registration error: " + err.message));
}

// ==========================
// ✅ LOGIN FUNCTION
// ==========================
function loginUser() {
  const email = document.getElementById('loginIdentifier').value;
  const password = document.getElementById('signinPass').value;

  fetch('http://localhost:9090/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    })
    .then(user => {
      if (user.role === "Admin") {
        window.location.href = "Admin.html";
      } else if (user.role === "Student") {
        window.location.href = "Student.html";
      } else {
        alert("Unknown role: " + user.role);
      }
    })
    .catch(err => alert("Login failed: " + err.message));
}

// ==========================
// ✅ RESET PASSWORD FUNCTION
// ==========================
function resetPassword(event) {
  event.preventDefault();
  const email = document.querySelector('input[name=email]').value;

  // Step 1: Send forgot password request
  fetch('http://localhost:9090/api/auth/forgot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
    .then(res => {
      if (!res.ok) throw new Error("Email not registered");
      return res.text(); // token
    })
    .then(token => {
      const newPassword = prompt("Enter your new password:");
      if (!newPassword) {
        alert("Password reset cancelled.");
        return;
      }

      // Step 2: Reset password using token
      return fetch('http://localhost:9090/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: token, newPassword })
      });
    })
    .then(res => {
      if (!res.ok) throw new Error("Reset failed");
      return res.text();
    })
    .then(msg => alert(msg))
    .catch(err => alert("Error: " + err.message));
}
