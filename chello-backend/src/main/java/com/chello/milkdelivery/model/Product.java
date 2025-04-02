package com.chello.milkdelivery.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productid")
    private int productId;

    @Column(name = "product")
    @NotBlank(message = "Product Name Required")
    private String product;

    @Column(name = "unitprice")
    private double unitPrice;

}
