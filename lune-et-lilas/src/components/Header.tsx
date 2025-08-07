import { ShoppingBag, Search, Menu, X, User, ChevronDown, Languages } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import type { PageType, Product } from '../App';
import { useLanguage } from '../utils/LanguageContext';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSearchOpen: boolean;
  onSearchToggle: () => void;

  loyaltyPoints?: number;
  bestsellers?: Product[];
  newArrivals?: Product[];
}

export function Header({ 
  cartItemsCount, 
  onCartClick, 
  currentPage, 
  onNavigate,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  onSearchToggle,
  loyaltyPoints = 0,
  bestsellers = [],
  newArrivals = []
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  const navigationItems = [
    { key: 'salon' as PageType, label: t.ourSalon },
    { key: 'about' as PageType, label: t.about }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container-standard py-4">
          <div className="flex items-center justify-between w-full">
            {/* Left section - Logo only */}
            <div className="flex items-center">
              <button 
                onClick={() => onNavigate('home')}
                className="text-left"
              >
                <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-wide whitespace-nowrap" style={{ fontFamily: 'var(--font-family-secondary)' }}>
                  Lune & Lilas
                </h1>
              </button>
            </div>

            {/* Right section - All navigation and icons */}
            <div className="flex items-center space-x-6">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                {/* Discover dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`text-base font-medium transition-colors relative group flex items-center space-x-1 ${
                        ['discover', 'bestsellers', 'new-arrivals'].includes(currentPage) 
                          ? 'text-primary' : 'text-foreground hover:text-primary'
                      }`}
                    >
                      <span>{t.discover}</span>
                      <ChevronDown className="h-5 w-5" />
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all rounded-full ${
                        ['discover', 'bestsellers', 'new-arrivals'].includes(currentPage) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-72 p-2 bg-white/95 backdrop-blur-sm border border-border shadow-xl rounded-2xl">
                    <div className="space-y-1">
                      <DropdownMenuItem 
                        onClick={() => onNavigate('discover')}
                        className="cursor-pointer rounded-xl p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex flex-col items-start space-y-1">
                          <span className="font-medium text-foreground">{t.allProducts}</span>
                          <span className="text-sm text-muted-foreground">{t.browseComplete}</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onNavigate('bestsellers')}
                        className="cursor-pointer rounded-xl p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex flex-col items-start space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{t.bestsellers}</span>
                            <div className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-sm font-medium">
                              {bestsellers.length}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{t.mostLoved}</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onNavigate('new-arrivals')}
                        className="cursor-pointer rounded-xl p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex flex-col items-start space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{t.newArrivals}</span>
                            <div className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-sm font-medium">
                              {newArrivals.length}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{t.freshAdditions}</span>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Other navigation items */}
                {navigationItems.map(item => (
                  <button
                    key={item.key}
                    onClick={() => onNavigate(item.key)}
                    className={`text-base font-medium transition-colors relative group ${
                      currentPage === item.key ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all rounded-full ${
                      currentPage === item.key ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </button>
                ))}
              </nav>

              {/* Action buttons */}
              <div className="flex items-center space-x-3">
                {/* Language toggle - Desktop */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden lg:flex items-center space-x-2 p-4"
                  onClick={toggleLanguage}
                >
                  <Languages className="h-6 w-6" />
                  <span className="text-sm font-medium">{language === 'en' ? 'FR' : 'EN'}</span>
                </Button>

                {/* Profile dropdown */}
                {loyaltyPoints > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="hidden sm:flex items-center space-x-2 text-primary hover:bg-accent px-4 py-3 rounded-full transition-colors">
                        <User className="h-6 w-6" />
                        <span className="font-medium text-base">{loyaltyPoints}</span>
                        <ChevronDown className="h-5 w-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 z-50">
                      <DropdownMenuItem 
                        onClick={() => onNavigate('rewards')}
                        className="cursor-pointer p-3"
                      >
                        <div className="flex flex-col items-start space-y-1">
                          <span className="font-medium text-foreground text-sm">{language === 'en' ? 'View Rewards' : 'Voir les Récompenses'}</span>
                          <span className="text-sm text-muted-foreground">{loyaltyPoints} {language === 'en' ? 'points available' : 'points disponibles'}</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => {
                          console.log('Logout clicked');
                          // Add logout functionality here later
                        }}
                        className="cursor-pointer p-3"
                      >
                        <div className="flex flex-col items-start space-y-1">
                          <span className="font-medium text-foreground text-sm">{language === 'en' ? 'Logout' : 'Déconnexion'}</span>
                          <span className="text-sm text-muted-foreground">{language === 'en' ? 'Sign out of your account' : 'Se déconnecter de votre compte'}</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-4"
                  onClick={onSearchToggle}
                >
                  <Search className="h-7 w-7" />
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative p-4"
                  onClick={onCartClick}
                >
                  <ShoppingBag className="h-7 w-7" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-sm rounded-full h-7 w-7 flex items-center justify-center font-medium">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>

                {/* Mobile menu button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="lg:hidden p-4"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu - slides down when open */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-sm">
            <div className="container-standard py-6">
              <nav className="space-y-4">
                {/* Language toggle - Mobile */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-3 w-full text-left font-medium text-foreground hover:text-primary transition-colors py-3"
                >
                  <Languages className="h-5 w-5" />
                  <span>{t.language}: {language === 'en' ? t.french : t.english}</span>
                </button>

                {/* Discover section */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground text-lg">{t.discover}</h3>
                  <div className="space-y-2 ml-4">
                    <button
                      onClick={() => {
                        onNavigate('discover');
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-muted-foreground hover:text-primary transition-colors py-2"
                    >
                      {t.allProducts}
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('bestsellers');
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-muted-foreground hover:text-primary transition-colors py-2"
                    >
                      {t.bestsellers} ({bestsellers.length})
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('new-arrivals');
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-muted-foreground hover:text-primary transition-colors py-2"
                    >
                      {t.newArrivals} ({newArrivals.length})
                    </button>
                  </div>
                </div>

                {/* Other navigation items */}
                {navigationItems.map(item => (
                  <button
                    key={item.key}
                    onClick={() => {
                      onNavigate(item.key);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left font-medium text-foreground hover:text-primary transition-colors py-3 capitalize"
                  >
                    {item.label}
                  </button>
                ))}

                {/* Profile/Rewards link for mobile */}
                {loyaltyPoints > 0 && (
                  <button
                    onClick={() => {
                      onNavigate('rewards');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left font-medium text-primary hover:text-primary/80 transition-colors py-3"
                  >
                    {language === 'en' ? 'Rewards' : 'Récompenses'} ({loyaltyPoints} {language === 'en' ? 'points' : 'points'})
                  </button>
                )}
              </nav>
            </div>
          </div>
        )}

        {/* Search bar - slides down when open */}
        {isSearchOpen && (
          <div className="border-t border-border bg-white/95 backdrop-blur-sm">
            <div className="container-standard py-4">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={language === 'en' ? 'Search products, categories, or ingredients...' : 'Rechercher produits, catégories ou ingrédients...'}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 bg-white border-border focus:border-primary rounded-full"
                    autoFocus
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onSearchToggle}
                  className="p-4"
                >
                  <X className="h-7 w-7" />
                </Button>
              </div>
            </div>
          </div>
        )}

      </header>
    </>
  );
}