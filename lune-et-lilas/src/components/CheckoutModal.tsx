import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { CartItem } from '../App';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onSuccess: () => void;
}

export function CheckoutModal({ isOpen, onClose, items, total, onSuccess }: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        setStep('details');
      }, 3000);
    }, 2000);
  };

  if (step === 'success') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
          <DialogHeader>
            <DialogTitle className="sr-only">Order Confirmation</DialogTitle>
            <DialogDescription className="sr-only">
              Your order has been confirmed and you will receive an email confirmation shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-2xl text-rose-900 mb-2">order confirmed!</h3>
              <p className="text-rose-600">
                thank you for your purchase. your hair care journey begins now ✨
              </p>
            </div>
            <div className="bg-white/70 rounded-2xl p-4 border border-rose-100">
              <p className="text-sm text-rose-700">
                order confirmation sent to {formData.email}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
        <DialogHeader>
          <DialogTitle className="text-rose-900">
            {step === 'details' ? 'shipping details' : 'secure payment'}
          </DialogTitle>
          <DialogDescription className="text-rose-600">
            {step === 'details' 
              ? 'Please provide your shipping information to complete your order.'
              : 'Enter your payment details to complete your purchase securely.'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8 p-6">
          {/* Order summary */}
          <div className="space-y-6">
            <div className="bg-white/70 rounded-2xl p-6 border border-rose-100">
              <h3 className="text-rose-900 mb-4">order summary</h3>
              
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-rose-900 text-sm">{item.product.name}</h4>
                      <p className="text-rose-600 text-sm">Qty: {item.quantity}</p>
                      <p className="text-rose-900 font-medium text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-rose-200 pt-4 space-y-2">
                <div className="flex justify-between text-rose-900">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-rose-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-medium text-rose-900 text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-green-800 font-medium text-sm">secure checkout</span>
              </div>
              <p className="text-green-700 text-xs">
                your payment information is encrypted and secure
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {step === 'details' ? (
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-rose-700">email address</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/70 border-rose-200 focus:border-rose-400 rounded-xl"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-rose-700">first name</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="bg-white/70 border-rose-200 focus:border-rose-400 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-rose-700">last name</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="bg-white/70 border-rose-200 focus:border-rose-400 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-rose-700">address</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="bg-white/70 border-rose-200 focus:border-rose-400 rounded-xl"
                      placeholder="123 beauty street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-rose-700">city</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="bg-white/70 border-rose-200 focus:border-rose-400 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-rose-700">zip code</Label>
                      <Input
                        id="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="bg-white/70 border-rose-200 focus:border-rose-400 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-rose-400 hover:bg-rose-500 text-white py-3 rounded-full"
                >
                  continue to payment
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nameOnCard" className="text-rose-700">name on card</Label>
                    <Input
                      id="nameOnCard"
                      required
                      value={formData.nameOnCard}
                      onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                      className="bg-white/70 border-rose-200 focus:border-rose-400 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber" className="text-rose-700">card number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="bg-white/70 border-rose-200 focus:border-rose-400 rounded-xl pl-10"
                        placeholder="1234 5678 9012 3456"
                      />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-rose-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="text-rose-700">expiry date</Label>
                      <Input
                        id="expiryDate"
                        required
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        className="bg-white/70 border-rose-200 focus:border-rose-400 rounded-xl"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-rose-700">cvv</Label>
                      <Input
                        id="cvv"
                        required
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className="bg-white/70 border-rose-200 focus:border-rose-400 rounded-xl"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setStep('details')}
                    className="flex-1 border-rose-200 text-rose-700 hover:bg-rose-50 rounded-full"
                  >
                    back
                  </Button>
                  <Button 
                    type="submit"
                    className="flex-1 bg-rose-400 hover:bg-rose-500 text-white rounded-full"
                  >
                    complete order
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}