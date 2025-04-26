package com.chello.milkdelivery.controller;

import com.chello.milkdelivery.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerDeliveryController {

    private final DeliveryService deliveryService;

    @GetMapping("/deliveries")
    public Map<String, Object> getDeliveries() {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        return deliveryService.getDeliveries(username);
    }
}