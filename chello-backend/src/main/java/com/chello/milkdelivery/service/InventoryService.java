package com.chello.milkdelivery.service;

import com.chello.milkdelivery.model.Inventory;
import com.chello.milkdelivery.repository.InventoryRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Log4j2
@Service
@Transactional
public class InventoryService {
    private InventoryRepository inventoryRepository;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> getAll() {
        return inventoryRepository.findAll();
    }

    public Inventory searchInventory(int inventoryId) {
        Inventory inventory = inventoryRepository.findByInventoryId(inventoryId);
        if (inventory == null) {
            log.error("Searched for a non existing inventory item");
            throw new NoSuchElementException("No inventory found with ID: " + inventoryId);
        }
        log.info("Searched for an inventory item");
        return inventory;
    }

    public String addInventory(Inventory inventory) {
        Inventory i = inventoryRepository.findByInventoryId(inventory.getInventoryId());
        if (i == null) {
            inventoryRepository.save(inventory);
            log.info("Added new inventory item");
            return "Inventory added successfully";
        }
        log.error("Inserted an already existing inventory item");
        throw new NoSuchElementException("Inventory found with ID: " +inventory.getInventoryId());
    }

    public String updateInventory(Inventory inventory, int inventoryId) {
        try {
            Inventory i = inventoryRepository.findByInventoryId(inventoryId);
            if (i != null) {
                i.setQty(inventory.getQty());
                inventoryRepository.save(i);
                log.info("Updated an inventory item");
                return "Inventory updated successfully";
            }
            throw new NoSuchElementException("Inventory not found with ID: " + inventoryId);
        } catch (IllegalArgumentException e) {
            log.error("Tried to update an invalid inventory item");
            throw new NoSuchElementException("Inventory not found with ID: " + inventoryId);
        }
    }

    public String deleteInventory(int inventoryId) {
        Inventory i = inventoryRepository.findByInventoryId(inventoryId);
        if (i == null) {
            throw new NoSuchElementException("Inventory not found with ID: " + inventoryId);
        }
        inventoryRepository.delete(i);
        return "Inventory deleted successfully";
    }
}
