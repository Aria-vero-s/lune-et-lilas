import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from '../App';
import { Button } from './ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

interface HeroProps {
  featuredProducts: Product[];
  onProductClick: (product: Product) => void;
}

export function Hero({ featuredProducts, onProductClick }: HeroProps) {
  const mainProduct = featuredProducts[0];
  const { language, t } = useLanguage();

  const getProductName = (product: Product) => {
    return language === 'fr' ? product.nameFr : product.name;
  };

  const getProductDescription = (product: Product) => {
    return language === 'fr' ? product.descriptionFr : product.description;
  };

  const getProductCategory = (product: Product) => {
    return language === 'fr' ? product.categoryFr : product.category;
  };

  return (
    <section className="relative w-full min-h-screen lg:h-[calc(100vh-80px)] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1920&h=1080&fit=crop&crop=center"
          alt="Beautiful hair background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex items-center lg:h-full">
        <div className="container-standard">
          {/* Mobile/Tablet: Single column layout */}
          <div className="lg:hidden">
            <div className="flex flex-col items-center space-y-12 py-16 min-h-screen">
              {/* Text content - centered */}
              <div className="text-center space-y-8 max-w-2xl">
                <div className="space-y-6">
                  <h1 className="text-5xl sm:text-6xl font-medium text-white leading-tight" style={{ fontFamily: 'var(--font-family-secondary)' }}>
                    <span className="block">{t.discoverYour}</span>
                    <span className="block text-lilac-200 italic">{t.hairsNatural}</span>
                    <span className="block text-lilac-100 italic">{t.beauty}</span>
                  </h1>
                  
                  <p className="text-lg text-white/90 leading-relaxed" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    {t.heroDescription}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-lilac-600 text-white px-8 py-4 rounded-full shadow-xl"
                  >
                    {t.shopCollection}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/80 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary px-8 py-4 rounded-full"
                  >
                    {t.learnMore}
                  </Button>
                </div>
                
                {/* Stats */}
                <div className="flex justify-center space-x-8 pt-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
                    <div className="text-sm text-white/80">{t.natural}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-white">5k+</div>
                    <div className="text-sm text-white/80">{t.customers}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-white">4.9</div>
                    <div className="text-sm text-white/80">{t.rating}</div>
                  </div>
                </div>
              </div>

              {/* Featured product showcase - below text content */}
              {mainProduct && (
                <div className="flex justify-center pb-16">
                  <div 
                    className="group cursor-pointer"
                    onClick={() => onProductClick(mainProduct)}
                  >
                    <div className="relative">
                      {/* Product card */}
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 max-w-sm">
                        <div className="aspect-square rounded-xl overflow-hidden mb-4">
                          <ImageWithFallback
                            src={mainProduct.image}
                            alt={getProductName(mainProduct)}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-primary uppercase tracking-wide font-medium">
                              {getProductCategory(mainProduct)}
                            </span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                              ))}
                              <span className="text-muted-foreground text-sm ml-1">4.9</span>
                            </div>
                          </div>
                          
                          <h3 className="text-xl text-foreground font-semibold">
                            {getProductName(mainProduct)}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {getProductDescription(mainProduct)}
                          </p>
                          
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl text-foreground font-bold">
                                ${mainProduct.price}
                              </span>
                              {mainProduct.originalPrice && (
                                <span className="text-lg text-muted-foreground line-through">
                                  ${mainProduct.originalPrice}
                                </span>
                              )}
                            </div>
                            
                            <Button 
                              size="sm"
                              className="bg-primary hover:bg-lilac-600 text-white px-4 py-2 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                onProductClick(mainProduct);
                              }}
                            >
                              {t.view}
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating badge */}
                      <div className="absolute -top-3 -right-3 bg-primary text-white rounded-full px-3 py-1 text-sm font-medium shadow-lg">
                        {t.featured}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop: Two column layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Text content */}
            <div className="text-left space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-white leading-tight" style={{ fontFamily: 'var(--font-family-secondary)' }}>
                  <span className="block">{t.discoverYour}</span>
                  <span className="block text-lilac-200 italic">{t.hairsNatural}</span>
                  <span className="block text-lilac-100 italic">{t.beauty}</span>
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed" style={{ fontFamily: 'var(--font-family-primary)' }}>
                  {t.heroDescription}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-lilac-600 text-white px-8 py-4 rounded-full shadow-xl"
                >
                  {t.shopCollection}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/80 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary px-8 py-4 rounded-full"
                >
                  {t.learnMore}
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex space-x-8 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-sm text-white/80">{t.natural}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">5k+</div>
                  <div className="text-sm text-white/80">{t.customers}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">4.9</div>
                  <div className="text-sm text-white/80">{t.rating}</div>
                </div>
              </div>
            </div>

            {/* Featured product showcase */}
            {mainProduct && (
              <div className="flex justify-end">
                <div 
                  className="group cursor-pointer"
                  onClick={() => onProductClick(mainProduct)}
                >
                  <div className="relative">
                    {/* Product card */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 max-w-sm">
                      <div className="aspect-square rounded-xl overflow-hidden mb-4">
                        <ImageWithFallback
                          src={mainProduct.image}
                          alt={getProductName(mainProduct)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary uppercase tracking-wide font-medium">
                            {getProductCategory(mainProduct)}
                          </span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-muted-foreground text-sm ml-1">4.9</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl text-foreground font-semibold">
                          {getProductName(mainProduct)}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {getProductDescription(mainProduct)}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl text-foreground font-bold">
                              ${mainProduct.price}
                            </span>
                            {mainProduct.originalPrice && (
                              <span className="text-lg text-muted-foreground line-through">
                                ${mainProduct.originalPrice}
                              </span>
                            )}
                          </div>
                          
                          <Button 
                            size="sm"
                            className="bg-primary hover:bg-lilac-600 text-white px-4 py-2 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              onProductClick(mainProduct);
                            }}
                          >
                            {t.view}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating badge */}
                    <div className="absolute -top-3 -right-3 bg-primary text-white rounded-full px-3 py-1 text-sm font-medium shadow-lg">
                      {t.featured}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


    </section>
  );
}