
        package com.chello.milkdelivery.service;

import com.chello.milkdelivery.dto.CustomerProductRequest;
import com.chello.milkdelivery.model.CustomerProduct;
import com.chello.milkdelivery.model.Product;
import com.chello.milkdelivery.repository.CustomerProductRepository;
import com.chello.milkdelivery.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CustomerProductService {

    @Autowired
    private CustomerProductRepository customerProductRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public CustomerProduct createCustomerProduct(CustomerProductRequest request) {
        // Extract username from JWT token
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("User not authenticated");
        }

        // Validate product exists
        Optional<Product> productOpt = productRepository.findById(request.getProductId());
        if (!productOpt.isPresent()) {
            throw new IllegalArgumentException("Product not found");
        }

        Product product = productOpt.get();

        // Validate quantity
        if (request.getQuantity() <= 0 || request.getQuantity() > product.getStock()) {
            throw new IllegalArgumentException("Invalid quantity or insufficient stock");
        }

        // Validate delivery day
        String deliveryDay = request.getDeliveryDay();
        if (request.getDeliveryMethod() != null && request.getDeliveryMethod().equals("Delivery") && (deliveryDay == null || deliveryDay.isEmpty())) {
            throw new IllegalArgumentException("Delivery day is required for Delivery method");
        }

        // Split and validate delivery days if provided
        if (deliveryDay != null && !deliveryDay.isEmpty()) {
            Set<String> validDays = new HashSet<>(Arrays.asList("Wednesday", "Sunday"));
            Set<String> requestedDays = new HashSet<>(Arrays.asList(deliveryDay.split(",")));
            if (requestedDays.isEmpty() || !validDays.containsAll(requestedDays)) {
                throw new IllegalArgumentException("Delivery day must be Wednesday, Sunday, or both");
            }

            // Normalize deliveryDay
            if (requestedDays.size() == 2) {
                deliveryDay = "Wednesday,Sunday";
            } else if (!deliveryDay.equals("Wednesday") && !deliveryDay.equals("Sunday")) {
                throw new IllegalArgumentException("Delivery day must be Wednesday, Sunday, or both");
            }
        }

        // Validate payment status
        String paymentStatus = request.getPaymentStatus();
        if (paymentStatus == null || (!paymentStatus.equals("pending") && !paymentStatus.equals("payed"))) {
            throw new IllegalArgumentException("Payment status must be 'pending' or 'payed'");
        }

        // Deduct stock
        product.setStock(product.getStock() - request.getQuantity());
        productRepository.save(product);

        // Build CustomerProduct entity
        CustomerProduct customerProduct = CustomerProduct.builder()
                .username(username)
                .productId(request.getProductId())
                .quantity(request.getQuantity())
                .deliveryDay(deliveryDay)
                .amount(request.getAmount()) // Use request amount
                .createdAt(LocalDateTime.now())
                .deliveryMethod(request.getDeliveryMethod())
                .paymentStatus(paymentStatus)
                .build();

        // Save to database
        return customerProductRepository.save(customerProduct);
    }

    public List<Product> getCustomerFavoriteProducts() {
        // Extract username from JWT token
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("User not authenticated");
        }

        // Get distinct product IDs purchased by the user
        Set<Long> productIds = customerProductRepository.findDistinctProductIdsByUsername(username);
        if (productIds.isEmpty()) {
            return List.of(); // Return empty list if no favorites
        }

        // Fetch product details
        return productRepository.findAllById(productIds).stream()
                .map(product -> new Product(
                        product.getId(),
                        product.getName(),
                        product.getPrice(),
                        product.getImage(),
                        product.getStock()
                ))
                .collect(Collectors.toList());
    }
}