package com.SpringBoot.LibraryManagementSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(userService.login(body.get("email"), body.get("password")));
    }

    @PostMapping("/forgot")
    public ResponseEntity<String> forgot(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(userService.forgotPassword(body.get("email")));
    }

    @PostMapping("/reset")
    public ResponseEntity<String> reset(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(userService.resetPassword(body.get("identifier"), body.get("newPassword")));
    }
}
