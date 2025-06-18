# 📚 Library Management System 

This is a **full-stack Library Management System** built using **Spring Boot (Java 17)** for the backend and **HTML, CSS, and JavaScript** for the frontend. It includes features for both **Admin** and **Student** roles, with secure authentication, book management, and email notifications.

---

📸 LibraryManagementSystem Project Demo

https://github.com/user-attachments/assets/518a5201-1ab7-4088-a072-48c4174ba612

---
🧑‍💻 Features



### 👨‍🏫 Admin Features
✅ Manage and track all student book requests
✅ Approve or reject issued books
✅ Update book availability status
✅ Role-based access (Admin dashboard)

### 👩‍🎓 Student Features
✅ Search and view available books
✅ Track issued books and return status
✅ Role-based access (Student dashboard)

### 🔐 Authentication & Security
✅ User Registration and Login with JWT authentication
✅ Password Reset via Email OTP
✅ Role-based Dashboard Redirection (Admin / Student)
✅ Secured endpoints using Spring Security

---

🖼️ Screenshots

**LibraryManagementSystem**

**SignUp Page**

![Screenshot 2025-06-18 213214](https://github.com/user-attachments/assets/8af753dc-bd97-47ad-ac2b-b559f5920b81)

**Signin Page**

![Screenshot 2025-06-18 212804](https://github.com/user-attachments/assets/8c7073c9-30ca-4e66-ad45-54b9bd1359a3)


**Password Reset Page**

![Screenshot 2025-06-18 212820](https://github.com/user-attachments/assets/a04d285b-cbcd-4e94-a49d-6c4ef1abc6d4)

**Admin Dashboard**

![Screenshot 2025-06-18 212836](https://github.com/user-attachments/assets/fa5c42e6-c3b8-4df7-8096-9f1eb1a2e81a)

**Student Dashboard**

![Screenshot 2025-06-18 212853](https://github.com/user-attachments/assets/84529ec1-664b-40d4-ac8d-159448835860)

---
🛠️ Tech Stack

### 🖥️ Frontend
- HTML5  
- CSS3 (Separate styles for Admin, Student, Forgot Password, Login/Register)
- JavaScript (Dynamic routing, UI toggles, search/filter)

### ⚙️ Backend
- Spring Boot (Java 17)  
- Spring Security  
- Spring Data JPA  
- JWT Authentication  
- MySQL Database  
- JavaMailSender (for email)

---

## 🗄️ Database Schema

- **Database:** `librarydb`
- **Tables:**
  - `users` (id, name, email, phone, password, role)
  - `books` (id, name, author, availability)
  - `issued_books` (id, user_id, book_id, issue_date, due_date, returned)

> Auto-increment IDs and foreign key constraints applied.

---
## 📁 Folder Structure

LibraryManagementSystem/
├── src/
│ ├── main/
│ │ ├── java/com/SpringBoot/LibraryManagementSystem/
│ │ │ ├── AuthController.java # Handles registration/login/reset
│ │ │ ├── AdminController.java # Admin-side book APIs
│ │ │ ├── StudentController.java # Student-side book APIs
│ │ │ ├── EmailService.java # Sends email OTPs
│ │ │ ├── UserService.java # Business logic for users
│ │ │ ├── UserRepository.java # Repository for users
│ │ │ ├── SecurityBeans.java # JWT Filter & Encoder Beans
│ │ │ ├── SecurityConfig.java # Spring Security Configuration
│ │ │ ├── User.java # User entity
│ │ │ └── LibraryManagementSystemApplication.java
│ │ └── resources/
│ │ ├── static/
│ │ │ ├── Admin.html, Admin.css, Admin.js
│ │ │ ├── Student.html, Student.css, Student.js
│ │ │ ├── index.html, index.css, script.js
│ │ │ ├── forgot.html, forgot.css
│ │ │ └── images/
│ │ ├── application.properties # DB & SMTP config
├── pom.xml # Maven project file
├── README.md # Project documentation
