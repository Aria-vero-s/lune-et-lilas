import { Star } from 'lucide-react';
import { Button } from './ui/button';
import type { mockReviews, reviewsStats, Review } from '../constants/reviews';
import { useLanguage } from '../utils/LanguageContext';

interface ReviewsSectionProps {
  productId: string;
}

function ReviewCard({ review }: { review: Review }) {
  const { language, t } = useLanguage();
  
  // Helper function to format date based on language
  const formatDate = (dateStr: string) => {
    if (language === 'fr') {
      // Convert English relative dates to French
      if (dateStr.includes('week ago')) return 'il y a 1 semaine';
      if (dateStr.includes('weeks ago')) {
        const weeks = dateStr.match(/(\d+)/)?.[0];
        return `il y a ${weeks} semaines`;
      }
      if (dateStr.includes('month ago')) return 'il y a 1 mois';
      if (dateStr.includes('months ago')) {
        const months = dateStr.match(/(\d+)/)?.[0];
        return `il y a ${months} mois`;
      }
      return dateStr;
    }
    return dateStr;
  };

  return (
    <div className="container-standard p-[0px] px-[0px] py-[32px] px-[0px] py-[32px]">
      <div className="w-full bg-white rounded-3xl p-8 border border-border shadow-sm">
        <div className="flex items-start space-x-4 w-full">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="font-semibold text-primary">{review.initials}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-foreground">{review.customerName}</h4>
                <p className="text-sm text-muted-foreground">
                  {review.verified ? t.verifiedPurchase : t.purchase} • {formatDate(review.date)}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < review.rating ? 'text-primary fill-current' : 'text-muted-foreground'
                    }`} 
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              "{review.comment}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection({ productId }: ReviewsSectionProps) {
  const { t } = useLanguage();
  
  return (
    <div id="reviews-section" className="mt-16 lg:mt-20">
      {/* Title section - centered with container */}
      <div className="container-standard">
        <div className="text-center mb-12">
          <h1 className="mb-4 text-4xl lg:text-5xl xl:text-6xl" style={{ fontFamily: 'var(--font-family-secondary)' }}>
            {t.customerReviews}
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-primary fill-current" />
              ))}
            </div>
            <span className="text-xl font-semibold text-foreground">
              {reviewsStats.averageRating} {t.outOf} 5
            </span>
            <span className="text-muted-foreground">
              ({reviewsStats.totalReviews} {t.reviewsCount})
            </span>
          </div>
        </div>
      </div>

      {/* Reviews section - full width */}
      <div>
        <div className="space-y-8">
          {mockReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Load more reviews button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="px-8 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            {t.loadMoreReviews}
          </Button>
        </div>
      </div>
    </div>
  );
}