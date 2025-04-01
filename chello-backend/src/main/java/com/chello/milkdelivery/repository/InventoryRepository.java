package com.chello.milkdelivery.repository;

import com.chello.milkdelivery.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    Inventory findByInventoryId(int inventoryId);
    Inventory findByProduct_ProductId(int productId);
}
