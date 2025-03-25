package com.chello.milkdelivery.controller;

import com.chello.milkdelivery.model.User;
import com.chello.milkdelivery.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserProfileController {
    @Autowired
    private UserService userService;

    @PutMapping("/editProfile")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return ResponseEntity.ok(userService.updateUser(id, updatedUser));

}
