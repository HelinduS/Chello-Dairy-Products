package com.amri.login2.service;

import com.amri.login2.model.BlacklistedToken;
import com.amri.login2.model.RefreshToken;
import com.amri.login2.model.Users;
import com.amri.login2.repository.BlacklistedTokenRepository;
import com.amri.login2.repository.RefreshTokenRepository;
import com.amri.login2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private RefreshTokenRepository refreshTokenRepository;
    @Autowired private BlacklistedTokenRepository blacklistedTokenRepository;
    @Autowired private JWTService jwtService;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private BCryptPasswordEncoder passwordEncoder;

    @Transactional
    public Users register(Users user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already registered: " + user.getEmail());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Transactional
    public Map<String, String> login(Users user) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );
        if (auth.isAuthenticated()) {
            String accessToken = jwtService.generateAccessToken(user.getEmail());
            String refreshToken = jwtService.generateRefreshToken(user.getEmail());
            LocalDateTime refreshExpiration = LocalDateTime.now().plusDays(7);
            refreshTokenRepository.save(new RefreshToken(refreshToken, user.getEmail(), refreshExpiration));
            Map<String, String> tokens = new HashMap<>();
            tokens.put("accessToken", accessToken);
            tokens.put("refreshToken", refreshToken);
            return tokens;
        }
        throw new RuntimeException("Authentication failed");
    }

    @Transactional
    public void logout(String email, String accessToken) {
        System.out.println("Logout for: " + email);
        Users user = userRepository.findByEmail(email);
        if (user != null) {
            try {
                LocalDateTime expiration = LocalDateTime.ofInstant(
                        jwtService.extractExpiration(accessToken).toInstant(), ZoneId.systemDefault()
                );
                if (expiration.isAfter(LocalDateTime.now())) {
                    blacklistedTokenRepository.save(new BlacklistedToken(accessToken, expiration));
                    System.out.println("Access token blacklisted: " + accessToken);
                }
                refreshTokenRepository.deleteByEmail(email);
                System.out.println("Refresh tokens deleted for: " + email);
            } catch (Exception e) {
                System.out.println("Logout error: " + e.getMessage());
                throw new RuntimeException("Logout failed: " + e.getMessage(), e);
            }
        }
    }
}