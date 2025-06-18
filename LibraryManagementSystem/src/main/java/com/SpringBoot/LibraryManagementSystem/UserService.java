package com.SpringBoot.LibraryManagementSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder; // ✅ Uses Spring Security configuration

    // ✅ Registers a user with encrypted password and default role as Student
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("Student");
        return userRepo.save(user);
    }

    // ✅ Uses Spring's configured encoder for login verification
    public User login(String email, String password) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        throw new BadCredentialsException("Invalid credentials");
    }

    // ✅ Generates reset token and sends email
    public String forgotPassword(String email) {
        Optional<User> optionalUser = userRepo.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            String token = UUID.randomUUID().toString();
            user.setResetToken(token);
            userRepo.save(user);
            emailService.sendResetEmail(email, token);
            return token;
        }
        throw new IllegalArgumentException("Email not registered");
    }

    // ✅ Resets password using reset token
    public String resetPassword(String token, String newPassword) {
        Optional<User> optionalUser = userRepo.findByResetToken(token);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null);
            userRepo.save(user);
            return "Password reset successful";
        }
        throw new IllegalArgumentException("Invalid or expired token");
    }
}
