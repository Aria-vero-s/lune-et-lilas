import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { CartItem, LoyaltyMember } from '../App';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { calculateShipping, getShippingText, getShippingDisplayText } from '../utils/shipping';
import { useLanguage } from '../utils/LanguageContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  total: number;
  onCheckout: () => void;
  loyaltyMember?: LoyaltyMember;
}

export function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  total,
  onCheckout,
  loyaltyMember
}: CartProps) {
  const { language, t } = useLanguage();

  const getProductName = (item: CartItem) => {
    return language === 'fr' ? item.product.nameFr : item.product.name;
  };

  if (items.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg bg-gradient-to-br from-accent to-background border-border">
          <SheetHeader>
            <SheetTitle className="text-foreground flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              {t.yourCart}
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center h-full -mt-16">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h3 className="text-foreground mb-2">{t.yourCartEmpty}</h3>
                <p className="text-muted-foreground text-sm">
                  {t.discoverBeautiful}
                </p>
              </div>
              <Button 
                onClick={onClose}
                className="bg-primary hover:bg-lilac-600 text-primary-foreground rounded-full px-8"
              >
                {t.continueShopping}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  const pointsToEarn = loyaltyMember ? Math.floor(total) : 0;
  const shippingCost = calculateShipping(total);
  const finalTotal = total + shippingCost;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-gradient-to-br from-accent to-background border-border">
        <SheetHeader>
          <SheetTitle className="text-foreground flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            {t.yourCart} ({items.length} {items.length !== 1 ? t.items : t.item})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full p-6">
          {/* Cart items */}
          <div className="flex-1 overflow-y-auto py-2 space-y-6">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white/70 rounded-2xl p-6 border border-border">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={getProductName(item)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-foreground truncate pr-2">
                        {getProductName(item)}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      ${item.product.price} {t.each}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-white rounded-full border border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="rounded-full w-8 h-8 p-0 hover:bg-accent"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="px-3 text-sm text-foreground">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="rounded-full w-8 h-8 p-0 hover:bg-accent"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="text-foreground font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart footer */}
          <div className="border-t border-border pt-8 mt-6 space-y-8">
            {/* Loyalty points preview */}
            {loyaltyMember && (
              <div className="bg-accent/50 rounded-xl p-5 border border-border">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.pointsToEarn}</span>
                  <span className="font-medium text-primary">+{pointsToEarn} {t.points}</span>
                </div>
              </div>
            )}

            {/* Subtotal */}
            <div className="bg-white/50 rounded-xl p-5 border border-border space-y-4">
              <div className="flex justify-between text-foreground">
                <span>{t.subtotal}</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{t.shipping}</span>
                <span className="font-medium">{getShippingDisplayText(shippingCost, language)}</span>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between font-semibold text-foreground text-lg">
                  <span>{t.total}</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout button */}
            <div className="space-y-5">
              <Button 
                onClick={onCheckout}
                className="w-full bg-primary hover:bg-lilac-600 text-primary-foreground rounded-full py-3 shadow-lg"
              >
                {t.checkoutSecurely}
              </Button>
              
              <p className="text-center text-muted-foreground italic bg-accent/30 rounded-lg py-2 px-4">
                ✨ {getShippingText(total, language).toLowerCase()} ✨
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}