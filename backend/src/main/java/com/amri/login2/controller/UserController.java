package com.amri.login2.controller;

import com.amri.login2.model.Users;
import com.amri.login2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:5175")
    @PostMapping("/register")
    public Users register(@RequestBody Users user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Users user) {
        return ResponseEntity.ok(userService.login(user));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader,
                                         @RequestBody Users user) {
        String token = authHeader.substring(7);
        userService.logout(user.getEmail(), token);
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/dashboard")
    public ResponseEntity<String> dashboard() {
        return ResponseEntity.ok("Welcome to the dashboard!");
    }
}