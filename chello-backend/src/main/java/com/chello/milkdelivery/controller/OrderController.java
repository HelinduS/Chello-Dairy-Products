package com.example.demo.controller;

import com.example.demo.dto.DriverAssignmentDto;
import com.example.demo.dto.OrderStatusUpdateDto;
import com.example.demo.model.Order;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // GET /api/orders - Fetch all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // PATCH /api/orders/{orderId} - Update order status
    @PatchMapping("/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestBody OrderStatusUpdateDto statusUpdateDto) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (!optionalOrder.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Order order = optionalOrder.get();
        try {
            Order.Status newStatus = Order.Status.valueOf(statusUpdateDto.getStatus());
            order.setStatus(newStatus);
            orderRepository.save(order);
            return ResponseEntity.ok(order);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PATCH /api/orders/{orderId}/assign-driver - Assign driver to order
    @PatchMapping("/{orderId}/assign-driver")
    public ResponseEntity<Order> assignDriver(@PathVariable Long orderId, @RequestBody DriverAssignmentDto driverAssignmentDto) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (!optionalOrder.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Order order = optionalOrder.get();
        order.setDriverId(driverAssignmentDto.getDriverId());
        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }
}