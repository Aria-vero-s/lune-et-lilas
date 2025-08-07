export type Language = 'en' | 'fr';

export interface Translations {
  // Header
  discover: string;
  allProducts: string;
  browseComplete: string;
  bestsellers: string;
  mostLoved: string;
  newArrivals: string;
  freshAdditions: string;
  ourSalon: string;
  about: string;
  backToShopping: string;
  
  // Hero
  discoverYour: string;
  hairsNatural: string;
  beauty: string;
  heroDescription: string;
  shopCollection: string;
  learnMore: string;
  natural: string;
  customers: string;
  rating: string;
  featured: string;
  
  // Product related
  viewDetails: string;
  addToCart: string;
  ingredients: string;
  howToUse: string;
  bestseller: string;
  newArrival: string;
  editorsPick: string;
  category: string;
  price: string;
  originalPrice: string;
  
  // Pages
  editorsPickTitle: string;
  editorsPickSubtitle: string;
  bestsellersTitle: string;
  bestsellersSubtitle: string;
  newArrivalsTitle: string;
  newArrivalsSubtitle: string;
  
  // Categories
  all: string;
  shampoo: string;
  conditioner: string;
  treatment: string;
  styling: string;
  
  // Cart
  cart: string;
  yourCart: string;
  emptyCart: string;
  emptyCartDescription: string;
  subtotal: string;
  shipping: string;
  total: string;
  checkout: string;
  freeShipping: string;
  standardShipping: string;
  loyaltyPoints: string;
  earnPoints: string;
  
  // Checkout
  shippingDetails: string;
  securePayment: string;
  step: string;
  of: string;
  personalInformation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentInformation: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  continueToPayment: string;
  placeOrder: string;
  
  // Footer
  joinCommunity: string;
  communityDescription: string;
  subscribe: string;
  spamFree: string;
  help: string;
  contactUs: string;
  shippingInfo: string;
  returns: string;
  ourStory: string;
  aboutUs: string;
  sustainability: string;
  madeWith: string;
  forBeautifulHair: string;
  privacyPolicy: string;
  termsOfService: string;
  
  // Language
  language: string;
  english: string;
  french: string;
  
  // Salon
  bookAppointment: string;
  salonServices: string;
  hairCut: string;
  hairColor: string;
  hairTreatment: string;
  appointmentSummary: string;
  dateAndTime: string;
  service: string;
  yourBeautifulName: string;
  emailAddress: string;
  phoneNumber: string;
  sweetReminder: string;
  anythingSpecial: string;
  firstVisit: string;
  whatShouldWeCallYou: string;
  yourEmail: string;
  phoneNumberPlaceholder: string;
  tellUsAboutHair: string;
  
  // About
  ourMission: string;
  ourValues: string;
  sustainableBeauty: string;
  
  // ProductGrid
  ourHairCareRituals: string;
  hairCareRitualsDescription: string;
  
  // Cart
  remove: string;
  itemRemoved: string;
  continueShoping: string;
  
  // Product Details
  relatedProducts: string;
  youMightAlsoLike: string;
  addedToCart: string;
  quantity: string;
  
  // About Page
  ourStoryTitle: string;
  ourStoryContent: string;
  sustainabilityTitle: string;
  sustainabilityContent: string;
  ingredientsTitle: string;
  ingredientsContent: string;
  
  // Salon Page
  welcomeToOurSalon: string;
  salonDescription: string;
  ourServices: string;
  hairCutService: string;
  hairCutDescription: string;
  hairColorService: string;
  hairColorDescription: string;
  hairTreatmentService: string;
  hairTreatmentDescription: string;
  bookingProcess: string;
  selectService: string;
  chooseDateTime: string;
  confirmDetails: string;
  selectYourService: string;
  availableTimes: string;
  confirmBooking: string;
  personalDetails: string;
  specialRequests: string;
  bookingConfirmed: string;
  thankYouBooking: string;
  bookingReference: string;
  
  // Loyalty/Rewards
  welcomeBack: string;
  yourProgress: string;
  pointsToNext: string;
  rewardsAvailable: string;
  redeem: string;
  referFriend: string;
  shareCode: string;
  earnMorePoints: string;
  
  // Loyalty Page Complete
  welcomeBackMember: string;
  youAreAMember: string;
  pointsReadyToUse: string;
  since: string;
  availableToRedeem: string;
  totalSpent: string;
  progressTo: string;
  spendMoreToReach: string;
  
  // Tabs
  rewards: string;
  benefits: string;
  wishlist: string;
  history: string;
  
  // Rewards Tab
  redeemYourPoints: string;
  chooseFromRewards: string;
  rewardRedeemed: string;
  hasBeenAdded: string;
  checkEmailForDetails: string;
  platinumOnly: string;
  unavailable: string;
  points: string;
  redeemNow: string;
  needMorePoints: string;
  
  // Benefits Tab
  yourBenefits: string;
  enjoyPerks: string;
  currentBenefits: string;
  unlock: string;
  
  // Wishlist Tab
  yourWishlist: string;
  productsSavedForLater: string;
  wishlistEmpty: string;
  startExploring: string;
  exploreProducts: string;
  
  // History Tab
  pointsHistory: string;
  trackPointsEarnings: string;
  
  // Tier Benefits
  pointsPerDollar: string;
  birthdaySurprise: string;
  freeShippingOver50: string;
  freeShippingOver25: string;
  exclusiveProducts: string;
  priorityCustomerService: string;
  vipExperiences: string;
  personalStylist: string;
  freeShippingAlways: string;
  exclusiveEvents: string;
  
  // Reward Categories
  product: string;
  discount: string;
  experience: string;
  exclusive: string;
  
  // Reward Names
  freeSilkShampoo: string;
  twentyPercentOff: string;
  vipSalonExperience: string;
  earlyAccessPass: string;
  freeMoonlitCream: string;
  foundersCircleInvitation: string;
  
  // Reward Descriptions
  bestsellingShampoo: string;
  saveOnNextOrder: string;
  privateSalonConsultation: string;
  earlyAccessProducts: string;
  perfectForCurls: string;
  exclusiveMonthlySessions: string;
  
  // Transaction Types
  purchase: string;
  reward: string;
  referral: string;
  bonus: string;
  order: string;
  redeemed: string;
  friendJoined: string;
  welcomeBonus: string;
  
  // Discovery Pages
  shopNow: string;
  filterBy: string;
  sortBy: string;
  priceRange: string;
  
  // Navigation
  back: string;
  continue: string;
  backToHome: string;
  
  // Calendar/Time
  january: string;
  february: string;
  march: string;
  april: string;
  may: string;
  june: string;
  july: string;
  august: string;
  september: string;
  october: string;
  november: string;
  december: string;
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  morning: string;
  afternoon: string;
  evening: string;
  
  // Common
  view: string;
  close: string;
  next: string;
  previous: string;
  loading: string;
  error: string;
  success: string;
  
  // Additional Cart translations
  yourCartEmpty: string;
  discoverBeautiful: string;
  continueShopping: string;
  items: string;
  item: string;
  each: string;
  pointsToEarn: string;
  checkoutSecurely: string;
  free: string;
  orderSummary: string;
  qty: string;
  freeShippingFor: string;
  orderFor: string;
  secureCheckoutSSL: string;
  thirtyDayReturn: string;
  yourPaymentSecure: string;
  processing: string;
  addMore: string;
  moreForFreeShipping: string;
  freeShippingIncluded: string;
  
  // Payment Confirmation
  orderConfirmed: string;
  thankYouForOrder: string;
  orderConfirmationMessage: string;
  orderNumber: string;
  estimatedDelivery: string;
  confirmationSentTo: string;
  orderTotal: string;
  whatHappensNext: string;
  orderProcessingMessage: string;
  shippingNotificationMessage: string;
  deliveryMessage: string;
  downloadReceipt: string;
  thankYouMessage: string;
  followUsMessage: string;
  
  // Product Details Page
  perfectFor: string;
  perfectForDescription: string;
  keyIngredients: string;
  cleanSustainable: string;
  cleanSustainableDescription: string;
  howToUseLabel: string;
  proTip: string;
  proTipDescription: string;
  moreViews: string;
  addToCartButton: string;
  earnLoyaltyPoints: string;
  dayReturns: string;
  ritual: string;
  reviews: string;
  
  // Reviews Section
  customerReviews: string;
  outOf: string;
  reviewsCount: string;
  verifiedPurchase: string;
  purchase: string;
  loadMoreReviews: string;
  weeksAgo: string;
  monthAgo: string;
  monthsAgo: string;
  weekAgo: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    discover: 'discover',
    allProducts: 'All Products',
    browseComplete: 'Browse our complete collection',
    bestsellers: 'Bestsellers',
    mostLoved: 'Our most loved products',
    newArrivals: 'New Arrivals',
    freshAdditions: 'Fresh additions to your ritual',
    ourSalon: 'our salon',
    about: 'about',
    backToShopping: 'back to shopping',
    
    // Hero
    discoverYour: 'Discover Your',
    hairsNatural: "Hair's Natural",
    beauty: 'Beauty',
    heroDescription: 'Discover our curated collection of transformative hair care rituals, crafted with intention and the finest natural ingredients.',
    shopCollection: 'Shop Collection',
    learnMore: 'Learn More',
    natural: 'Natural',
    customers: 'Customers',
    rating: 'Rating',
    featured: 'Featured',
    
    // Product related
    viewDetails: 'view details',
    addToCart: 'add to cart',
    ingredients: 'Ingredients',
    howToUse: 'How to Use',
    bestseller: 'bestseller',
    newArrival: 'new arrival',
    editorsPick: "editor's pick",
    category: 'Category',
    price: 'Price',
    originalPrice: 'Original Price',
    
    // Pages
    editorsPickTitle: "editor's pick",
    editorsPickSubtitle: 'our curated selection of the most exquisite hair care ritual',
    bestsellersTitle: 'our bestsellers',
    bestsellersSubtitle: 'the most loved products by our beautiful souls',
    newArrivalsTitle: 'new arrivals',
    newArrivalsSubtitle: 'fresh additions to your self-care ritual',
    
    // Categories
    all: 'All',
    shampoo: 'Shampoo',
    conditioner: 'Conditioner',
    treatment: 'Treatment',
    styling: 'Styling',
    
    // Cart
    cart: 'Cart',
    yourCart: 'Your Cart',
    emptyCart: 'Your cart is empty',
    emptyCartDescription: 'Add some beautiful products to get started',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    checkout: 'Checkout',
    freeShipping: 'Free shipping',
    standardShipping: 'Standard shipping',
    loyaltyPoints: 'Loyalty Points',
    earnPoints: 'Earn points with your purchase',
    
    // Checkout
    shippingDetails: 'shipping details',
    securePayment: 'secure payment',
    step: 'step',
    of: 'of',
    personalInformation: 'Personal Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    shippingAddress: 'Shipping Address',
    address: 'Address',
    city: 'City',
    postalCode: 'Postal Code',
    country: 'Country',
    paymentInformation: 'Payment Information',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvv: 'CVV',
    cardholderName: 'Cardholder Name',
    continueToPayment: 'Continue to Payment',
    placeOrder: 'Place Order',
    
    // Footer
    joinCommunity: 'Join Our Community',
    communityDescription: 'Get weekly hair care tips, exclusive offers, and be the first to know about new arrivals. Let\'s create beautiful hair stories together.',
    subscribe: 'Subscribe',
    spamFree: 'We promise to keep your inbox beautiful and spam-free',
    help: 'Help',
    contactUs: 'Contact Us',
    shippingInfo: 'Shipping Info',
    returns: 'Returns',
    ourStory: 'Our Story',
    aboutUs: 'About Us',
    sustainability: 'Sustainability',
    madeWith: 'Made with',
    forBeautifulHair: 'for beautiful hair everywhere',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    
    // Language
    language: 'Language',
    english: 'English',
    french: 'Français',
    
    // Salon
    bookAppointment: 'Book Appointment',
    salonServices: 'Salon Services',
    hairCut: 'Hair Cut',
    hairColor: 'Hair Color',
    hairTreatment: 'Hair Treatment',
    appointmentSummary: 'Appointment Summary',
    dateAndTime: 'Date & Time',
    service: 'Service',
    yourBeautifulName: 'Your Beautiful Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    sweetReminder: 'We\'ll send you a sweet reminder the day before',
    anythingSpecial: 'Anything Special We Should Know?',
    firstVisit: 'This is my first visit to Lune & Lilas',
    whatShouldWeCallYou: 'What should we call you?',
    yourEmail: 'your@email.com',
    phoneNumberPlaceholder: '(555) 123-4567',
    tellUsAboutHair: 'Tell us about your hair goals, any allergies, or just say hi!',
    
    // About
    ourMission: 'Our Mission',
    ourValues: 'Our Values',
    sustainableBeauty: 'Sustainable Beauty',
    
    // ProductGrid
    ourHairCareRituals: 'Our Hair Care Rituals',
    hairCareRitualsDescription: 'Each product in our collection is carefully crafted to nurture your hair and awaken your senses. Discover the perfect ritual for your unique beauty.',
    
    // Cart
    remove: 'Remove',
    itemRemoved: 'Item removed from cart',
    continueShoping: 'Continue Shopping',
    
    // Product Details
    relatedProducts: 'Related Products',
    youMightAlsoLike: 'You might also like',
    addedToCart: 'Added to cart',
    quantity: 'Quantity',
    
    // About Page
    ourStoryTitle: 'Our Story',
    ourStoryContent: 'Born from a passion for natural beauty and sustainable practices, Lune & Lilas creates transformative hair care rituals that honor both your hair and the planet. Each product is carefully crafted with intention, love, and the finest natural ingredients.',
    sustainabilityTitle: 'Sustainability',
    sustainabilityContent: 'We believe beauty should never come at the cost of our planet. Our products are created with sustainable practices, eco-friendly packaging, and ethically sourced ingredients that respect both your hair and the environment.',
    ingredientsTitle: 'Natural Ingredients',
    ingredientsContent: 'Every formula features precious botanicals, nourishing oils, and active ingredients sourced from nature. We believe in the power of plants to transform your hair care ritual into a moment of pure indulgence.',
    
    // Salon Page
    welcomeToOurSalon: 'Welcome to Our Salon',
    salonDescription: 'Experience personalized hair care in our serene, luxurious space. Our expert stylists combine artistry with our signature products to create your perfect look.',
    ourServices: 'Our Services',
    hairCutService: 'Hair Cut & Styling',
    hairCutDescription: 'Precision cuts and beautiful styling tailored to your unique features and lifestyle',
    hairColorService: 'Hair Coloring',
    hairColorDescription: 'Natural, stunning color transformations using our eco-friendly coloring system',
    hairTreatmentService: 'Deep Treatment',
    hairTreatmentDescription: 'Intensive repair and nourishment treatments for all hair types and concerns',
    bookingProcess: 'Book Your Appointment',
    selectService: 'Select Service',
    chooseDateTime: 'Choose Date & Time',
    confirmDetails: 'Confirm Details',
    selectYourService: 'Select Your Service',
    availableTimes: 'Available Times',
    confirmBooking: 'Confirm Booking',
    personalDetails: 'Personal Details',
    specialRequests: 'Special Requests',
    bookingConfirmed: 'Booking Confirmed!',
    thankYouBooking: 'Thank you for booking with us.',
    bookingReference: 'Booking Reference',
    
    // Loyalty/Rewards
    welcomeBack: 'Welcome Back',
    yourProgress: 'Your Progress',
    pointsToNext: 'points to next tier',
    rewardsAvailable: 'Rewards Available',
    redeem: 'Redeem',
    referFriend: 'Refer a Friend',
    shareCode: 'Share your code',
    earnMorePoints: 'Earn more points',
    
    // Loyalty Page Complete
    welcomeBackMember: 'Welcome Back',
    youAreAMember: 'You\'re a',
    pointsReadyToUse: 'points ready to use!',
    since: 'Since',
    availableToRedeem: 'Available to redeem',
    totalSpent: 'Total spent',
    progressTo: 'Progress to',
    spendMoreToReach: 'more to reach',
    
    // Tabs
    rewards: 'Rewards',
    benefits: 'Benefits',
    wishlist: 'Wishlist',
    history: 'History',
    
    // Rewards Tab
    redeemYourPoints: 'Redeem Your Points',
    chooseFromRewards: 'Choose from our exclusive collection of rewards',
    rewardRedeemed: 'Reward Redeemed!',
    hasBeenAdded: 'has been added to your account.',
    checkEmailForDetails: 'Check your email for details!',
    platinumOnly: 'Platinum Only',
    unavailable: 'Unavailable',
    points: 'points',
    redeemNow: 'Redeem Now',
    needMorePoints: 'more points',
    
    // Benefits Tab
    yourBenefits: 'Benefits',
    enjoyPerks: 'Enjoy these exclusive perks as a',
    currentBenefits: 'Current Benefits',
    unlock: 'Unlock',
    
    // Wishlist Tab
    yourWishlist: 'Your Wishlist',
    productsSavedForLater: 'Products you\'ve saved for later',
    wishlistEmpty: 'Your wishlist is empty',
    startExploring: 'Start exploring our collection and save your favorite products to your wishlist by clicking the heart icon.',
    exploreProducts: 'Explore Products',
    
    // History Tab
    pointsHistory: 'Points History',
    trackPointsEarnings: 'Track your points earnings and redemptions',
    
    // Tier Benefits
    pointsPerDollar: 'point per $1 spent',
    birthdaySurprise: 'Birthday surprise',
    freeShippingOver50: 'Free shipping over $50',
    freeShippingOver25: 'Free shipping over $25',
    exclusiveProducts: 'Exclusive products',
    priorityCustomerService: 'Priority customer service',
    vipExperiences: 'VIP experiences',
    personalStylist: 'Personal stylist',
    freeShippingAlways: 'Free shipping always',
    exclusiveEvents: 'Exclusive events',
    
    // Reward Categories
    product: 'Product',
    discount: 'Discount',
    experience: 'Experience',
    exclusive: 'Exclusive',
    
    // Reward Names
    freeSilkShampoo: 'Free Silk Dreams Shampoo',
    twentyPercentOff: '20% Off Next Purchase',
    vipSalonExperience: 'VIP Salon Experience',
    earlyAccessPass: 'Early Access Pass',
    freeMoonlitCream: 'Free Moonlit Curls Cream',
    foundersCircleInvitation: 'Founder\'s Circle Invitation',
    
    // Reward Descriptions
    bestsellingShampoo: 'Our bestselling luxurious shampoo - absolutely free!',
    saveOnNextOrder: 'Save 20% on your entire next order',
    privateSalonConsultation: 'Private consultation + styling session at our salon',
    earlyAccessProducts: '48-hour early access to all new product launches',
    perfectForCurls: 'Perfect for enhancing your natural curls',
    exclusiveMonthlySessions: 'Exclusive monthly virtual sessions with our founder',
    
    // Transaction Types
    purchase: 'Purchase',
    reward: 'Reward',
    referral: 'Referral',
    bonus: 'Bonus',
    order: 'Order',
    redeemed: 'Redeemed',
    friendJoined: 'Friend',
    welcomeBonus: 'New Year Welcome Bonus',
    
    // Discovery Pages
    shopNow: 'Shop Now',
    filterBy: 'Filter By',
    sortBy: 'Sort By',
    priceRange: 'Price Range',
    
    // Navigation
    back: 'Back',
    continue: 'Continue',
    backToHome: 'Back to Home',
    
    // Calendar/Time
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
    sunday: 'Sun',
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    
    // Common
    view: 'View',
    close: 'Close',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading',
    error: 'Error',
    success: 'Success',
    
    // Additional Cart translations
    yourCartEmpty: 'your cart is empty',
    discoverBeautiful: 'discover beautiful hair care products to start your journey',
    continueShopping: 'continue shopping',
    items: 'items',
    item: 'item',
    each: 'each',
    pointsToEarn: 'Points to earn:',
    checkoutSecurely: 'checkout securely',
    free: 'Free',
    orderSummary: 'Order Summary',
    qty: 'Qty',
    freeShippingFor: 'Free shipping for orders $50+',
    orderFor: 'for orders',
    secureCheckoutSSL: 'Secure checkout with SSL encryption',
    thirtyDayReturn: '30-day return policy',
    yourPaymentSecure: 'Your payment information is encrypted and secure',
    processing: 'Processing...',
    addMore: 'Add',
    moreForFreeShipping: 'more for free shipping',
    freeShippingIncluded: 'Free shipping included',
    
    // Payment Confirmation
    orderConfirmed: 'order confirmed',
    thankYouForOrder: 'Thank You for Your Order!',
    orderConfirmationMessage: 'Your order has been successfully placed and is being prepared with love. We\'ll send you updates as your beautiful products make their way to you.',
    orderNumber: 'Order Number',
    estimatedDelivery: 'Estimated Delivery',
    confirmationSentTo: 'Confirmation sent to',
    orderTotal: 'Order Total',
    whatHappensNext: 'What happens next?',
    orderProcessingMessage: 'We\'ll start preparing your order within 24 hours',
    shippingNotificationMessage: 'You\'ll receive tracking information via email',
    deliveryMessage: 'Your products will arrive in 3-5 business days',
    downloadReceipt: 'Download Receipt',
    thankYouMessage: 'Thank you for choosing Lune & Lilas',
    followUsMessage: 'Follow us on social media for hair care tips, behind-the-scenes content, and exclusive offers.',
    
    // Product Details Page
    perfectFor: 'Perfect for:',
    perfectForDescription: 'All hair types seeking luxury and nourishment in their daily ritual.',
    keyIngredients: 'Key ingredients:',
    cleanSustainable: 'Clean & sustainable:',
    cleanSustainableDescription: 'All our ingredients are ethically sourced and cruelty-free.',
    howToUseLabel: 'How to use:',
    proTip: 'Pro tip:',
    proTipDescription: 'For best results, use as part of your complete hair care ritual with our complementary products.',
    moreViews: 'More views',
    addToCartButton: 'add to cart',
    earnLoyaltyPoints: 'Earn {points} loyalty points with this purchase',
    dayReturns: '30-day returns',
    ritual: 'ritual',
    reviews: 'reviews',
    
    // Reviews Section
    customerReviews: 'Customer Reviews',
    outOf: 'out of',
    reviewsCount: 'reviews',
    verifiedPurchase: 'Verified Purchase',
    purchase: 'Purchase',
    loadMoreReviews: 'Load more reviews',
    weeksAgo: 'weeks ago',
    monthAgo: 'month ago',
    monthsAgo: 'months ago',
    weekAgo: 'week ago',
  },
  fr: {
    // Header
    discover: 'découvrir',
    allProducts: 'Tous les Produits',
    browseComplete: 'Parcourez notre collection complète',
    bestsellers: 'Meilleures Ventes',
    mostLoved: 'Nos produits les plus aimés',
    newArrivals: 'Nouveautés',
    freshAdditions: 'Nouvelles additions à votre rituel',
    ourSalon: 'notre salon',
    about: 'à propos',
    backToShopping: 'retour aux achats',
    
    // Hero
    discoverYour: 'Découvrez la',
    hairsNatural: 'Beauté Naturelle',
    beauty: 'de Vos Cheveux',
    heroDescription: 'Découvrez notre collection soigneusement sélectionnée de rituels capillaires transformateurs, créés avec intention et les meilleurs ingrédients naturels.',
    shopCollection: 'Voir la Collection',
    learnMore: 'En Savoir Plus',
    natural: 'Naturel',
    customers: 'Clients',
    rating: 'Note',
    featured: 'Vedette',
    
    // Product related
    viewDetails: 'voir les détails',
    addToCart: 'ajouter au panier',
    ingredients: 'Ingrédients',
    howToUse: 'Mode d\'Emploi',
    bestseller: 'meilleure vente',
    newArrival: 'nouveauté',
    editorsPick: 'coup de cœur',
    category: 'Catégorie',
    price: 'Prix',
    originalPrice: 'Prix Original',
    
    // Pages
    editorsPickTitle: 'coup de cœur',
    editorsPickSubtitle: 'notre sélection des rituels capillaires les plus exquis',
    bestsellersTitle: 'nos meilleures ventes',
    bestsellersSubtitle: 'les produits les plus aimés par nos belles âmes',
    newArrivalsTitle: 'nouveautés',
    newArrivalsSubtitle: 'nouvelles additions à votre rituel de soins',
    
    // Categories
    all: 'Tous',
    shampoo: 'Shampooing',
    conditioner: 'Après-shampooing',
    treatment: 'Traitement',
    styling: 'Coiffage',
    
    // Cart
    cart: 'Panier',
    yourCart: 'Votre Panier',
    emptyCart: 'Votre panier est vide',
    emptyCartDescription: 'Ajoutez de beaux produits pour commencer',
    subtotal: 'Sous-total',
    shipping: 'Livraison',
    total: 'Total',
    checkout: 'Commander',
    freeShipping: 'Livraison gratuite',
    standardShipping: 'Livraison standard',
    loyaltyPoints: 'Points de Fidélité',
    earnPoints: 'Gagnez des points avec votre achat',
    
    // Checkout
    shippingDetails: 'détails de livraison',
    securePayment: 'paiement sécurisé',
    step: 'étape',
    of: 'sur',
    personalInformation: 'Informations Personnelles',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    shippingAddress: 'Adresse de Livraison',
    address: 'Adresse',
    city: 'Ville',
    postalCode: 'Code Postal',
    country: 'Pays',
    paymentInformation: 'Informations de Paiement',
    cardNumber: 'Numéro de Carte',
    expiryDate: 'Date d\'Expiration',
    cvv: 'CVV',
    cardholderName: 'Nom du Titulaire',
    continueToPayment: 'Continuer vers le Paiement',
    placeOrder: 'Passer la Commande',
    
    // Footer
    joinCommunity: 'Rejoignez Notre Communauté',
    communityDescription: 'Recevez des conseils capillaires hebdomadaires, des offres exclusives et soyez les premiers informés des nouveautés. Créons ensemble de belles histoires capillaires.',
    subscribe: 'S\'abonner',
    spamFree: 'Nous promettons de garder votre boîte mail belle et sans spam',
    help: 'Aide',
    contactUs: 'Nous Contacter',
    shippingInfo: 'Info Livraison',
    returns: 'Retours',
    ourStory: 'Notre Histoire',
    aboutUs: 'À Propos',
    sustainability: 'Durabilité',
    madeWith: 'Fait avec',
    forBeautifulHair: 'pour de beaux cheveux partout',
    privacyPolicy: 'Politique de Confidentialité',
    termsOfService: 'Conditions d\'Utilisation',
    
    // Language
    language: 'Langue',
    english: 'English',
    french: 'Français',
    
    // Salon
    bookAppointment: 'Prendre Rendez-vous',
    salonServices: 'Services du Salon',
    hairCut: 'Coupe de Cheveux',
    hairColor: 'Coloration',
    hairTreatment: 'Soins Capillaires',
    appointmentSummary: 'Récapitulatif du Rendez-vous',
    dateAndTime: 'Date et Heure',
    service: 'Service',
    yourBeautifulName: 'Votre Beau Nom',
    emailAddress: 'Adresse Email',
    phoneNumber: 'Numéro de Téléphone',
    sweetReminder: 'Nous vous enverrons un doux rappel la veille',
    anythingSpecial: 'Quelque Chose de Spécial à Savoir?',
    firstVisit: 'C\'est ma première visite chez Lune & Lilas',
    whatShouldWeCallYou: 'Comment devons-nous vous appeler?',
    yourEmail: 'votre@email.com',
    phoneNumberPlaceholder: '(555) 123-4567',
    tellUsAboutHair: 'Parlez-nous de vos objectifs capillaires, allergies ou dites simplement bonjour!',
    
    // About
    ourMission: 'Notre Mission',
    ourValues: 'Nos Valeurs',
    sustainableBeauty: 'Beauté Durable',
    
    // ProductGrid
    ourHairCareRituals: 'Nos Rituels Capillaires',
    hairCareRitualsDescription: 'Chaque produit de notre collection est soigneusement conçu pour nourrir vos cheveux et éveiller vos sens. Découvrez le rituel parfait pour votre beauté unique.',
    
    // Cart
    remove: 'Supprimer',
    itemRemoved: 'Article supprimé du panier',
    continueShoping: 'Continuer les Achats',
    
    // Product Details
    relatedProducts: 'Produits Connexes',
    youMightAlsoLike: 'Vous pourriez aussi aimer',
    addedToCart: 'Ajouté au panier',
    quantity: 'Quantité',
    
    // About Page
    ourStoryTitle: 'Notre Histoire',
    ourStoryContent: 'Née d\'une passion pour la beauté naturelle et les pratiques durables, Lune & Lilas crée des rituels capillaires transformateurs qui honorent à la fois vos cheveux et la planète. Chaque produit est soigneusement créé avec intention, amour et les meilleurs ingrédients naturels.',
    sustainabilityTitle: 'Durabilité',
    sustainabilityContent: 'Nous croyons que la beauté ne devrait jamais se faire au détriment de notre planète. Nos produits sont créés avec des pratiques durables, un emballage écologique et des ingrédients éthiquement sourcés qui respectent à la fois vos cheveux et l\'environnement.',
    ingredientsTitle: 'Ingrédients Naturels',
    ingredientsContent: 'Chaque formule contient des botaniques précieux, des huiles nourrissantes et des ingrédients actifs issus de la nature. Nous croyons au pouvoir des plantes pour transformer votre rituel capillaire en un moment de pur plaisir.',
    
    // Salon Page
    welcomeToOurSalon: 'Bienvenue dans Notre Salon',
    salonDescription: 'Vivez des soins capillaires personnalisés dans notre espace serein et luxueux. Nos stylistes experts combinent l\'art avec nos produits signature pour créer votre look parfait.',
    ourServices: 'Nos Services',
    hairCutService: 'Coupe & Coiffage',
    hairCutDescription: 'Coupes précises et coiffages magnifiques adaptés à vos traits uniques et votre style de vie',
    hairColorService: 'Coloration Capillaire',
    hairColorDescription: 'Transformations de couleur naturelles et époustouflantes utilisant notre système de coloration écologique',
    hairTreatmentService: 'Soins Profonds',
    hairTreatmentDescription: 'Traitements intensifs de réparation et de nutrition pour tous types et préoccupations capillaires',
    bookingProcess: 'Réservez Votre Rendez-vous',
    selectService: 'Sélectionner le Service',
    chooseDateTime: 'Choisir Date et Heure',
    confirmDetails: 'Confirmer les Détails',
    selectYourService: 'Sélectionnez Votre Service',
    availableTimes: 'Heures Disponibles',
    confirmBooking: 'Confirmer la Réservation',
    personalDetails: 'Informations Personnelles',
    specialRequests: 'Demandes Spéciales',
    bookingConfirmed: 'Réservation Confirmée !',
    thankYouBooking: 'Merci d\'avoir réservé avec nous.',
    bookingReference: 'Référence de Réservation',
    
    // Loyalty/Rewards
    welcomeBack: 'Bon Retour',
    yourProgress: 'Votre Progression',
    pointsToNext: 'points jusqu\'au niveau suivant',
    rewardsAvailable: 'Récompenses Disponibles',
    redeem: 'Échanger',
    referFriend: 'Parrainer un Ami',
    shareCode: 'Partagez votre code',
    earnMorePoints: 'Gagner plus de points',
    
    // Loyalty Page Complete
    welcomeBackMember: 'Bon Retour',
    youAreAMember: 'Vous êtes membre',
    pointsReadyToUse: 'points prêts à utiliser !',
    since: 'Depuis le',
    availableToRedeem: 'Disponible à échanger',
    totalSpent: 'Total dépensé',
    progressTo: 'Progression vers',
    spendMoreToReach: 'de plus pour atteindre',
    
    // Tabs
    rewards: 'Récompenses',
    benefits: 'Avantages',
    wishlist: 'Liste de Souhaits',
    history: 'Historique',
    
    // Rewards Tab
    redeemYourPoints: 'Échangez Vos Points',
    chooseFromRewards: 'Choisissez parmi notre collection exclusive de récompenses',
    rewardRedeemed: 'Récompense Échangée !',
    hasBeenAdded: 'a été ajouté à votre compte.',
    checkEmailForDetails: 'Vérifiez votre email pour les détails !',
    platinumOnly: 'Platinum Seulement',
    unavailable: 'Indisponible',
    points: 'points',
    redeemNow: 'Échanger Maintenant',
    needMorePoints: 'points de plus',
    
    // Benefits Tab
    yourBenefits: 'Avantages',
    enjoyPerks: 'Profitez de ces avantages exclusifs en tant que membre',
    currentBenefits: 'Avantages Actuels',
    unlock: 'Débloquer',
    
    // Wishlist Tab
    yourWishlist: 'Votre Liste de Souhaits',
    productsSavedForLater: 'Produits que vous avez sauvegardés pour plus tard',
    wishlistEmpty: 'Votre liste de souhaits est vide',
    startExploring: 'Commencez à explorer notre collection et sauvegardez vos produits préférés dans votre liste de souhaits en cliquant sur l\'icône cœur.',
    exploreProducts: 'Explorer les Produits',
    
    // History Tab
    pointsHistory: 'Historique des Points',
    trackPointsEarnings: 'Suivez vos gains et échanges de points',
    
    // Tier Benefits
    pointsPerDollar: 'point par 1$ dépensé',
    birthdaySurprise: 'Surprise d\'anniversaire',
    freeShippingOver50: 'Livraison gratuite dès 50$',
    freeShippingOver25: 'Livraison gratuite dès 25$',
    exclusiveProducts: 'Produits exclusifs',
    priorityCustomerService: 'Service client prioritaire',
    vipExperiences: 'Expériences VIP',
    personalStylist: 'Styliste personnel',
    freeShippingAlways: 'Livraison toujours gratuite',
    exclusiveEvents: 'Événements exclusifs',
    
    // Reward Categories
    product: 'Produit',
    discount: 'Réduction',
    experience: 'Expérience',
    exclusive: 'Exclusif',
    
    // Reward Names
    freeSilkShampoo: 'Shampooing Rêves de Soie Gratuit',
    twentyPercentOff: '20% de Réduction sur Prochain Achat',
    vipSalonExperience: 'Expérience Salon VIP',
    earlyAccessPass: 'Pass d\'Accès Anticipé',
    freeMoonlitCream: 'Crème Boucles au Clair de Lune Gratuite',
    foundersCircleInvitation: 'Invitation au Cercle des Fondateurs',
    
    // Reward Descriptions
    bestsellingShampoo: 'Notre shampooing luxueux le plus vendu - absolument gratuit !',
    saveOnNextOrder: 'Économisez 20% sur toute votre prochaine commande',
    privateSalonConsultation: 'Consultation privée + session de coiffage dans notre salon',
    earlyAccessProducts: 'Accès anticipé de 48h à tous les nouveaux lancements de produits',
    perfectForCurls: 'Parfait pour sublimer vos boucles naturelles',
    exclusiveMonthlySessions: 'Sessions virtuelles mensuelles exclusives avec notre fondatrice',
    
    // Transaction Types
    purchase: 'Achat',
    reward: 'Récompense',
    referral: 'Parrainage',
    bonus: 'Bonus',
    order: 'Commande',
    redeemed: 'Échangé',
    friendJoined: 'Ami',
    welcomeBonus: 'Bonus de Bienvenue du Nouvel An',
    
    // Discovery Pages
    shopNow: 'Acheter Maintenant',
    filterBy: 'Filtrer par',
    sortBy: 'Trier par',
    priceRange: 'Gamme de Prix',
    
    // Navigation
    back: 'Retour',
    continue: 'Continuer',
    backToHome: 'Retour à l\'Accueil',
    
    // Calendar/Time
    january: 'Janvier',
    february: 'Février',
    march: 'Mars',
    april: 'Avril',
    may: 'Mai',
    june: 'Juin',
    july: 'Juillet',
    august: 'Août',
    september: 'Septembre',
    october: 'Octobre',
    november: 'Novembre',
    december: 'Décembre',
    sunday: 'Dim',
    monday: 'Lun',
    tuesday: 'Mar',
    wednesday: 'Mer',
    thursday: 'Jeu',
    friday: 'Ven',
    saturday: 'Sam',
    morning: 'Matin',
    afternoon: 'Après-midi',
    evening: 'Soir',
    
    // Common
    view: 'Voir',
    close: 'Fermer',
    next: 'Suivant',
    previous: 'Précédent',
    loading: 'Chargement',
    error: 'Erreur',
    success: 'Succès',
    
    // Additional Cart translations
    yourCartEmpty: 'votre panier est vide',
    discoverBeautiful: 'découvrez de beaux produits capillaires pour commencer votre voyage',
    continueShopping: 'continuer les achats',
    items: 'articles',
    item: 'article',
    each: 'chacun',
    pointsToEarn: 'Points à gagner :',
    checkoutSecurely: 'commander en sécurité',
    free: 'Gratuit',
    orderSummary: 'Résumé de Commande',
    qty: 'Qté',
    freeShippingFor: 'Livraison gratuite pour les commandes de plus de 50$',
    orderFor: 'pour les commandes',
    secureCheckoutSSL: 'Paiement sécurisé avec cryptage SSL',
    thirtyDayReturn: 'Politique de retour de 30 jours',
    yourPaymentSecure: 'Vos informations de paiement sont cryptées et sécurisées',
    processing: 'Traitement...',
    addMore: 'Ajoutez',
    moreForFreeShipping: 'de plus pour la livraison gratuite',
    freeShippingIncluded: 'Livraison gratuite incluse',
    
    // Payment Confirmation
    orderConfirmed: 'commande confirmée',
    thankYouForOrder: 'Merci pour Votre Commande!',
    orderConfirmationMessage: 'Votre commande a été passée avec succès et est préparée avec amour. Nous vous enverrons des mises à jour pendant que vos beaux produits vous parviennent.',
    orderNumber: 'Numéro de Commande',
    estimatedDelivery: 'Livraison Estimée',
    confirmationSentTo: 'Confirmation envoyée à',
    orderTotal: 'Total de la Commande',
    whatHappensNext: 'Que se passe-t-il ensuite?',
    orderProcessingMessage: 'Nous commencerons à préparer votre commande dans les 24 heures',
    shippingNotificationMessage: 'Vous recevrez les informations de suivi par email',
    deliveryMessage: 'Vos produits arriveront dans 3-5 jours ouvrables',
    downloadReceipt: 'Télécharger le Reçu',
    thankYouMessage: 'Merci d\'avoir choisi Lune & Lilas',
    followUsMessage: 'Suivez-nous sur les réseaux sociaux pour des conseils capillaires, du contenu en coulisses et des offres exclusives.',
    
    // Product Details Page
    perfectFor: 'Parfait pour:',
    perfectForDescription: 'Tous types de cheveux recherchant luxe et nourriture dans leur rituel quotidien.',
    keyIngredients: 'Ingrédients clés:',
    cleanSustainable: 'Propre et durable:',
    cleanSustainableDescription: 'Tous nos ingrédients sont sourcés éthiquement et sans cruauté.',
    howToUseLabel: 'Mode d\'emploi:',
    proTip: 'Conseil de pro:',
    proTipDescription: 'Pour de meilleurs résultats, utilisez dans le cadre de votre rituel capillaire complet avec nos produits complémentaires.',
    moreViews: 'Plus de vues',
    addToCartButton: 'ajouter au panier',
    earnLoyaltyPoints: 'Gagnez {points} points de fidélité avec cet achat',
    dayReturns: 'Retours 30 jours',
    ritual: 'rituel',
    reviews: 'avis',
    
    // Reviews Section
    customerReviews: 'Avis Clients',
    outOf: 'sur',
    reviewsCount: 'avis',
    verifiedPurchase: 'Achat Vérifié',
    purchase: 'Achat',
    loadMoreReviews: 'Charger plus d\'avis',
    weeksAgo: 'semaines',
    monthAgo: 'mois',
    monthsAgo: 'mois',
    weekAgo: 'semaine',
  }
};

export const useTranslations = (language: Language) => {
  return translations[language];
};