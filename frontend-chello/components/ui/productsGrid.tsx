'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface PurchaseData {
  productId: number;
  quantity: number;
  deliveryDay: string;
  amount: number;
}

const API_URL = 'http://localhost:8080/api/products';
const PURCHASE_API_URL = 'http://localhost:8080/api/customer-products';

const ProductCard = ({ product }: { product: Product }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDays, setDeliveryDays] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const newQty = prev + delta;
      return Math.max(1, Math.min(newQty, product.stock));
    });
  };

  const handleDeliveryDayChange = (day: string) => {
    setDeliveryDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const handleConfirm = async () => {
    if (deliveryDays.length === 0) {
      setError('Please select at least one delivery day.');
      return;
    }

    const purchaseData: PurchaseData = {
      productId: product.id,
      quantity,
      deliveryDay: deliveryDays.sort().join(','), // Ensure consistent order (e.g., "Monday,Sunday")
      amount: quantity * product.price,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to make a purchase.');
        return;
      }

      const res = await fetch(PURCHASE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(purchaseData),
      });

      if (!res.ok) {
        let errorMessage = 'Failed to save purchase';
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          const text = await res.text();
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      setSuccess('Purchase successful!');
      setOpen(false);
      setQuantity(1);
      setDeliveryDays([]);
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow w-full max-w-xs">
      <div className="relative w-full h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </div>
      <div className="flex flex-col flex-grow mt-4">
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <p className="text-gray-600">Stock: {product.stock}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              disabled={product.stock === 0 || !localStorage.getItem('token')}
            >
              Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Purchase {product.name}</DialogTitle>
            </DialogHeader>
            <p id="purchase-dialog-description" className="text-sm text-muted-foreground mt-1">
              Select delivery day(s) and quantity (Available stock: {product.stock}).
            </p>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Delivery Day(s)</Label>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wednesday"
                      checked={deliveryDays.includes('Wednesday')}
                      onCheckedChange={() => handleDeliveryDayChange('Wednesday')}
                    />
                    <Label htmlFor="wednesday">Wednesday</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sunday"
                      checked={deliveryDays.includes('Sunday')}
                      onCheckedChange={() => handleDeliveryDayChange('Sunday')}
                    />
                    <Label htmlFor="sunday">Sunday</Label>
                  </div>
                </div>
              </div>
              <div>
                <Label>Quantity</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span>{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div>
                <Label>Amount</Label>
                <p className="text-gray-600">${(quantity * product.price).toFixed(2)}</p>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert variant="default">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="default" onClick={handleConfirm} className="flex-1">
                Confirm
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setOpen(false);
                  setQuantity(1);
                  setDeliveryDays([]);
                  setError(null);
                  setSuccess(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="secondary" size="sm" className="flex-1">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white border rounded-lg p-4 animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-md" />
            <div className="mt-4 h-6 bg-gray-200 rounded w-3/4" />
            <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
            <div className="mt-4 flex gap-2">
              <div className="h-10 bg-gray-200 rounded flex-1" />
              <div className="h-10 bg-gray-200 rounded flex-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error}
          <Button variant="link" onClick={fetchProducts} className="ml-2">
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-600">No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;