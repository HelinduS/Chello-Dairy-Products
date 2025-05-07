'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  image: string | null;
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
const FAVORITES_API_URL = 'http://localhost:8080/api/customer-products/favorites';
const DEFAULT_IMAGE = '/images/placeholder.jpg';

interface ProductCardProps {
  product: Product;
  onOrderSuccess: () => void;
}

const ProductCard = ({ product, onOrderSuccess }: ProductCardProps) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDays, setDeliveryDays] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'Delivery' | 'Pickup'>('Delivery');


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
    if (deliveryMethod === 'Delivery' && deliveryDays.length === 0) {
      setError('Please select at least one delivery day.');
      return;
    }

    const purchaseData: any = {
      productId: product.id,
      quantity,
      deliveryMethod,
      deliveryDay: deliveryMethod === 'Delivery' ? deliveryDays.sort().join(',') : null,
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
      
      // Call the callback to refresh products
      onOrderSuccess();
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const imageSrc = product.image && product.image.trim() !== '' ? product.image : DEFAULT_IMAGE;

  return (
    <div className="flex flex-col bg-white border rounded-lg shadow-sm p-2 xs:p-3 sm:p-4 hover:shadow-md transition-shadow w-full min-w-0">
      <div className="relative w-full h-32 xs:h-36 sm:h-40 md:h-48">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          priority={false}
        />
      </div>
      <div className="flex flex-col flex-grow mt-2 xs:mt-3 sm:mt-4">
        <h2 className="text-xs xs:text-sm sm:text-base font-semibold text-gray-900">{product.name}</h2>
        <p className="text-gray-600 text-[0.65rem] xs:text-xs sm:text-sm">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 text-[0.65rem] xs:text-xs sm:text-sm">Stock: {product.stock}</p>
      </div>
      <div className="mt-2 xs:mt-3 sm:mt-4 flex gap-1 sm:gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              size="sm"
              className="flex-1 text-[0.65rem] xs:text-xs sm:text-sm"
              disabled={product.stock === 0 || !localStorage.getItem('token')}
            >
              Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">Purchase {product.name}</DialogTitle>
            </DialogHeader>
            <p id="purchase-dialog-description" className="text-xs sm:text-sm text-muted-foreground mt-1">
              Select delivery method, delivery day(s), and quantity (Available stock: {product.stock}).
            </p>

            {/* Delivery Method */}
            <div className="mt-4">
              <Label className="text-sm sm:text-base">Delivery Method</Label>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="delivery"
                    name="deliveryMethod"
                    value="Delivery"
                    checked={deliveryMethod === 'Delivery'}
                    onChange={() => setDeliveryMethod('Delivery')}
                  />
                  <Label htmlFor="delivery" className="text-xs sm:text-sm">Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="pickup"
                    name="deliveryMethod"
                    value="Pickup"
                    checked={deliveryMethod === 'Pickup'}
                    onChange={() => setDeliveryMethod('Pickup')}
                  />
                  <Label htmlFor="pickup" className="text-xs sm:text-sm">Pickup</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-4">
            {deliveryMethod === 'Delivery' && (
              <div>
                <Label className="text-sm sm:text-base">Delivery Day(s)</Label>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wednesday"
                      checked={deliveryDays.includes('Wednesday')}
                      onCheckedChange={() => handleDeliveryDayChange('Wednesday')}
                    />
                    <Label htmlFor="wednesday" className="text-xs sm:text-sm">Wednesday</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sunday"
                      checked={deliveryDays.includes('Sunday')}
                      onCheckedChange={() => handleDeliveryDayChange('Sunday')}
                    />
                    <Label htmlFor="sunday" className="text-xs sm:text-sm">Sunday</Label>
                  </div>
                </div>
              </div>
            )}
              <div>
                <Label className="text-sm sm:text-base">Quantity</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="text-[0.65rem] xs:text-xs sm:text-sm"
                  >
                    -
                  </Button>
                  <span className="text-sm sm:text-base">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="text-[0.65rem] xs:text-xs sm:text-sm"
                  >
                    +
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm sm:text-base">Amount</Label>
                <p className="text-gray-600 text-sm sm:text-base">${(quantity * product.price).toFixed(2)}</p>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription className="text-xs sm:text-sm">{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert variant="default">
                  <AlertDescription className="text-xs sm:text-sm">{success}</AlertDescription>
                </Alert>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="default" onClick={handleConfirm} className="flex-1 text-xs sm:text-sm">
                Confirm
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setOpen(false);
                  setQuantity(1);
                  setDeliveryDays([]);
                  setDeliveryMethod('Delivery');
                  setError(null);
                  setSuccess(null);
                }}
                className="flex-1 text-xs sm:text-sm"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="secondary" size="sm" className="flex-1 text-[0.65rem] xs:text-xs sm:text-sm">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

interface ProductGridProps {
  isFavoritesSection: boolean;
  sortBy?: string;
}

const ProductGrid = ({ isFavoritesSection, sortBy = 'default' }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  const fetchFavoriteProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setFavoriteProducts([]);
        return;
      }
      const res = await fetch(FAVORITES_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });
      if (res.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
        throw new Error('Unauthorized');
      }
      if (!res.ok) throw new Error(`Failed to fetch favorites: ${res.status}`);
      const data: Product[] = await res.json();
      setFavoriteProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSuccess = () => {
    // Refresh product data after successful order
    if (isFavoritesSection) {
      fetchFavoriteProducts();
    } else {
      fetchProducts();
    }
  };

  useEffect(() => {
    if (isFavoritesSection) {
      fetchFavoriteProducts();
    } else {
      fetchProducts();
    }
  }, [isFavoritesSection]);

  // Sort products only for the "All Available Products" section
  const displayProducts = isFavoritesSection
    ? favoriteProducts
    : [...products].sort((a, b) => {
        if (sortBy === 'priceLowToHigh') {
          return a.price - b.price;
        } else if (sortBy === 'priceHighToLow') {
          return b.price - a.price;
        } else if (sortBy === 'nameAZ') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'nameZA') {
          return b.name.localeCompare(a.name);
        }
        return 0; // Default sorting
      });

  if (loading) {
    return (
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 xs:gap-4 sm:gap-5">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="bg-white border rounded-lg p-2 xs:p-3 sm:p-4 animate-pulse w-full min-w-0">
            <div className="w-full h-32 xs:h-36 sm:h-40 md:h-48 bg-gray-200 rounded-md" />
            <div className="mt-2 xs:mt-3 sm:mt-4 h-5 bg-gray-200 rounded w-3/4" />
            <div className="mt-1 xs:mt-2 h-4 bg-gray-200 rounded w-1/2" />
            <div className="mt-2 xs:mt-3 sm:mt-4 flex gap-1 sm:gap-2">
              <div className="h-7 xs:h-8 sm:h-9 bg-gray-200 rounded flex-1" />
              <div className="h-7 xs:h-8 sm:h-9 bg-gray-200 rounded flex-1" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription className="text-sm sm:text-base">
          {error}
          <Button
            variant="link"
            onClick={isFavoritesSection ? fetchFavoriteProducts : fetchProducts}
            className="ml-2 text-xs sm:text-sm"
          >
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (displayProducts.length === 0) {
    return (
      <p className="text-center text-gray-600 text-sm sm:text-base">
        {isFavoritesSection ? "You haven't purchased any products yet." : 'No products available.'}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 xs:gap-4 sm:gap-5">
      {displayProducts.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onOrderSuccess={handleOrderSuccess}
        />
      ))}
    </div>
  );
};

export default ProductGrid;