import { useState } from 'react';
import { ArrowLeft, Plus, Minus, Heart, Star, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ReviewsSection } from './ReviewsSection';
import type { Product, PageType } from '../App';
import { reviewsStats } from '../constants/reviews';
import { getShippingText } from '../utils/shipping';
import { useLanguage } from '../utils/LanguageContext';

interface ProductDetailsPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  isLiked?: boolean;
  onToggleLike?: () => void;
  onNavigate: (page: PageType) => void;
  previousPage?: PageType;
}

export function ProductDetailsPage({ 
  product, 
  onAddToCart, 
  isLiked = false, 
  onToggleLike,
  onNavigate,
  previousPage = 'home'
}: ProductDetailsPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'howToUse'>('description');
  const { language, t } = useLanguage();

  const getProductName = () => {
    return language === 'fr' ? product.nameFr : product.name;
  };

  const getProductDescription = () => {
    return language === 'fr' ? product.descriptionFr : product.description;
  };

  const getProductCategory = () => {
    return language === 'fr' ? product.categoryFr : product.category;
  };

  const getProductIngredients = () => {
    return language === 'fr' ? product.ingredientsFr : product.ingredients;
  };

  const getProductHowToUse = () => {
    return language === 'fr' ? product.howToUseFr : product.howToUse;
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const handleBack = () => {
    onNavigate(previousPage);
  };

  const scrollToReviews = () => {
    document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const tabs = [
    { key: 'description', label: t.about },
    { key: 'ingredients', label: t.ingredients },
    { key: 'howToUse', label: t.ritual }
  ] as const;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed text-lg">
              {getProductDescription()}
            </p>
            <div className="bg-accent/50 rounded-2xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-2">{t.perfectFor}</h4>
              <p className="text-muted-foreground">
                {t.perfectForDescription}
              </p>
            </div>
          </div>
        );
      case 'ingredients':
        return (
          <div className="space-y-6">
            <div>
              <p className="text-foreground mb-4 font-semibold text-lg">{t.keyIngredients}</p>
              <ul className="space-y-3">
                {getProductIngredients().map(ingredient => (
                  <li key={ingredient} className="flex items-center space-x-3 text-muted-foreground text-base lg:text-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-accent/50 rounded-2xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-2">{t.cleanSustainable}</h4>
              <p className="text-muted-foreground">
                {t.cleanSustainableDescription}
              </p>
            </div>
          </div>
        );
      case 'howToUse':
        return (
          <div className="space-y-6">
            <div>
              <p className="text-foreground mb-3 font-semibold text-lg">{t.howToUseLabel}</p>
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                {getProductHowToUse()}
              </p>
            </div>
            <div className="bg-accent/50 rounded-2xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-2">{t.proTip}</h4>
              <p className="text-muted-foreground">
                {t.proTipDescription}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container-standard py-4">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="container-standard py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Product image */}
          <div className="space-y-6">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-xl">
              <ImageWithFallback
                src={product.image}
                alt={getProductName()}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Additional product images */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">{t.moreViews}</h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <ImageWithFallback
                      src={`${product.image}&variant=${i}`}
                      alt={`${getProductName()} - view ${i}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product details */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <span className="text-sm text-primary uppercase tracking-wide font-medium">
                    {getProductCategory()}
                  </span>
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl text-foreground leading-tight" style={{ fontFamily: 'var(--font-family-secondary)' }}>
                    {getProductName()}
                  </h1>
                </div>
                {onToggleLike && (
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={onToggleLike}
                    className={`rounded-full p-3 ${
                      isLiked ? 'text-primary hover:text-primary/80' : 'text-muted-foreground hover:text-primary'
                    }`}
                    aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                )}
              </div>

              {/* Price and rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl lg:text-4xl xl:text-5xl text-foreground font-bold">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl lg:text-2xl text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-current" />
                  ))}
                  <button 
                    onClick={scrollToReviews}
                    className="text-sm text-muted-foreground ml-2 hover:text-primary underline cursor-pointer transition-colors"
                  >
                    ({reviewsStats.totalReviews} {t.reviews})
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="space-y-6">
              <div className="flex space-x-6 border-b border-border">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`pb-3 px-2 text-base lg:text-lg transition-colors relative font-medium ${
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

              <div className="min-h-[200px]">
                {renderTabContent()}
              </div>
            </div>

            {/* Quantity and add to cart */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center space-x-6">
                <span className="text-foreground font-semibold text-lg">{t.quantity}:</span>
                <div className="flex items-center bg-white rounded-full border-2 border-border shadow-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-full w-12 h-12 p-0 hover:bg-accent"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <span className="px-6 text-foreground min-w-[4rem] text-center font-semibold text-lg">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-full w-12 h-12 p-0 hover:bg-accent"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-lilac-600 text-white py-4 lg:py-5 rounded-full shadow-lg text-lg lg:text-xl font-semibold flex items-center justify-center space-x-3"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{t.addToCartButton} - ${(product.price * quantity).toFixed(2)}</span>
              </Button>
              
              <div className="text-center space-y-2">
                <p className="text-base text-muted-foreground">
                  {getShippingText(product.price * quantity)} • {t.dayReturns}
                </p>
                <p className="text-sm text-primary">
                  ✨ {t.earnLoyaltyPoints.replace('{points}', Math.floor(product.price * quantity).toString())}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <ReviewsSection productId={product.id} />
      </div>
    </div>
  );
}