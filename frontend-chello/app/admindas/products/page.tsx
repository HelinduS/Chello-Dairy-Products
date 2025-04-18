"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
    id: number;
    name: string;
    price: number;
    image?: string;
    stock?: number; 
}

const AdminProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/products");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {products.map((product) => (
                <Card key={product.id} className="p-4">
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    {product.image && (
                        <img
                         src={product.image}
                         alt={product.name}
                         className="w-full h-32 object-contain mb-2 rounded"
                        />
                    )}
                    <p className="text-md font-semibold">${product.price}</p>
                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                    <div className="flex gap-2 mt-2">
                        <Button>Edit</Button>
                        <Button variant="destructive">Delete</Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default AdminProductsPage;