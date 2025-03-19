package com.amri.login2.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    private String email;
    private LocalDateTime expiration;

    // Default constructor for JPA
    public RefreshToken() {}

    // Custom constructor for UserService.login
    public RefreshToken(String token, String email, LocalDateTime expiration) {
        this.token = token;
        this.email = email;
        this.expiration = expiration;
    }
}