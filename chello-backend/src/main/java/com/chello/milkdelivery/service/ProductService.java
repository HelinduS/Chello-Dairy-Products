package com.chello.milkdelivery.service;

import com.chello.milkdelivery.model.Product;
import com.chello.milkdelivery.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Log4j2
@Service
@Transactional
public class ProductService {
    private ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public Product searchProduct(int productId) {
        Product product = productRepository.findByProductId(productId);
        if (product == null) {
            log.error("Searched for a non-existing product");
            throw new NoSuchElementException("No Product Found with ID: " + productId);
        }
        log.info("Searched for a product");
        return product;
    }

    public String addProduct(Product product) {
        Product p = productRepository.findByProductId(product.getProductId());
        if (p == null) {
            productRepository.save(product);
            log.info("Added new product");
            return "Product added Successfully";
        }
        log.error("Inserted an already existing product");
        throw new NoSuchElementException("Product found with ID: " + product.getProductId());
    }

    public String updateProduct(Product product, int productId) {
        try {
            Product p = productRepository.findByProductId(productId);
            if (p != null) {
                p.setProduct(product.getProduct());
                p.setUnitPrice(product.getUnitPrice());
                productRepository.save(p);
                log.info("Updated a product");
                return "Product Updated Successfully";
            }
            throw new NoSuchElementException("Product not found with ID: " + productId);
        } catch (IllegalArgumentException e) {
            log.error("Tried to update a non-existing product");
            throw new NoSuchElementException("Product not found with ID: " + productId);
        }
    }

    public String deleteProduct(int productId) {
        Product p = productRepository.findByProductId(productId);
        if (p == null) {
            throw new NoSuchElementException("Product not found with ID: " + productId);
        }
        productRepository.delete(p);
        return "Product Deleted Successfully";
    }

}
