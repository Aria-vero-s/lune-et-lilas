import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { ProductModal } from './components/ProductModal';
import { CheckoutPage } from './components/CheckoutPage';
import { PaymentConfirmationPage } from './components/PaymentConfirmationPage';
import { DiscoverPage } from './components/DiscoverPage';
import { LoyaltyPage } from './components/LoyaltyPage';
import { SalonPage } from './components/SalonPage';
import { AboutPage } from './components/AboutPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { calculateShipping } from './utils/shipping';
import { LanguageProvider } from './utils/LanguageContext';

export interface Product {
  id: string;
  name: string;
  nameFr: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  descriptionFr: string;
  category: string;
  categoryFr: string;
  ingredients: string[];
  ingredientsFr: string[];
  howToUse: string;
  howToUseFr: string;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  editorsPick?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface LoyaltyMember {
  id: string;
  name: string;
  email: string;
  points: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
  totalSpent: number;
  joinDate: string;
  referralCode: string;
}

export type PageType = 'home' | 'discover' | 'bestsellers' | 'new-arrivals' | 'rewards' | 'salon' | 'about' | 'checkout' | 'payment-confirmation' | 'product-details';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Silk Dreams Shampoo',
    nameFr: 'Shampooing Rêves de Soie',
    price: 32,
    originalPrice: 38,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    description: 'A luxurious shampoo that transforms your hair into silk-like perfection. Infused with natural oils and botanical extracts.',
    descriptionFr: 'Un shampooing luxueux qui transforme vos cheveux en perfection soyeuse. Infusé d\'huiles naturelles et d\'extraits botaniques.',
    category: 'Shampoo',
    categoryFr: 'Shampooing',
    ingredients: ['Argan Oil', 'Rose Water', 'Silk Proteins', 'Vitamin E'],
    ingredientsFr: ['Huile d\'Argan', 'Eau de Rose', 'Protéines de Soie', 'Vitamine E'],
    howToUse: 'Apply to wet hair, massage gently, and rinse thoroughly. Follow with conditioner for best results.',
    howToUseFr: 'Appliquer sur cheveux mouillés, masser délicatement et rincer abondamment. Suivre avec un après-shampooing pour de meilleurs résultats.',
    featured: true,
    bestseller: true
  },
  {
    id: '2',
    name: 'Moonlit Curls Cream',
    nameFr: 'Crème Boucles au Clair de Lune',
    price: 28,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    description: 'Define and enhance your natural curls with this nourishing cream that works like magic under moonlight.',
    descriptionFr: 'Définissez et sublimez vos boucles naturelles avec cette crème nourrissante qui agit comme par magie sous le clair de lune.',
    category: 'Styling',
    categoryFr: 'Coiffage',
    ingredients: ['Shea Butter', 'Coconut Oil', 'Aloe Vera', 'Lavender Extract'],
    ingredientsFr: ['Beurre de Karité', 'Huile de Coco', 'Aloe Vera', 'Extrait de Lavande'],
    howToUse: 'Apply to damp hair, scrunch gently, and air dry or diffuse for beautiful, defined curls.',
    howToUseFr: 'Appliquer sur cheveux humides, froisser délicatement et laisser sécher à l\'air libre ou avec un diffuseur pour de belles boucles définies.',
    featured: true,
    editorsPick: true
  },
  {
    id: '3',
    name: 'Golden Honey Mask',
    nameFr: 'Masque au Miel Doré',
    price: 45,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
    description: 'A deeply nourishing hair mask infused with golden honey and precious botanicals for ultimate hair restoration.',
    descriptionFr: 'Un masque capillaire profondément nourrissant infusé de miel doré et de botaniques précieux pour une restauration ultime des cheveux.',
    category: 'Treatment',
    categoryFr: 'Traitement',
    ingredients: ['Manuka Honey', 'Argan Oil', 'Keratin', 'Chamomile'],
    ingredientsFr: ['Miel de Manuka', 'Huile d\'Argan', 'Kératine', 'Camomille'],
    howToUse: 'Apply to clean, damp hair. Leave on for 10-15 minutes, then rinse thoroughly.',
    howToUseFr: 'Appliquer sur cheveux propres et humides. Laisser poser 10-15 minutes, puis rincer abondamment.',
    featured: true,
    bestseller: true
  },
  {
    id: '4',
    name: 'Rose Petal Conditioner',
    nameFr: 'Après-shampooing Pétales de Rose',
    price: 30,
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
    description: 'A romantic conditioner that leaves your hair soft, fragrant, and beautifully manageable.',
    descriptionFr: 'Un après-shampooing romantique qui laisse vos cheveux doux, parfumés et merveilleusement coiffables.',
    category: 'Conditioner',
    categoryFr: 'Après-shampooing',
    ingredients: ['Rose Oil', 'Silk Amino Acids', 'Hibiscus', 'Jojoba Oil'],
    ingredientsFr: ['Huile de Rose', 'Acides Aminés de Soie', 'Hibiscus', 'Huile de Jojoba'],
    howToUse: 'After shampooing, apply from mid-length to ends. Leave for 2-3 minutes, then rinse.',
    howToUseFr: 'Après le shampooing, appliquer des mi-longueurs aux pointes. Laisser poser 2-3 minutes, puis rincer.'
  },
  {
    id: '5',
    name: 'Starlight Serum',
    nameFr: 'Sérum Lumière d\'Étoile',
    price: 52,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    description: 'A luminous serum that adds celestial shine and protects your hair from environmental damage.',
    descriptionFr: 'Un sérum lumineux qui ajoute un éclat céleste et protège vos cheveux des dommages environnementaux.',
    category: 'Treatment',
    categoryFr: 'Traitement',
    ingredients: ['Vitamin C', 'Hyaluronic Acid', 'Pearl Extract', 'Sunflower Oil'],
    ingredientsFr: ['Vitamine C', 'Acide Hyaluronique', 'Extrait de Perle', 'Huile de Tournesol'],
    howToUse: 'Apply 2-3 drops to damp or dry hair, focusing on ends. Style as usual.',
    howToUseFr: 'Appliquer 2-3 gouttes sur cheveux humides ou secs, en se concentrant sur les pointes. Coiffer comme d\'habitude.',
    newArrival: true
  },
  {
    id: '6',
    name: 'Lavender Dreams Dry Shampoo',
    nameFr: 'Shampooing Sec Rêves de Lavande',
    price: 24,
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop',
    description: 'Refresh your hair between washes with this dreamy dry shampoo that smells like a lavender field.',
    descriptionFr: 'Rafraîchissez vos cheveux entre les lavages avec ce shampooing sec de rêve qui sent comme un champ de lavande.',
    category: 'Styling',
    categoryFr: 'Coiffage',
    ingredients: ['Rice Starch', 'Lavender Oil', 'Oat Powder', 'Bergamot'],
    ingredientsFr: ['Amidon de Riz', 'Huile de Lavande', 'Poudre d\'Avoine', 'Bergamote'],
    howToUse: 'Shake well, spray onto roots, wait 30 seconds, then brush through.',
    howToUseFr: 'Bien agiter, vaporiser sur les racines, attendre 30 secondes, puis brosser.'
  },
  {
    id: '7',
    name: 'Midnight Repair Oil',
    nameFr: 'Huile Réparatrice de Minuit',
    price: 38,
    image: 'https://images.unsplash.com/photo-1629198726484-12ec3ab4b24d?w=400&h=400&fit=crop',
    description: 'An overnight hair treatment oil that works while you sleep to repair and restore damaged hair.',
    descriptionFr: 'Une huile de traitement capillaire nocturne qui agit pendant votre sommeil pour réparer et restaurer les cheveux abîmés.',
    category: 'Treatment',
    categoryFr: 'Traitement',
    ingredients: ['Argan Oil', 'Rosehip Oil', 'Vitamin E', 'Peptides'],
    ingredientsFr: ['Huile d\'Argan', 'Huile de Cynorrhodon', 'Vitamine E', 'Peptides'],
    howToUse: 'Apply 2-3 drops to ends and mid-lengths before bed. Wash out in the morning.',
    howToUseFr: 'Appliquer 2-3 gouttes sur les pointes et mi-longueurs avant le coucher. Laver le matin.'
  },
  {
    id: '8',
    name: 'Crystal Clear Clarifying Shampoo',
    nameFr: 'Shampooing Clarifiant Cristal Clair',
    price: 26,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    description: 'A gentle yet effective clarifying shampoo that removes buildup while maintaining moisture.',
    descriptionFr: 'Un shampooing clarifiant doux mais efficace qui élimine l\'accumulation tout en maintenant l\'hydratation.',
    category: 'Shampoo',
    categoryFr: 'Shampooing',
    ingredients: ['Salicylic Acid', 'Tea Tree Oil', 'Aloe Vera', 'Peppermint'],
    ingredientsFr: ['Acide Salicylique', 'Huile d\'Arbre à Thé', 'Aloe Vera', 'Menthe Poivrée'],
    howToUse: 'Use once a week in place of regular shampoo. Massage into wet hair and rinse thoroughly.',
    howToUseFr: 'Utiliser une fois par semaine à la place du shampooing habituel. Masser sur cheveux mouillés et rincer abondamment.'
  },
  {
    id: '9',
    name: 'Velvet Touch Leave-In Cream',
    nameFr: 'Crème Sans Rinçage Toucher Velours',
    price: 22,
    image: 'https://images.unsplash.com/photo-1610993535036-cd2daffd23fb?w=400&h=400&fit=crop',
    description: 'A lightweight leave-in cream that provides all-day moisture and heat protection.',
    descriptionFr: 'Une crème sans rinçage légère qui fournit une hydratation toute la journée et une protection thermique.',
    category: 'Styling',
    categoryFr: 'Coiffage',
    ingredients: ['Shea Butter', 'Silk Proteins', 'UV Filters', 'Glycerin'],
    ingredientsFr: ['Beurre de Karité', 'Protéines de Soie', 'Filtres UV', 'Glycérine'],
    howToUse: 'Apply to damp hair from mid-length to ends. Style as usual with heat tools if desired.',
    howToUseFr: 'Appliquer sur cheveux humides des mi-longueurs aux pointes. Coiffer comme d\'habitude avec des outils chauffants si désiré.'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previousPage, setPreviousPage] = useState<PageType>('home');
  
  // Order state for payment confirmation
  const [lastOrder, setLastOrder] = useState<{
    orderNumber: string;
    orderDate: string;
    items: CartItem[];
    total: number;
    shippingCost: number;
    customerEmail: string;
  } | null>(null);
  
  // Search and like functionality
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [isLikesOpen, setIsLikesOpen] = useState(false);

  // Loyalty program state
  const [loyaltyMember, setLoyaltyMember] = useState<LoyaltyMember>({
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    points: 1250,
    tier: 'Gold',
    totalSpent: 425,
    joinDate: '2023-06-15',
    referralCode: 'SARAH2024'
  });

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleLike = (productId: string) => {
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

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  const cartShipping = calculateShipping(cartSubtotal);
  const cartTotal = cartSubtotal + cartShipping;

  const cartItemsCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // Filter products based on search query and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get specific product collections
  const bestsellers = mockProducts.filter(product => product.bestseller);
  const newArrivals = mockProducts.filter(product => product.newArrival);
  const editorsPick = mockProducts.find(product => product.editorsPick);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const handleCheckoutSuccess = () => {
    // Add loyalty points for purchase
    const pointsEarned = Math.floor(cartTotal);
    setLoyaltyMember(prev => ({
      ...prev,
      points: prev.points + pointsEarned,
      totalSpent: prev.totalSpent + cartTotal
    }));
    
    // Create order details for confirmation page
    const orderNumber = 'LL' + Date.now().toString().slice(-6);
    const orderDate = new Date().toISOString();
    
    setLastOrder({
      orderNumber,
      orderDate,
      items: [...cartItems],
      total: cartSubtotal,
      shippingCost: cartShipping,
      customerEmail: loyaltyMember.email
    });
    
    setCartItems([]);
    setCurrentPage('payment-confirmation');
  };

  const handleProductClick = (product: Product) => {
    setPreviousPage(currentPage);
    setSelectedProduct(product);
    setCurrentPage('product-details');
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'discover':
        return (
          <DiscoverPage
            products={filteredProducts}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onProductClick={handleProductClick}
            onAddToCart={addToCart}
            bestsellers={bestsellers}
            newArrivals={newArrivals}
            headerProducts={editorsPick ? [editorsPick] : []}
            pageType="discover"
          />
        );
      case 'bestsellers':
        // Filter bestsellers by category
        const filteredBestsellers = bestsellers.filter(product => {
          const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
          const matchesSearch = searchQuery === '' || 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        });
        return (
          <DiscoverPage
            products={filteredBestsellers}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onProductClick={handleProductClick}
            onAddToCart={addToCart}
            bestsellers={bestsellers}
            newArrivals={newArrivals}
            headerProducts={bestsellers}
            pageType="bestsellers"
          />
        );
      case 'new-arrivals':
        // Filter new arrivals by category
        const filteredNewArrivals = newArrivals.filter(product => {
          const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
          const matchesSearch = searchQuery === '' || 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        });
        return (
          <DiscoverPage
            products={filteredNewArrivals}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onProductClick={handleProductClick}
            onAddToCart={addToCart}
            bestsellers={bestsellers}
            newArrivals={newArrivals}
            headerProducts={newArrivals}
            pageType="new-arrivals"
          />
        );
      case 'rewards':
        return (
          <LoyaltyPage
            member={loyaltyMember}
            onUpdateMember={setLoyaltyMember}
            products={mockProducts}
            onProductClick={handleProductClick}
            likedProducts={likedProducts}
            onToggleLike={toggleLike}
          />
        );
      case 'salon':
        return <SalonPage />;
      case 'about':
        return <AboutPage />;
      case 'checkout':
        return (
          <CheckoutPage
            items={cartItems}
            total={cartSubtotal}
            onSuccess={handleCheckoutSuccess}
            onBack={() => setCurrentPage('home')}
          />
        );
      case 'payment-confirmation':
        if (!lastOrder) {
          setCurrentPage('home');
          return null;
        }
        return (
          <PaymentConfirmationPage
            orderNumber={lastOrder.orderNumber}
            orderDate={lastOrder.orderDate}
            items={lastOrder.items}
            total={lastOrder.total}
            shippingCost={lastOrder.shippingCost}
            customerEmail={lastOrder.customerEmail}
            onBackToHome={() => setCurrentPage('home')}
            onContinueShopping={() => setCurrentPage('discover')}
          />
        );
      case 'product-details':
        if (!selectedProduct) {
          setCurrentPage('home');
          return null;
        }
        return (
          <ProductDetailsPage
            product={selectedProduct}
            onAddToCart={addToCart}
            isLiked={likedProducts.has(selectedProduct.id)}
            onToggleLike={() => toggleLike(selectedProduct.id)}
            onNavigate={handleNavigate}
            previousPage={previousPage}
          />
        );
      case 'home':
      default:
        return (
          <>
            <Hero 
              featuredProducts={mockProducts.filter(p => p.featured)}
              onProductClick={handleProductClick}
            />
            <ProductGrid
              products={filteredProducts}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onProductClick={handleProductClick}
              onAddToCart={addToCart}
            />
          </>
        );
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header
          cartItemsCount={cartItemsCount}
          onCartClick={() => setIsCartOpen(true)}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isSearchOpen={isSearchOpen}
          onSearchToggle={() => setIsSearchOpen(!isSearchOpen)}
          loyaltyPoints={loyaltyMember.points}
          bestsellers={bestsellers}
          newArrivals={newArrivals}
        />
        
        <main>
          {renderPage()}
        </main>

        <Footer />

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          total={cartTotal}
          onCheckout={handleCheckout}
          loyaltyMember={loyaltyMember}
        />

        {/* ProductModal is no longer needed as we use ProductDetailsPage */}
      </div>
    </LanguageProvider>
  );
}