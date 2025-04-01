package com.chello.milkdelivery.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "inventory")
@Entity
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventoryid")
    private int inventoryId;

    /*@ManyToOne
    @JoinColumn(name = "productid")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "supplierid")
    private Supplier supplier;*/

    @Column(name = "qty")
    private double qty;

}
