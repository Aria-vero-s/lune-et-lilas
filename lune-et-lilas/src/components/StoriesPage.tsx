import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Heart, Quote } from 'lucide-react';

export function StoriesPage() {
  const stories = [
    {
      id: 1,
      title: 'sarah\'s transformation journey',
      subtitle: 'from damaged to divine',
      content: 'after years of chemical treatments, sarah discovered our gentle formulas and transformed her hair health completely.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c57c7e3d?w=400&h=400&fit=crop',
      author: 'sarah m.',
      location: 'california',
      featured: true
    },
    {
      id: 2,
      title: 'embracing natural curls',
      subtitle: 'a love letter to texture',
      content: 'maria shares how our curl-enhancing products helped her fall in love with her natural texture again.',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop',
      author: 'maria l.',
      location: 'new york'
    },
    {
      id: 3,
      title: 'the founder\'s story',
      subtitle: 'from kitchen to community',
      content: 'discover how hair diary began as a personal quest for natural beauty and grew into a movement of self-love.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      author: 'elena r.',
      location: 'founder'
    },
    {
      id: 4,
      title: 'sustainable beauty',
      subtitle: 'caring for hair and earth',
      content: 'learn about our commitment to sustainable ingredients and eco-friendly packaging that doesn\'t compromise on quality.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      author: 'our team',
      location: 'behind the scenes'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-rose-100 to-pink-100 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-light text-rose-900 mb-6">
              beautiful
              <span className="block italic text-rose-600">stories</span>
            </h1>
            <p className="text-xl text-rose-700 leading-relaxed mb-8">
              every strand tells a story. discover the journeys, transformations, and moments 
              of self-discovery that make our community so special
            </p>
            
            {/* Featured quote */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white shadow-lg max-w-2xl mx-auto">
              <Quote className="w-8 h-8 text-rose-400 mx-auto mb-4" />
              <p className="text-rose-800 italic text-lg leading-relaxed mb-4">
                "hair diary didn't just change my hair routine – it changed how I see myself. 
                every morning ritual became a moment of self-love."
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-10 h-10 bg-rose-300 rounded-full"></div>
                <div>
                  <div className="text-sm font-medium text-rose-900">jessica k.</div>
                  <div className="text-xs text-rose-600">customer since 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories grid */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Featured story - larger card */}
            {stories.filter(story => story.featured).map(story => (
              <div key={story.id} className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-rose-100">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center space-y-6">
                    <div className="space-y-2">
                      <span className="text-sm text-rose-500 uppercase tracking-wide">featured story</span>
                      <h2 className="text-3xl text-rose-900">{story.title}</h2>
                      <h3 className="text-xl text-rose-600 italic">{story.subtitle}</h3>
                    </div>
                    <p className="text-rose-700 leading-relaxed text-lg">{story.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-rose-200 rounded-full"></div>
                        <div>
                          <div className="text-rose-900 font-medium">{story.author}</div>
                          <div className="text-rose-600 text-sm">{story.location}</div>
                        </div>
                      </div>
                      <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50 rounded-full">
                        read full story
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Regular stories grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.filter(story => !story.featured).map((story) => (
              <div key={story.id} className="bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-rose-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-rose-900 mb-1">{story.title}</h3>
                    <h4 className="text-rose-600 italic text-sm">{story.subtitle}</h4>
                  </div>
                  
                  <p className="text-rose-700 text-sm leading-relaxed line-clamp-3">
                    {story.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-rose-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-rose-200 rounded-full"></div>
                      <div>
                        <div className="text-xs font-medium text-rose-900">{story.author}</div>
                        <div className="text-xs text-rose-600">{story.location}</div>
                      </div>
                    </div>
                    <Heart className="w-4 h-4 text-rose-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share your story section */}
      <section className="py-16 bg-gradient-to-br from-rose-200 to-pink-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-light text-rose-900">
                share your story
              </h2>
              <p className="text-rose-700 text-lg leading-relaxed">
                we believe every hair journey is worth celebrating. share your transformation, 
                your favorite ritual, or simply what makes you feel beautiful.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/60 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-rose-900 font-medium mb-2">be featured</h3>
                <p className="text-rose-700 text-sm">get featured on our website and social media</p>
              </div>
              <div className="bg-white/60 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-rose-900 font-medium mb-2">inspire others</h3>
                <p className="text-rose-700 text-sm">help others on their hair journey</p>
              </div>
              <div className="bg-white/60 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">✨</span>
                </div>
                <h3 className="text-rose-900 font-medium mb-2">get rewards</h3>
                <p className="text-rose-700 text-sm">receive exclusive discounts and early access</p>
              </div>
            </div>

            <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full">
              share your story
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}