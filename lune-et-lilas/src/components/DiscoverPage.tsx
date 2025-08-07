import { useState, useEffect } from 'react';
import { ProductGrid } from './ProductGrid';
import type { Product } from '../App';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Star, Sparkles, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../utils/LanguageContext';

interface DiscoverPageProps {
  products: Product[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  bestsellers: Product[];
  newArrivals: Product[];
  headerProducts: Product[];
  pageType?: 'discover' | 'bestsellers' | 'new-arrivals';
}

export function DiscoverPage({ 
  products, 
  selectedCategory, 
  onCategoryChange, 
  onProductClick, 
  onAddToCart,
  bestsellers,
  newArrivals,
  headerProducts,
  pageType = 'discover'
}: DiscoverPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language, t } = useLanguage();

  // Use headerProducts for the slideshow
  const slideshowProducts = headerProducts;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slideshowProducts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slideshowProducts.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slideshowProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slideshowProducts.length) % slideshowProducts.length);
  };

  const getPageTitle = () => {
    switch (pageType) {
      case 'bestsellers':
        return { main: t.bestsellersTitle, subtitle: t.bestsellersSubtitle };
      case 'new-arrivals':
        return { main: t.newArrivalsTitle, subtitle: t.newArrivalsSubtitle };
      default:
        return { main: t.editorsPickTitle, subtitle: t.editorsPickSubtitle };
    }
  };

  const getProductName = (product: Product) => {
    return language === 'fr' ? product.nameFr : product.name;
  };

  const getProductDescription = (product: Product) => {
    return language === 'fr' ? product.descriptionFr : product.description;
  };

  const { main, subtitle } = getPageTitle();

  return (
    <div className="min-h-screen">
      {/* Slideshow header section */}
      <section className="relative bg-accent overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="container-standard py-16 lg:py-24 w-full">
          {/* Mobile/Tablet: Vertical layout with image first */}
          <div className="block lg:hidden">
            <div className="space-y-8">
              {/* Page title */}
              <div className="text-center">
                <h1 className="text-4xl text-foreground mb-4" style={{ fontFamily: 'var(--font-family-secondary)' }}>
                  {main}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              </div>

              {/* Product image - Above navigation */}
              {slideshowProducts.length > 0 && (
                <div className="relative w-full h-80 rounded-3xl overflow-hidden bg-white shadow-2xl mx-auto max-w-md">
                  <ImageWithFallback
                    src={slideshowProducts[currentSlide]?.image}
                    alt={getProductName(slideshowProducts[currentSlide])}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay badges */}
                  <div className="absolute top-4 right-4 space-y-2">
                    {slideshowProducts[currentSlide]?.bestseller && (
                      <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{t.bestseller}</span>
                      </div>
                    )}
                    {slideshowProducts[currentSlide]?.newArrival && (
                      <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Sparkles className="h-3 w-3" />
                        <span>{t.newArrival}</span>
                      </div>
                    )}
                    {slideshowProducts[currentSlide]?.editorsPick && (
                      <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Award className="h-3 w-3" />
                        <span>{t.editorsPick}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Slideshow navigation - Below image */}
              {slideshowProducts.length > 1 && (
                <div className="flex items-center justify-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={prevSlide}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    {slideshowProducts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={nextSlide}
                    className="rounded-full w-10 h-10 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Current product info */}
              {slideshowProducts.length > 0 && (
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {slideshowProducts[currentSlide]?.bestseller && (
                      <div className="flex items-center space-x-1 text-primary text-sm font-medium">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{t.bestseller}</span>
                      </div>
                    )}
                    {slideshowProducts[currentSlide]?.newArrival && (
                      <div className="flex items-center space-x-1 text-primary text-sm font-medium">
                        <Sparkles className="h-4 w-4" />
                        <span>{t.newArrival}</span>
                      </div>
                    )}
                    {slideshowProducts[currentSlide]?.editorsPick && (
                      <div className="flex items-center space-x-1 text-primary text-sm font-medium">
                        <Award className="h-4 w-4" />
                        <span>{t.editorsPick}</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl text-foreground">
                    {getProductName(slideshowProducts[currentSlide])}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                    {getProductDescription(slideshowProducts[currentSlide])}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <span className="text-2xl font-semibold text-foreground">
                      ${slideshowProducts[currentSlide]?.price}
                    </span>
                    {slideshowProducts[currentSlide]?.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${slideshowProducts[currentSlide]?.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-center space-x-3">
                    <Button 
                      onClick={() => onProductClick(slideshowProducts[currentSlide])}
                      className="bg-primary hover:bg-lilac-600 text-white px-6 py-2"
                    >
                      {t.viewDetails}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => onAddToCart(slideshowProducts[currentSlide])}
                      className="border-primary text-primary hover:bg-accent px-6 py-2"
                    >
                      {t.addToCart}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop: Two column layout (original) */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl lg:text-6xl text-foreground mb-6" style={{ fontFamily: 'var(--font-family-secondary)' }}>
                  {main}
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
                  {subtitle}
                </p>
              </div>

              {/* Slideshow navigation - Only show if more than 1 product */}
              {slideshowProducts.length > 1 && (
                <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={prevSlide}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center space-x-2">
                  {slideshowProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={nextSlide}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                </div>
              )}

              {/* Current product info */}
              {slideshowProducts.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {slideshowProducts[currentSlide]?.bestseller && (
                      <div className="flex items-center space-x-1 text-primary text-sm font-medium">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{t.bestseller}</span>
                      </div>
                    )}
                    {slideshowProducts[currentSlide]?.newArrival && (
                      <div className="flex items-center space-x-1 text-primary text-sm font-medium">
                        <Sparkles className="h-4 w-4" />
                        <span>{t.newArrival}</span>
                      </div>
                    )}
                    {slideshowProducts[currentSlide]?.editorsPick && (
                      <div className="flex items-center space-x-1 text-primary text-sm font-medium">
                        <Award className="h-4 w-4" />
                        <span>{t.editorsPick}</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl text-foreground">
                    {getProductName(slideshowProducts[currentSlide])}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {getProductDescription(slideshowProducts[currentSlide])}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-semibold text-foreground">
                      ${slideshowProducts[currentSlide]?.price}
                    </span>
                    {slideshowProducts[currentSlide]?.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${slideshowProducts[currentSlide]?.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button 
                      onClick={() => onProductClick(slideshowProducts[currentSlide])}
                      className="bg-primary hover:bg-lilac-600 text-white px-6 py-2"
                    >
                      {t.viewDetails}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => onAddToCart(slideshowProducts[currentSlide])}
                      className="border-primary text-primary hover:bg-accent px-6 py-2"
                    >
                      {t.addToCart}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right side - Product image */}
            <div className="relative">
              {slideshowProducts.length > 0 && (
                <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden bg-white shadow-2xl">
                  <ImageWithFallback
                    src={slideshowProducts[currentSlide]?.image}
                    alt={getProductName(slideshowProducts[currentSlide])}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay badges */}
                  <div className="absolute top-4 right-4 space-y-2">
                    {slideshowProducts[currentSlide]?.bestseller && (
                      <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{t.bestseller}</span>
                      </div>
                    )}
                    {slideshowProducts[currentSlide]?.newArrival && (
                      <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Sparkles className="h-3 w-3" />
                        <span>{t.newArrival}</span>
                      </div>
                    )}
                    {slideshowProducts[currentSlide]?.editorsPick && (
                      <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Award className="h-3 w-3" />
                        <span>{t.editorsPick}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <ProductGrid
        products={products}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        onProductClick={onProductClick}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}