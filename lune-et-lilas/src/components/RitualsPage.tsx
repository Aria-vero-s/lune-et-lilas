import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Clock, Star } from 'lucide-react';

export function RitualsPage() {
  const rituals = [
    {
      id: 1,
      title: 'morning glow ritual',
      description: 'start your day with this energizing 10-minute routine that leaves your hair silky and radiant',
      time: '10 min',
      difficulty: 'easy',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
      steps: [
        'wet hair with lukewarm water',
        'apply silk dreams shampoo, massage gently',
        'rinse thoroughly and apply rose petal conditioner',
        'finish with 2-3 drops of starlight serum'
      ]
    },
    {
      id: 2,
      title: 'evening restoration',
      description: 'wind down with this deeply nourishing ritual that repairs and rejuvenates while you sleep',
      time: '15 min',
      difficulty: 'medium',
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&h=400&fit=crop',
      steps: [
        'brush hair gently to distribute natural oils',
        'apply golden honey mask from roots to tips',
        'leave on for 10-15 minutes',
        'rinse with cool water and air dry'
      ]
    },
    {
      id: 3,
      title: 'curl enhancement ritual',
      description: 'embrace your natural texture with this curl-defining routine that enhances bounce and shine',
      time: '20 min',
      difficulty: 'medium',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
      steps: [
        'cleanse with sulfate-free shampoo',
        'apply moonlit curls cream to damp hair',
        'scrunch gently and diffuse on low heat',
        'finish with a light mist of lavender dreams dry shampoo'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="bg-accent section-spacing">
        <div className="container-standard">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-foreground" style={{ fontFamily: 'var(--font-family-secondary)' }}>
              Hair Care Rituals
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Transform your daily routine into moments of mindful self-care with our 
              curated collection of hair rituals, designed to nourish both your hair and soul.
            </p>
            <div className="flex items-center justify-center space-x-6 text-foreground">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">rituals</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5-20</div>
                <div className="text-sm text-muted-foreground">minutes</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">natural</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rituals grid */}
      <section className="section-spacing bg-white">
        <div className="container-standard">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {rituals.map((ritual) => (
              <div key={ritual.id} className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={ritual.image}
                    alt={ritual.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-primary">
                      <Clock className="w-4 h-4" />
                      <span>{ritual.time}</span>
                      <span>•</span>
                      <span className="capitalize">{ritual.difficulty}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-accent fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-foreground mb-2 font-semibold">{ritual.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {ritual.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-foreground text-sm font-medium">steps:</h4>
                    <ul className="space-y-1">
                      {ritual.steps.map((step, index) => (
                        <li key={index} className="flex items-start space-x-2 text-xs text-muted-foreground">
                          <span className="w-4 h-4 bg-accent rounded-full flex items-center justify-center text-accent-foreground flex-shrink-0 mt-0.5 font-medium">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-primary hover:bg-lilac-600 text-white rounded-full">
                    try this ritual
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="section-spacing bg-accent">
        <div className="container-standard text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-foreground" style={{ fontFamily: 'var(--font-family-secondary)' }}>
              Create Your Personal Ritual
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every head of hair is unique, and so should be your ritual. 
              Take our quiz to discover the perfect routine for your hair type and lifestyle.
            </p>
            <Button size="lg" className="bg-primary hover:bg-lilac-600 text-white px-8 py-4 rounded-full">
              take the hair quiz
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}