package com.chello.milkdelivery.controller;

import com.chello.milkdelivery.model.Inventory;
import com.chello.milkdelivery.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
@CrossOrigin
public class InventoryController {
    private InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Inventory>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.getAll());
    }

    @GetMapping("/search/{inventoryId}")
    public ResponseEntity<Inventory> searchInventory(@PathVariable int inventoryId) {
        return ResponseEntity.ok(inventoryService.searchInventory(inventoryId));
    }

    @PostMapping("/add")
    public ResponseEntity<String> addInventory(@RequestBody Inventory inventory) {
        return ResponseEntity.ok(inventoryService.addInventory(inventory));
    }

    @PutMapping("/update/{inventoryId}")
    public ResponseEntity<String> updateInventory(@PathVariable int inventoryId, @RequestBody Inventory inventory) {
        return ResponseEntity.ok(inventoryService.updateInventory(inventory, inventoryId));
    }

    @DeleteMapping("/delete/{inventoryId}")
    public ResponseEntity<String> deleteInventory(@PathVariable int inventoryId) {
        return ResponseEntity.ok(inventoryService.deleteInventory(inventoryId));
    }

}
