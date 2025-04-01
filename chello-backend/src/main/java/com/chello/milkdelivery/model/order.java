package com.chello.milkdelivery.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders)
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

        @ElementCollection
        private List<String> items;

        private double total;

        public enum Status {
        Pending, Processing, Shipped, Delivered, Canceled
        }

        public Order() {}

        public Order(String customerName, Status status, String driverId, LocalDate orderDate, List<String> items, double total) {
           this.customerName = customerName;
           this.status = status;
           this.driverId = driverId;
           this.orderDate = orderDate;
           this.items = items;
           this.total = total;
        }

        public Long getId() {
            return id;
        }
        public void setId(Long id) {
            this.id = id;
        }

        public String getCustomerName() {
            return customerName;
        }

        public void setCustomerName(String customerName) {
            this.customerName = customerName;
        }

        public Status getStatus() {
            return status;
        }

        public void setStatus(Status status) {
            this.status = status;
        }

        public String getDriverId() {
            return driverId;
        }

        public void setDriverId(String driverId) {
            this.driverId = driverId;
        }

        public LocalDate getOrderDate() {
            return orderDate;
        }

        public void setOrderDate(LocalDate orderDate) {
            this.orderDate = orderDate;
        }

        public List<String> getItems() {
            return items;
        }

        public void setItems(List<String> items) {
            this.items = items;
        }

        public double getTotal() {
            return total;
        }

        public void setTotal(double total) {
            this.total = total;
        }


}