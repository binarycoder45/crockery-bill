import { Product } from "@/react-app/data/products";
import { Button } from "@/react-app/components/ui/button";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-200 group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.nameHindi && (
            <p className="text-sm text-muted-foreground">{product.nameHindi}</p>
          )}
        </div>
        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="text-xl font-bold text-primary">₹{product.price}</p>
          <p className="text-xs text-muted-foreground">per {product.unit}</p>
        </div>
        <Button
          size="sm"
          onClick={() => onAdd(product)}
          className="rounded-full w-10 h-10 p-0"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        Stock: {product.stock} {product.unit}s
      </div>
    </div>
  );
}
