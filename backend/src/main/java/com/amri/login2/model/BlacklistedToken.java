package com.amri.login2.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class BlacklistedToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    private LocalDateTime expiration;

    // Default constructor for JPA
    public BlacklistedToken() {}

    // Custom constructor for UserService.logout
    public BlacklistedToken(String token, LocalDateTime expiration) {
        this.token = token;
        this.expiration = expiration;
    }
}