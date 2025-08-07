import { Heart, Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useLanguage } from '../utils/LanguageContext';

export function Footer() {
  const { language, t } = useLanguage();

  const discoverLinks = [t.allProducts, t.newArrivals, t.bestsellers];
  const helpLinks = [t.contactUs, t.shippingInfo, t.returns];
  const storyLinks = [t.aboutUs, t.sustainability, language === 'en' ? 'Ingredients' : 'Ingrédients'];

  return (
    <footer className="bg-accent section-spacing">
      <div className="container-standard">
        {/* Newsletter section */}
        <div className="text-center mb-16">
          <h3 className="mb-6 text-3xl lg:text-4xl text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
            {t.joinCommunity}
          </h3>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            {t.communityDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={language === 'en' ? 'Your email address' : 'Votre adresse email'}
              className="flex-1 bg-white border-border focus:border-primary rounded-full px-6 py-3"
            />
            <Button className="bg-primary hover:bg-lilac-600 text-white px-6 py-3 rounded-full whitespace-nowrap">
              {t.subscribe}
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            {t.spamFree}
          </p>
        </div>

        {/* Main footer content */}
        <div className="md:hidden">
          {/* Mobile/Tablet: Centered layout */}
          <div className="text-center space-y-8 mb-12">
            {/* Brand section - centered */}
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-wide" style={{ fontFamily: 'var(--font-family-secondary)' }}>
                  Lune & Lilas
                </h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                {language === 'en' 
                  ? 'Crafting beautiful hair care products with love, intention, and the finest natural ingredients.'
                  : 'Créer de beaux produits capillaires avec amour, intention et les meilleurs ingrédients naturels.'
                }
              </p>
              
              {/* Social links - centered */}
              <div className="flex justify-center space-x-2 pt-4">
                <Button variant="ghost" size="sm" className="rounded-full p-2">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full p-2">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full p-2">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full p-2">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Navigation links - in a grid but centered */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto text-center">
              {/* Quick links */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">{t.discover}</h4>
                <ul className="space-y-2">
                  {discoverLinks.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">{t.help}</h4>
                <ul className="space-y-2">
                  {helpLinks.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">{t.ourStory}</h4>
                <ul className="space-y-2">
                  {storyLinks.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Original layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-1 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-primary tracking-wide" style={{ fontFamily: 'var(--font-family-secondary)' }}>
                Lune & Lilas
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'en' 
                ? 'Crafting beautiful hair care products with love, intention, and the finest natural ingredients.'
                : 'Créer de beaux produits capillaires avec amour, intention et les meilleurs ingrédients naturels.'
              }
            </p>
            
            {/* Social links */}
            <div className="flex space-x-2 pt-4">
              <Button variant="ghost" size="sm" className="rounded-full p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full p-2">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-span-1">
            <h4 className="font-semibold text-foreground mb-4">{t.discover}</h4>
            <ul className="space-y-2">
              {discoverLinks.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="col-span-1">
            <h4 className="font-semibold text-foreground mb-4">{t.help}</h4>
            <ul className="space-y-2">
              {helpLinks.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="col-span-1">
            <h4 className="font-semibold text-foreground mb-4">{t.ourStory}</h4>
            <ul className="space-y-2">
              {storyLinks.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border pt-8 flex flex-col items-center justify-center md:flex-row md:justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4 md:mb-0">
            <span>{t.madeWith}</span>
            <Heart className="w-4 h-4 text-primary fill-current" />
            <span>{t.forBeautifulHair}</span>
          </div>
          
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">{t.privacyPolicy}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t.termsOfService}</a>
            <span>© 2025 Lune & Lilas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}