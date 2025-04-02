package com.chello.milkdelivery.controller;

import com.chello.milkdelivery.model.Product;
import com.chello.milkdelivery.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {
    private ProductService productService;

    //@Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping("/search/{productId}")
    public ResponseEntity<Product> searchProduct(@PathVariable int productId) {
        return ResponseEntity.ok(productService.searchProduct(productId));
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.addProduct(product));
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<String> updateProduct(@RequestBody Product product, @PathVariable int productId) {
        return ResponseEntity.ok(productService.updateProduct(product, productId));
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable int productId) {
        return ResponseEntity.ok(productService.deleteProduct(productId));
    }

}
