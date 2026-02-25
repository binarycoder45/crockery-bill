import { useState } from "react";
import { products, categories, Product } from "@/react-app/data/products";
import ProductCard from "@/react-app/components/ProductCard";
import Cart, { CartItem } from "@/react-app/components/Cart";
import BillPreview from "@/react-app/components/BillPreview";
import { Input } from "@/react-app/components/ui/input";
import { Button } from "@/react-app/components/ui/button";
import { Search, Store, Menu, X } from "lucide-react";

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showBillPreview, setShowBillPreview] = useState(false);
  const [billNumber, setBillNumber] = useState("");
  const [showMobileCart, setShowMobileCart] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleGenerateBill = () => {
    const newBillNumber = `INV-${Date.now().toString().slice(-8)}`;
    setBillNumber(newBillNumber);
    setShowBillPreview(true);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
              <Store className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">
                Sharma Crockery
              </h1>
              <p className="text-xs text-muted-foreground">Billing System</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products... (e.g., Thali)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Mobile Cart Button */}
          <Button
            variant="outline"
            className="md:hidden relative"
            onClick={() => setShowMobileCart(true)}
          >
            <Menu className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Products Section */}
          <div className="flex-1">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full whitespace-nowrap"
              >
                All Items
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={handleAddToCart}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">No products found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            )}
          </div>

          {/* Cart Section - Desktop */}
          <div className="hidden md:block w-96 shrink-0">
            <div className="sticky top-24">
              <Cart
                items={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveFromCart}
                onClear={handleClearCart}
                onGenerateBill={handleGenerateBill}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Drawer */}
      {showMobileCart && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileCart(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-xl">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-bold text-lg">Your Bill</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileCart(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="h-[calc(100vh-60px)]">
              <Cart
                items={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveFromCart}
                onClear={handleClearCart}
                onGenerateBill={() => {
                  handleGenerateBill();
                  setShowMobileCart(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bill Preview Modal */}
      <BillPreview
        isOpen={showBillPreview}
        onClose={() => setShowBillPreview(false)}
        items={cart}
        billNumber={billNumber}
      />
    </div>
  );
}
