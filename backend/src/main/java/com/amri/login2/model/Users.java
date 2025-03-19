package com.amri.login2.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "address", nullable = false)
    private String address
            ;
    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "phone_number")
    private String phone;

    @Column(nullable = false)
    private String password;
}