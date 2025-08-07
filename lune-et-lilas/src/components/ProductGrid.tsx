import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from '../App';
import { Button } from './ui/button';
import { Heart, Plus, Star, Sparkles, Award } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const categories = ['All', 'Shampoo', 'Conditioner', 'Treatment', 'Styling'];

export function ProductGrid({
  products,
  selectedCategory,
  onCategoryChange,
  onProductClick,
  onAddToCart
}: ProductGridProps) {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const { language, t } = useLanguage();

  const toggleLike = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedProducts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      return newLiked;
    });
  };

  const getProductName = (product: Product) => {
    return language === 'fr' ? product.nameFr : product.name;
  };

  const getProductDescription = (product: Product) => {
    return language === 'fr' ? product.descriptionFr : product.description;
  };

  const getProductCategory = (product: Product) => {
    return language === 'fr' ? product.categoryFr : product.category;
  };

  const getCategoryName = (category: string) => {
    if (category === 'All') return t.all;
    if (category === 'Shampoo') return t.shampoo;
    if (category === 'Conditioner') return t.conditioner;
    if (category === 'Treatment') return t.treatment;
    if (category === 'Styling') return t.styling;
    return category;
  };

  return (
    <section className="section-spacing bg-white">
      <div className="container-standard">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="mb-6 text-4xl lg:text-5xl text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
            {t.ourHairCareRituals}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.hairCareRitualsDescription}
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8 mb-12">
            <div className="w-20 h-0.5 bg-border rounded-full"></div>
            <div className="mx-4 w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-20 h-0.5 bg-border rounded-full"></div>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={`
                rounded-full px-6 py-2 transition-all
                ${selectedCategory === category
                  ? 'bg-primary hover:bg-lilac-600 text-white shadow-md'
                  : 'border-border text-foreground hover:bg-accent'
                }
              `}
              onClick={() => onCategoryChange(category)}
            >
              {getCategoryName(category)}
            </Button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Product image */}
                <div className="relative aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={getProductName(product)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay actions */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className={`
                          rounded-full w-10 h-10 p-0 shadow-lg
                          ${likedProducts.has(product.id) 
                            ? 'bg-primary text-white hover:bg-lilac-600' 
                            : 'bg-white/90 text-foreground hover:bg-white'
                          }
                        `}
                        onClick={(e) => toggleLike(product.id, e)}
                      >
                        <Heart 
                          className={`w-4 h-4 ${likedProducts.has(product.id) ? 'fill-current' : ''}`} 
                        />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-lilac-600 text-white rounded-full w-10 h-10 p-0 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Product badges */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {product.originalPrice && (
                      <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {language === 'en' ? 'Sale' : 'Promo'}
                      </div>
                    )}
                    {product.bestseller && (
                      <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{t.bestseller}</span>
                      </div>
                    )}
                    {product.newArrival && (
                      <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Sparkles className="h-3 w-3" />
                        <span>{t.newArrival}</span>
                      </div>
                    )}
                    {product.editorsPick && (
                      <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Award className="h-3 w-3" />
                        <span>{t.editorsPick}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-primary uppercase tracking-wide font-medium">
                      {getProductCategory(product)}
                    </span>
                  </div>
                  <h3 className="text-lg text-foreground font-semibold mb-2 line-clamp-2">
                    {getProductName(product)}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {getProductDescription(product)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl text-foreground font-bold">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {/* Star rating */}
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-3 h-3 rounded-full bg-accent"></div>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-1">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}