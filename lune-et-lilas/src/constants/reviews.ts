export interface Review {
  id: string;
  customerName: string;
  initials: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export const mockReviews: Review[] = [
  {
    id: '1',
    customerName: 'Sarah M.',
    initials: 'SM',
    rating: 5,
    date: '3 weeks ago',
    comment: "Absolutely love this product! The texture is incredible and it leaves my hair feeling so soft and manageable. The scent is divine - not too strong but just right. I've been using it for a month now and I can already see a difference in my hair's health.",
    verified: true
  },
  {
    id: '2',
    customerName: 'Marie L.',
    initials: 'ML',
    rating: 5,
    date: '1 month ago',
    comment: "Ce produit est devenu un incontournable de ma routine capillaire. L'emballage est magnifique et le produit fonctionne à merveille. Mon coiffeur a même remarqué la différence et m'a demandé ce que j'utilisais. Je rachèterai certainement !",
    verified: true
  },
  {
    id: '3',
    customerName: 'Maria K.',
    initials: 'MK',
    rating: 5,
    date: '2 months ago',
    comment: "I have very fine, damaged hair from years of coloring, and this product has been a game-changer. It doesn't weigh my hair down but gives it the nourishment it desperately needed. The results are visible after just a few uses.",
    verified: true
  },
  {
    id: '4',
    customerName: 'Amanda L.',
    initials: 'AL',
    rating: 4,
    date: '6 weeks ago',
    comment: "Great product overall! The only reason I'm giving 4 stars instead of 5 is because I wish it came in a larger size. The quality is excellent and it does exactly what it promises. My hair feels healthier and looks more vibrant.",
    verified: true
  },
  {
    id: '5',
    customerName: 'Claire D.',
    initials: 'CD',
    rating: 5,
    date: '1 week ago',
    comment: "Je suis si contente d'avoir découvert Lune & Lilas ! Ce produit a dépassé mes attentes. La formule est luxueuse, l'emballage est splendide, et surtout, il fonctionne parfaitement sur mes cheveux bouclés. Il définit mes boucles sans les rendre craquantes.",
    verified: true
  },
  {
    id: '6',
    customerName: 'Sophie R.',
    initials: 'SR',
    rating: 5,
    date: '2 weeks ago',
    comment: "Un produit exceptionnel ! J'ai testé beaucoup de marques, mais celle-ci sort vraiment du lot. Mes cheveux n'ont jamais été aussi doux et brillants. Le parfum est subtil et la texture est parfaite.",
    verified: true
  }
];

export const reviewsStats = {
  averageRating: 4.9,
  totalReviews: 127
};