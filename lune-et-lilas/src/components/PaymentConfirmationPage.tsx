import { CheckCircle, Calendar, Package, Heart, ArrowLeft, Download, Mail } from 'lucide-react';
import { Button } from './ui/button';
import type { CartItem } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../utils/LanguageContext';

interface PaymentConfirmationPageProps {
  orderNumber: string;
  orderDate: string;
  items: CartItem[];
  total: number;
  shippingCost: number;
  customerEmail: string;
  onBackToHome: () => void;
  onContinueShopping: () => void;
}

export function PaymentConfirmationPage({ 
  orderNumber, 
  orderDate, 
  items, 
  total, 
  shippingCost,
  customerEmail,
  onBackToHome,
  onContinueShopping
}: PaymentConfirmationPageProps) {
  const { language, t } = useLanguage();

  const getProductName = (item: CartItem) => {
    return language === 'fr' ? item.product.nameFr : item.product.name;
  };

  const finalTotal = total + shippingCost;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  const formattedDeliveryDate = language === 'fr' 
    ? estimatedDelivery.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : estimatedDelivery.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container-standard py-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost"
              onClick={onBackToHome}
              className="text-primary hover:text-foreground hover:bg-accent rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToHome}
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl lg:text-4xl text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
                {t.orderConfirmed}
              </h1>
            </div>

            <div className="w-24"></div> {/* Spacer for balance */}
          </div>
        </div>
      </div>

      <div className="container-standard py-12">
        {/* Success Message */}
        <div className="text-center mb-12 space-y-6">
          <div className="w-24 h-24 mx-auto bg-accent rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl text-foreground" style={{ fontFamily: 'var(--font-family-secondary)' }}>
              {t.thankYouForOrder}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.orderConfirmationMessage}
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-accent/30 rounded-2xl p-8 mx-auto max-w-2xl">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.orderNumber}</p>
                  <p className="font-semibold text-foreground">#{orderNumber}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.estimatedDelivery}</p>
                  <p className="font-semibold text-foreground">{formattedDeliveryDate}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.confirmationSentTo}</p>
                  <p className="font-semibold text-foreground break-all">{customerEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Items */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">{t.orderSummary}</h3>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-white rounded-2xl border border-border">
                  <div className="w-20 h-20 rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={getProductName(item)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{getProductName(item)}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t.qty}: {item.quantity} × ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-foreground font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons - Now in the same column as order items */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                onClick={onContinueShopping}
                className="bg-primary hover:bg-lilac-600 text-white px-8 py-3 rounded-full"
              >
                {t.continueShopping}
              </Button>
              
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-full"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4 mr-2" />
                {t.downloadReceipt}
              </Button>
            </div>
          </div>

          {/* Order Total */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">{t.orderTotal}</h3>
            
            <div className="bg-white rounded-2xl p-6 border border-border space-y-4">
              <div className="flex justify-between text-muted-foreground">
                <span>{t.subtotal}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{t.shipping}</span>
                <span>{shippingCost === 0 ? t.free : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-foreground font-semibold text-lg">
                  <span>{t.total}</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-accent/30 rounded-2xl p-6 space-y-4">
              <h4 className="font-semibold text-foreground">{t.whatHappensNext}</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">{t.orderProcessingMessage}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">{t.shippingNotificationMessage}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">{t.deliveryMessage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}