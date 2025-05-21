"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null;
  stock: number;
}

const API_URL = "http://localhost:8080/api/products";
const PURCHASE_API_URL = "http://localhost:8080/api/customer-products";
const FAVORITES_API_URL = "http://localhost:8080/api/customer-products/favorites";
const DEFAULT_IMAGE = "/images/placeholder.jpg";

interface ProductCardProps {
  product: Product;
  onOrderSuccess: () => void;
}

const ProductCard = ({ product, onOrderSuccess }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);
  const [cardDialogOpen, setCardDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDays, setDeliveryDays] = useState<string[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [paymentMethod, setPaymentMethod] = useState<"OnDelivery" | "OnlinePay">("OnDelivery");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCartMessage, setShowCartMessage] = useState(false);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, product.stock)));
  };

  const handleDeliveryDayChange = (day: string) => {
    setDeliveryDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleCardDetailChange = (field: string, value: string) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = async () => {
    if (deliveryMethod === "delivery" && deliveryDays.length === 0) {
      setError("Please select at least one delivery day.");
      return;
    }

    if (paymentMethod === "OnlinePay") {
      setCardDialogOpen(true);
      return;
    }

    // Handle On Delivery
    await savePurchase("pending");
  };

  const handleCardConfirm = async () => {
    // Basic validation (for demo purposes)
    if (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv) {
      setError("Please fill in all card details.");
      return;
    }

    // Handle Online Pay
    await savePurchase("payed");
  };

  const savePurchase = async (paymentStatus: "pending" | "payed") => {
    const purchaseData = {
      productId: product.id,
      quantity,
      deliveryMethod,
      deliveryDay: deliveryMethod === "delivery" ? deliveryDays.sort().join(",") : null,
      amount: quantity * product.price,
      paymentStatus,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to make a purchase.");
        return;
      }

      const res = await fetch(PURCHASE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(purchaseData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save purchase");
      }

      setSuccess("Purchase successful!");
      setOpen(false);
      setCardDialogOpen(false);
      setQuantity(1);
      setDeliveryDays([]);
      setDeliveryMethod("delivery");
      setPaymentMethod("OnDelivery");
      setCardDetails({ cardNumber: "", expiry: "", cvv: "" });
      setError(null);
      onOrderSuccess();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const imageSrc = product.image && product.image.trim() !== "" ? product.image : DEFAULT_IMAGE;

  return (
    <div className="flex flex-col bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="relative w-full h-40">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="mt-3 flex-grow">
        <h2 className="text-sm font-semibold">{product.name}</h2>
        <p className="text-xs text-gray-600">Rs. {product.price}</p>
        <p className="text-xs text-gray-600">Stock: {product.stock}</p>
      </div>
      <div className="mt-3 flex gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="sm" disabled={product.stock === 0}>
              Order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Purchase {product.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-3">
              <Label>Delivery Method</Label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="delivery"
                    checked={deliveryMethod === "delivery"}
                    onChange={() => setDeliveryMethod("delivery")}
                  /> Delivery
                </label>
                <label>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="Pickup"
                    checked={deliveryMethod === "pickup"}
                    onChange={() => setDeliveryMethod("pickup")}
                  /> Pickup
                </label>
              </div>
              {deliveryMethod === "delivery" && (
                <div className="flex gap-4">
                  <Checkbox
                    id="wednesday"
                    checked={deliveryDays.includes("Wednesday")}
                    onCheckedChange={() => handleDeliveryDayChange("Wednesday")}
                  />
                  <Label htmlFor="wednesday">Wednesday</Label>
                  <Checkbox
                    id="sunday"
                    checked={deliveryDays.includes("Sunday")}
                    onCheckedChange={() => handleDeliveryDayChange("Sunday")}
                  />
                  <Label htmlFor="sunday">Sunday</Label>
                </div>
              )}
              <Label>Payment Method</Label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="OnDelivery"
                    checked={paymentMethod === "OnDelivery"}
                    onChange={() => setPaymentMethod("OnDelivery")}
                  /> On Delivery
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="OnlinePay"
                    checked={paymentMethod === "OnlinePay"}
                    onChange={() => setPaymentMethod("OnlinePay")}
                  /> Online Pay
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span>{quantity}</span>
                <Button
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
              <p>Total: Rs. {(quantity * product.price).toFixed(2)}</p>
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
              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleConfirm}>
                  Confirm
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setOpen(false);
                    setQuantity(1);
                    setDeliveryDays([]);
                    setDeliveryMethod("delivery");
                    setPaymentMethod("OnDelivery");
                    setError(null);
                    setSuccess(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={cardDialogOpen} onOpenChange={setCardDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Card Details</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-3">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={(e) => handleCardDetailChange("cardNumber", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    value={cardDetails.expiry}
                    onChange={(e) => handleCardDetailChange("expiry", e.target.value)}
                    placeholder="MM/YY"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardDetailChange("cvv", e.target.value)}
                    placeholder="123"
                  />
                </div>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleCardConfirm}>
                  Confirm
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setCardDialogOpen(false);
                    setCardDetails({ cardNumber: "", expiry: "", cvv: "" });
                    setError(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex flex-col flex-1 space-y-1">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 text-xs bg-gray-100 hover:bg-green-100 transition-colors duration-200"
            onClick={() => {
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
              });
              setShowCartMessage(true);
              setTimeout(() => setShowCartMessage(false), 2000);
            }}
          >
            Add to Cart
          </Button>
          {showCartMessage && (
            <span className="text-green-600 text-xs text-center">✔ Added to cart</span>
          )}
        </div>
      </div>
    </div>
  );
};

interface ProductGridProps {
  isFavoritesSection: boolean;
  sortBy?: string;
}

const ProductGrid = ({ isFavoritesSection, sortBy = "default" }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchFavoriteProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(FAVORITES_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch favorites");
      const data: Product[] = await res.json();
      setFavoriteProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isFavoritesSection ? fetchFavoriteProducts() : fetchProducts();
  }, [isFavoritesSection]);

  const displayProducts = isFavoritesSection ? favoriteProducts : [...products].sort((a, b) => {
    if (sortBy === "priceLowToHigh") return a.price - b.price;
    if (sortBy === "priceHighToLow") return b.price - a.price;
    if (sortBy === "nameAZ") return a.name.localeCompare(b.name);
    if (sortBy === "nameZA") return b.name.localeCompare(a.name);
    return 0;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} onOrderSuccess={() => isFavoritesSection ? fetchFavoriteProducts() : fetchProducts()} />
      ))}
    </div>
  );
};

export default ProductGrid;