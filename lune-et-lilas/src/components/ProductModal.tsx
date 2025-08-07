import { useState } from 'react';
import { X, Plus, Minus, Heart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from '../App';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isLiked?: boolean;
  onToggleLike?: () => void;
}

export function ProductModal({ product, onClose, onAddToCart, isLiked = false, onToggleLike }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'howToUse'>('description');

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Product details for {product.name} - {product.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Product image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative note */}
            <div className="relative">
              <div className="absolute -top-2 right-4 transform rotate-3">
                <div className="bg-accent border-2 border-white shadow-sm rounded-xl p-3">
                  <p className="text-xs text-muted-foreground italic">
                    crafted with love
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product details */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm text-primary uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h2 className="text-3xl text-foreground mt-1 font-semibold">
                    {product.name}
                  </h2>
                </div>
                {onToggleLike && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleLike}
                    className={`rounded-full p-2 ${
                      isLiked ? 'text-primary hover:text-primary/80' : 'text-muted-foreground hover:text-primary'
                    }`}
                    aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                )}
              </div>

              {/* Price and rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl text-foreground font-bold">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-current" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">(127 reviews)</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="space-y-4">
              <div className="flex space-x-4 border-b border-border">
                {[
                  { key: 'description', label: 'about' },
                  { key: 'ingredients', label: 'ingredients' },
                  { key: 'howToUse', label: 'ritual' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`pb-2 px-1 text-sm transition-colors relative ${
                      activeTab === tab.key
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[120px]">
                {activeTab === 'description' && (
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                )}
                {activeTab === 'ingredients' && (
                  <div>
                    <p className="text-foreground mb-3 font-medium">Key ingredients:</p>
                    <ul className="space-y-2">
                      {product.ingredients.map(ingredient => (
                        <li key={ingredient} className="flex items-center space-x-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'howToUse' && (
                  <div>
                    <p className="text-foreground mb-2 font-medium">How to use:</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.howToUse}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity and add to cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-foreground font-medium">Quantity:</span>
                <div className="flex items-center bg-white rounded-full border border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-full w-10 h-10 p-0 hover:bg-accent"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 text-foreground min-w-[3rem] text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-full w-10 h-10 p-0 hover:bg-accent"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-lilac-600 text-white py-3 rounded-full shadow-lg text-base"
              >
                add to cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              
              <p className="text-center text-sm text-muted-foreground">
                Free shipping & 30-day returns
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}