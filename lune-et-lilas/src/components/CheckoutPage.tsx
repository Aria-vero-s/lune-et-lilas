import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { CartItem } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CreditCard, Lock, CheckCircle, ArrowLeft, Truck, Shield, Heart } from 'lucide-react';
import { calculateShipping, getShippingText, getShippingDisplayText } from '../utils/shipping';
import { useLanguage } from '../utils/LanguageContext';

interface CheckoutPageProps {
  items: CartItem[];
  total: number;
  onSuccess: () => void;
  onBack: () => void;
}

type CheckoutStep = 'details' | 'payment';

export function CheckoutPage({ items, total, onSuccess, onBack }: CheckoutPageProps) {
  const [step, setStep] = useState<CheckoutStep>('details');
  const [isProcessing, setIsProcessing] = useState(false);
  const { language, t } = useLanguage();
  
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const shipping = calculateShipping(total);
  const finalTotal = total + shipping;

  const getProductName = (item: CartItem) => {
    return language === 'fr' ? item.product.nameFr : item.product.name;
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSuccess();
  };

  const isDetailsValid = Object.values(shippingDetails).every(value => value.trim() !== '');
  const isPaymentValid = Object.values(paymentDetails).every(value => value.trim() !== '');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container-standard py-6">
          {/* Mobile/Tablet Layout */}
          <div className="block lg:hidden">
            <div className="space-y-4">
              {/* Back button at the top */}
              <div>
                <Button 
                  variant="ghost"
                  onClick={onBack}
                  className="text-primary hover:text-foreground hover:bg-accent rounded-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.backToShopping}
                </Button>
              </div>
              
              {/* Title on the left */}
              <div className="text-left">
                <h1 className="text-3xl sm:text-4xl text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
                  {step === 'details' ? t.shippingDetails : t.securePayment}
                </h1>
                <p className="text-muted-foreground text-sm">{t.step} {step === 'details' ? '1' : '2'} {t.of} 2</p>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Original */}
          <div className="hidden lg:flex items-center justify-between">
            <Button 
              variant="ghost"
              onClick={onBack}
              className="text-primary hover:text-foreground hover:bg-accent rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToShopping}
            </Button>
            
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
                {step === 'details' ? t.shippingDetails : t.securePayment}
              </h1>
              <p className="text-muted-foreground text-sm">{t.step} {step === 'details' ? '1' : '2'} {t.of} 2</p>
            </div>

            <div className="w-24"></div> {/* Spacer for balance */}
          </div>
        </div>
      </div>

      <div className="container-standard py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Form */}
          <div className="space-y-8">
            {step === 'details' ? (
              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-6">{t.personalInformation}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">{t.firstName}</Label>
                      <Input
                        id="firstName"
                        required
                        value={shippingDetails.firstName}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, firstName: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">{t.lastName}</Label>
                      <Input
                        id="lastName"
                        required
                        value={shippingDetails.lastName}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, lastName: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="email">{t.email}</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={shippingDetails.email}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t.phone}</Label>
                      <Input
                        id="phone"
                        required
                        value={shippingDetails.phone}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-6">{t.shippingAddress}</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">{t.address}</Label>
                      <Input
                        id="address"
                        required
                        value={shippingDetails.address}
                        onChange={(e) => setShippingDetails(prev => ({ ...prev, address: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">{t.city}</Label>
                        <Input
                          id="city"
                          required
                          value={shippingDetails.city}
                          onChange={(e) => setShippingDetails(prev => ({ ...prev, city: e.target.value }))}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">{t.postalCode}</Label>
                        <Input
                          id="postalCode"
                          required
                          value={shippingDetails.postalCode}
                          onChange={(e) => setShippingDetails(prev => ({ ...prev, postalCode: e.target.value }))}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">{t.country}</Label>
                        <Input
                          id="country"
                          required
                          value={shippingDetails.country}
                          onChange={(e) => setShippingDetails(prev => ({ ...prev, country: e.target.value }))}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={!isDetailsValid}
                  className="w-full bg-primary hover:bg-lilac-600 text-white py-3 text-lg rounded-full"
                >
                  {t.continueToPayment}
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-6">{t.paymentInformation}</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">{t.cardNumber}</Label>
                      <div className="relative mt-2">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                          value={paymentDetails.cardNumber}
                          onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                          className="pl-10"
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">{t.expiryDate}</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          required
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">{t.cvv}</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value }))}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="cardholderName">{t.cardholderName}</Label>
                      <Input
                        id="cardholderName"
                        required
                        value={paymentDetails.cardholderName}
                        onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardholderName: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-accent/50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm">
                      {t.yourPaymentSecure}
                    </span>
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={!isPaymentValid || isProcessing}
                  className="w-full bg-primary hover:bg-lilac-600 text-white py-3 text-lg rounded-full"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t.processing}</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      {t.placeOrder}
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-accent/30 rounded-2xl p-6 lg:p-8 h-fit">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              {t.orderSummary}
            </h3>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={getProductName(item)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">{getProductName(item)}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t.qty}: {item.quantity}
                    </p>
                  </div>
                  <div className="text-foreground font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-muted-foreground">
                <span>{t.subtotal}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{t.shipping}</span>
                <span>{getShippingDisplayText(shipping, language)}</span>
              </div>
              <div className="flex justify-between text-foreground font-semibold text-lg border-t border-border pt-3">
                <span>{t.total}</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <Truck className="w-4 h-4" />
                <span>
                  {t.freeShippingFor}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <Shield className="w-4 h-4" />
                <span>
                  {t.secureCheckoutSSL}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                <Heart className="w-4 h-4" />
                <span>
                  {t.thirtyDayReturn}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}