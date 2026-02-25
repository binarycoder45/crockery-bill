import { Product } from "@/react-app/data/products";
import { Button } from "@/react-app/components/ui/button";
import { Minus, Plus, Trash2, Receipt } from "lucide-react";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  onClear: () => void;
  onGenerateBill: () => void;
}

export default function Cart({ items, onUpdateQuantity, onRemove, onClear, onGenerateBill }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + gst;

  return (
    <div className="bg-card border border-border rounded-2xl h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Current Bill
          </h2>
          {items.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClear} className="text-destructive hover:text-destructive">
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Receipt className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No items added</p>
            <p className="text-sm">Click + to add products</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.product.id} className="bg-secondary/50 rounded-xl p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">₹{item.product.price} × {item.quantity}</p>
                </div>
                <p className="font-semibold text-primary">₹{item.product.price * item.quantity}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0 rounded-full"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0 rounded-full"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive w-8 h-8 p-0"
                  onClick={() => onRemove(item.product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t border-border space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST (18%)</span>
              <span>₹{gst}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
              <span>Total</span>
              <span className="text-primary">₹{total}</span>
            </div>
          </div>
          
          <Button onClick={onGenerateBill} className="w-full" size="lg">
            <Receipt className="w-4 h-4 mr-2" />
            Generate Bill
          </Button>
        </div>
      )}
    </div>
  );
}
