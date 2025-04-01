package com.chello.milkdelivery.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
@Inheritance(strategy = InheritanceType.JOINED)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    protected Long id;

    private String customerName;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String driverId;

    private LocalDate orderDate;

    @Column(columnDefinition = "TEXT")
    private String items;

    private double total;

    private LocalDateTime deliveredDate; // New field for delivery time tracking

    public enum Status {
        Pending, Processing, Shipped, Delivered, Canceled
    }
}