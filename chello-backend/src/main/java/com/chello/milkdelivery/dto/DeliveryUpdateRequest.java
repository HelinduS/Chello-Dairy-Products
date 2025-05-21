package com.chello.milkdelivery.dto;

public class DeliveryUpdateRequest {
    private String method; // "delivery" or "pickup"
    private String address;
    private String availability; // date-time or time range
    private String deliveryDay; // e.g., "Wednesday", "Sunday"
    
    public String getMethod() {
        return method;  
    }

    public String getAddress() {
        return address;
    }

    public String getAvailability() {
        return availability;
    }

    public String getDeliveryDay() {
        return deliveryDay;
    }
}