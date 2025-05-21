
package com.chello.milkdelivery.service;

import com.chello.milkdelivery.dto.DeliveryUpdateRequest;
import com.chello.milkdelivery.model.CustomerProduct;
import com.chello.milkdelivery.model.Product;
import com.chello.milkdelivery.repository.CustomerProductRepository;
import com.chello.milkdelivery.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DeliveryService {

    private final CustomerProductRepository customerProductRepository;
    private final ProductRepository productRepository;

    public Map<String, Object> getDeliveries(String username) {
        // Fetch deliveries with exact deliveryDay match
        List<CustomerProduct> wednesdayDeliveries = customerProductRepository.findDeliveriesByDay(username, "Wednesday");
        List<CustomerProduct> sundayDeliveries = customerProductRepository.findDeliveriesByDay(username, "Sunday");

        // Filter out Wednesday,Sunday deliveries
        wednesdayDeliveries = wednesdayDeliveries.stream()
                .filter(cp -> cp.getDeliveryDay().equals("Wednesday"))
                .toList();
        sundayDeliveries = sundayDeliveries.stream()
                .filter(cp -> cp.getDeliveryDay().equals("Sunday"))
                .toList();

        // Split by payment status
        List<CustomerProduct> wednesdayPayed = wednesdayDeliveries.stream()
                .filter(cp -> "payed".equals(cp.getPaymentStatus()))
                .toList();
        List<CustomerProduct> wednesdayPending = wednesdayDeliveries.stream()
                .filter(cp -> "pending".equals(cp.getPaymentStatus()))
                .toList();
        List<CustomerProduct> sundayPayed = sundayDeliveries.stream()
                .filter(cp -> "payed".equals(cp.getPaymentStatus()))
                .toList();
        List<CustomerProduct> sundayPending = sundayDeliveries.stream()
                .filter(cp -> "pending".equals(cp.getPaymentStatus()))
                .toList();

        Map<String, Object> response = new HashMap<>();
        response.put("wednesdayPayed", processDeliveries(wednesdayPayed));
        response.put("wednesdayPending", processDeliveries(wednesdayPending));
        response.put("sundayPayed", processDeliveries(sundayPayed));
        response.put("sundayPending", processDeliveries(sundayPending));
        response.put("wednesdayPayedTotal", calculateTotal(wednesdayPayed));
        response.put("wednesdayPendingTotal", calculateTotal(wednesdayPending));
        response.put("sundayPayedTotal", calculateTotal(sundayPayed));
        response.put("sundayPendingTotal", calculateTotal(sundayPending));

        return response;
    }

    private List<Map<String, Object>> processDeliveries(List<CustomerProduct> deliveries) {
        Map<Long, Map<String, Object>> productMap = new HashMap<>();

        for (CustomerProduct cp : deliveries) {
            Product product = productRepository.findById(cp.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + cp.getProductId()));

            productMap.computeIfAbsent(cp.getProductId(), k -> {
                Map<String, Object> item = new HashMap<>();
                item.put("name", product.getName());
                item.put("image", product.getImage() != null ? product.getImage() : "/images/placeholder.jpg");
                item.put("quantity", 0);
                item.put("totalPrice", 0.0);
                return item;
            });

            Map<String, Object> item = productMap.get(cp.getProductId());
            item.put("quantity", (Integer) item.get("quantity") + cp.getQuantity());
            item.put("totalPrice", (Double) item.get("totalPrice") + cp.getAmount());
        }

        return new ArrayList<>(productMap.values());
    }

    public void updateDelivery(String username, DeliveryUpdateRequest request) {
        String deliveryDay = request.getDeliveryDay();
        if (deliveryDay == null || (!deliveryDay.equals("Wednesday") && !deliveryDay.equals("Sunday"))) {
            throw new IllegalArgumentException("Invalid delivery day: " + deliveryDay);
        }
        List<CustomerProduct> deliveries = customerProductRepository.findDeliveriesByDay(username, deliveryDay);
        if (deliveries.isEmpty()) {
            throw new IllegalArgumentException("No deliveries found for " + deliveryDay);
        }

        for (CustomerProduct cp : deliveries) {
            cp.setDeliveryMethod(request.getMethod());
            cp.setDeliveryAddress(request.getAddress());
            cp.setAvailability(request.getAvailability());
            customerProductRepository.save(cp);
        }
    }

    public void cancelDelivery(String username) {
        List<CustomerProduct> deliveries = customerProductRepository.findAllByUsername(username);
        for (CustomerProduct cp : deliveries) {
            cp.setCancelled(true);
            customerProductRepository.save(cp);
        }
    }

    private Double calculateTotal(List<CustomerProduct> deliveries) {
        return deliveries.stream()
                .mapToDouble(CustomerProduct::getAmount)
                .sum();
    }
}