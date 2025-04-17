package com.chello.milkdelivery.repository;



import com.chello.milkdelivery.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
} 
