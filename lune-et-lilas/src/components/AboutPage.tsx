import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Heart, Leaf, Users, Award } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

export function AboutPage() {
  const { language, t } = useLanguage();

  const getValues = () => [
    {
      icon: Heart,
      title: language === 'en' ? 'made with love' : 'fabriqué avec amour',
      description: language === 'en' 
        ? 'every product is crafted with intention, care, and a deep respect for the ritual of self-care'
        : 'chaque produit est conçu avec intention, soin et un profond respect pour le rituel de l\'auto-soin'
    },
    {
      icon: Leaf,
      title: language === 'en' ? 'naturally beautiful' : 'naturellement beau',
      description: language === 'en' 
        ? 'we source the finest natural ingredients, ensuring our formulas are as pure as they are effective'
        : 'nous nous approvisionnons en ingrédients naturels les plus fins, garantissant que nos formules sont aussi pures qu\'efficaces'
    },
    {
      icon: Users,
      title: language === 'en' ? 'community first' : 'communauté d\'abord',
      description: language === 'en' 
        ? 'our community drives everything we do – from product development to our commitment to inclusivity'
        : 'notre communauté guide tout ce que nous faisons – du développement de produits à notre engagement envers l\'inclusivité'
    },
    {
      icon: Award,
      title: language === 'en' ? 'quality promise' : 'promesse de qualité',
      description: language === 'en' 
        ? 'rigorous testing and quality control ensure every product meets our highest standards'
        : 'des tests rigoureux et un contrôle qualité garantissent que chaque produit répond à nos plus hauts standards'
    }
  ];

  const getTeam = () => [
    {
      name: 'elena rodriguez',
      role: language === 'en' ? 'founder & creative director' : 'fondatrice & directrice créative',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
      bio: language === 'en' 
        ? 'former chemist turned beauty entrepreneur, elena founded Lune & Lilas to create products that honor both science and soul.'
        : 'ancienne chimiste devenue entrepreneuse beauté, elena a fondé Lune & Lilas pour créer des produits qui honorent à la fois la science et l\'âme.'
    },
    {
      name: 'maya chen',
      role: language === 'en' ? 'head of product development' : 'responsable du développement produit',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop',
      bio: language === 'en' 
        ? 'with 15 years in cosmetic chemistry, maya ensures every formula is both luxurious and effective.'
        : 'avec 15 ans en chimie cosmétique, maya s\'assure que chaque formule soit à la fois luxueuse et efficace.'
    },
    {
      name: 'sofia ahmed',
      role: language === 'en' ? 'sustainability director' : 'directrice de la durabilité',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop',
      bio: language === 'en' 
        ? 'leading our mission towards zero waste, sofia oversees our sustainable packaging and ingredient sourcing.'
        : 'dirigeant notre mission vers zéro déchet, sofia supervise notre emballage durable et notre approvisionnement en ingrédients.'
    }
  ];

  const values = getValues();
  const team = getTeam();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="bg-accent overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="container-standard py-16 lg:py-24 w-full">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl text-foreground leading-tight" style={{ fontFamily: 'var(--font-family-secondary)' }}>
                {language === 'en' ? 'Our Story Begins With You' : 'Notre Histoire Commence Avec Vous'}
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {language === 'en' 
                  ? 'Lune & Lilas was born from a simple belief: that every person deserves to feel beautiful in their own skin, and that the journey to self-love often begins with the smallest daily rituals.'
                  : 'Lune & Lilas est né d\'une croyance simple : que chaque personne mérite de se sentir belle dans sa propre peau, et que le voyage vers l\'amour de soi commence souvent par les plus petits rituels quotidiens.'
                }
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-lilac-600 text-white px-8 py-4 rounded-full">
                {language === 'en' ? 'our mission' : 'notre mission'}
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-border text-foreground hover:bg-accent px-8 py-4 rounded-full">
                {language === 'en' ? 'sustainability' : 'durabilité'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="section-spacing bg-white">
        <div className="container-standard">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-4xl lg:text-5xl text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
              {language === 'en' ? 'What We Believe' : 'Ce En Quoi Nous Croyons'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'en' 
                ? 'Our values guide every decision we make, from the ingredients we choose to the way we build our community.'
                : 'Nos valeurs guident chaque décision que nous prenons, des ingrédients que nous choisissons à la façon dont nous construisons notre communauté.'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-foreground font-semibold">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="section-spacing bg-accent">
        <div className="container-standard">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-4xl lg:text-5xl text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
              {language === 'en' ? 'Meet the Dreamers' : 'Rencontrez les Rêveuses'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'en' 
                ? 'The passionate team behind Lune & Lilas, united by a shared vision of making beauty accessible, sustainable, and authentic.'
                : 'L\'équipe passionnée derrière Lune & Lilas, unie par une vision partagée de rendre la beauté accessible, durable et authentique.'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg border border-border">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-foreground mb-1 font-semibold">{member.name}</h3>
                <p className="text-primary text-sm mb-4 italic" style={{ fontFamily: 'var(--font-family-secondary)' }}>
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="section-spacing bg-white">
        <div className="container-standard">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
                  {language === 'en' ? 'Our Mission' : 'Notre Mission'}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {language === 'en' 
                      ? 'We believe that beauty rituals should be moments of mindfulness, self-care, and joy. Our mission is to create products that not only transform your hair but also nurture your relationship with yourself.'
                      : 'Nous croyons que les rituels de beauté doivent être des moments de pleine conscience, d\'auto-soin et de joie. Notre mission est de créer des produits qui non seulement transforment vos cheveux mais nourrissent aussi votre relation avec vous-même.'
                    }
                  </p>
                  <p>
                    {language === 'en' 
                      ? 'Every formula is developed with intention, using sustainably sourced ingredients that respect both your hair and our planet. We\'re committed to transparency, inclusivity, and building a community where everyone feels seen and celebrated.'
                      : 'Chaque formule est développée avec intention, utilisant des ingrédients sourcés de manière durable qui respectent à la fois vos cheveux et notre planète. Nous nous engageons à la transparence, à l\'inclusivité et à construire une communauté où chacun se sent vu et célébré.'
                    }
                  </p>
                </div>
                <Button className="bg-primary hover:bg-lilac-600 text-white px-8 py-3 rounded-full">
                  {language === 'en' ? 'join our community' : 'rejoindre notre communauté'}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
                    alt={language === 'en' ? "Natural ingredients" : "Ingrédients naturels"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden mt-8">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop"
                    alt={language === 'en' ? "Sustainable packaging" : "Emballage durable"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden -mt-8">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop"
                    alt={language === 'en' ? "Hair care ritual" : "Rituel capillaire"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop"
                    alt={language === 'en' ? "Community" : "Communauté"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
        </div>
      </section>


    </div>
  );
}