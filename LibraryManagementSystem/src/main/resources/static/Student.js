// Show only the selected section
function showSection(id) {
  document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Load New Books
function loadNewBooks() {
  showSection('newBooks');
  fetch('/api/books/available') // Your backend endpoint
    .then(res => res.json())
    .then(books => {
      const container = document.getElementById('newBooks');
      container.innerHTML = '<h2>Available Books</h2>';
      books.forEach(book => {
        container.innerHTML += `
          <div class="book-card">
            <div class="book-info">
              <h3>${book.name}</h3>
              <p>Author: ${book.author}</p>
            </div>
            <div class="book-status available">Available</div>
          </div>
        `;
      });
    })
    .catch(err => console.error("Failed to load books", err));
}

// Load Track Books (Student's issued books)
function loadTrackBooks() {
  showSection('trackBooks');
  const studentId = localStorage.getItem("userId"); // Set this on login
  fetch(`/api/books/student/${studentId}`)
    .then(res => res.json())
    .then(books => {
      const container = document.getElementById('trackBooks');
      container.innerHTML = '<h2>Your Issued Books</h2>';
      books.forEach(book => {
        const statusClass = book.returned ? 'available' : 'not-available';
        const statusText = book.returned ? 'Returned' : 'Borrowed';
        container.innerHTML += `
          <div class="book-card">
            <div class="book-info">
              <h3>${book.bookName}</h3>
              <p>Issued On: ${book.issuedDate}</p>
              <p>Due: ${book.dueDate}</p>
            </div>
            <div class="book-status ${statusClass}">${statusText}</div>
          </div>
        `;
      });
    })
    .catch(err => console.error("Failed to load tracking info", err));
}

// Search Books
function searchBooks() {
  const keyword = document.getElementById("searchInput").value;
  if (!keyword.trim()) return;

  showSection('searchResult');
  fetch(`/api/books/search?query=${encodeURIComponent(keyword)}`)
    .then(res => res.json())
    .then(books => {
      const container = document.getElementById('searchResult');
      container.innerHTML = `<h2>Search Results for "${keyword}"</h2>`;
      if (books.length === 0) {
        container.innerHTML += "<p>No books found.</p>";
      } else {
        books.forEach(book => {
          const statusClass = book.available ? 'available' : 'not-available';
          const statusText = book.available ? 'Available' : 'Not Available';
          container.innerHTML += `
            <div class="book-card">
              <div class="book-info">
                <h3>${book.name}</h3>
                <p>Author: ${book.author}</p>
              </div>
              <div class="book-status ${statusClass}">${statusText}</div>
            </div>
          `;
        });
      }
    })
    .catch(err => console.error("Search failed", err));
}

// ✅ LOGOUT FUNCTION
function logout() {
  localStorage.clear(); // Clear stored user info
  window.location.href = "signin.html"; // Redirect to login
}
