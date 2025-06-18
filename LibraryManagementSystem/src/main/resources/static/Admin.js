function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function toggleTrackSection(option) {
  showSection('track-students');
  toggleStudentSection(option);
}

function toggleStudentSection(option) {
  document.getElementById('student-table').style.display = option === 'table' ? 'block' : 'none';
  document.getElementById('approve-form').style.display = option === 'approve' ? 'block' : 'none';
}

function changeStatus(button, status) {
  const card = button.closest('.book-card');
  const span = card.querySelector('.status');
  if (status === 'available') {
    span.className = 'status available';
    span.textContent = 'Available';
  } else {
    span.className = 'status not-available';
    span.textContent = 'Not Available';
  }
}

// ✅ LOGOUT FUNCTION
function logout() {
  localStorage.clear(); // Clear stored user info
  window.location.href = "signin.html"; // Redirect to login
}
