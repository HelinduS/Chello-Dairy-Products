package com.chello.milkdelivery.repository;

import com.chello.milkdelivery.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByOrderDateBetween(LocalDate startDate, LocalDate endDate);
}