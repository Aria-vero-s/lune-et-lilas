import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Sparkles, 
  Crown, 
  Gift, 
  Users, 
  Trophy, 
  Calendar,
  ShoppingBag,
  Copy,
  Check,
  Star,
  Heart,
  Zap
} from 'lucide-react';
import type { LoyaltyMember, Product } from '../App';
import { useLanguage } from '../utils/LanguageContext';

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  image: string;
  category: 'product' | 'discount' | 'experience' | 'exclusive';
  available: boolean;
}

interface Transaction {
  id: string;
  date: string;
  type: 'purchase' | 'reward' | 'referral' | 'bonus';
  description: string;
  points: number;
  amount?: number;
}

interface LoyaltyPageProps {
  member: LoyaltyMember;
  onUpdateMember: (member: LoyaltyMember) => void;
  products: Product[];
  onProductClick: (product: Product) => void;
  likedProducts?: Set<string>;
  onToggleLike?: (productId: string) => void;
}

export function LoyaltyPage({ member, onUpdateMember, products, onProductClick, likedProducts = new Set(), onToggleLike }: LoyaltyPageProps) {
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const { language, t } = useLanguage();

  const getRewards = () => [
    {
      id: '1',
      name: t.freeSilkShampoo,
      description: t.bestsellingShampoo,
      pointsCost: 800,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop',
      category: 'product',
      available: true
    },
    {
      id: '2',
      name: t.twentyPercentOff,
      description: t.saveOnNextOrder,
      pointsCost: 500,
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=300&h=300&fit=crop',
      category: 'discount',
      available: true
    },
    {
      id: '3',
      name: t.vipSalonExperience,
      description: t.privateSalonConsultation,
      pointsCost: 2000,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop',
      category: 'experience',
      available: true
    },
    {
      id: '4',
      name: t.earlyAccessPass,
      description: t.earlyAccessProducts,
      pointsCost: 1200,
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop',
      category: 'exclusive',
      available: true
    },
    {
      id: '5',
      name: t.freeMoonlitCream,
      description: t.perfectForCurls,
      pointsCost: 700,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop',
      category: 'product',
      available: true
    },
    {
      id: '6',
      name: t.foundersCircleInvitation,
      description: t.exclusiveMonthlySessions,
      pointsCost: 3000,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
      category: 'exclusive',
      available: member.tier === 'Platinum'
    }
  ];

  const rewards = getRewards();

  const getTransactions = () => [
    {
      id: '1',
      date: '2024-01-15',
      type: 'purchase',
      description: language === 'en' 
        ? 'Order #1234 - Silk Dreams Bundle'
        : 'Commande #1234 - Pack Rêves de Soie',
      points: 85,
      amount: 85
    },
    {
      id: '2',
      date: '2024-01-10',
      type: 'referral',
      description: language === 'en'
        ? 'Friend Sarah joined using your code'
        : 'Votre amie Sarah a rejoint avec votre code',
      points: 200
    },
    {
      id: '3',
      date: '2024-01-05',
      type: 'reward',
      description: language === 'en'
        ? 'Redeemed: 15% Off Coupon'
        : 'Échangé: Coupon 15% de Réduction',
      points: -300
    },
    {
      id: '4',
      date: '2024-01-01',
      type: 'bonus',
      description: t.welcomeBonus,
      points: 100
    }
  ];

  const transactions = getTransactions();

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'Silver':
        return {
          icon: Sparkles,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          nextTier: 'Gold',
          nextTierSpend: 200,
          benefits: [
            `1 ${t.pointsPerDollar}`,
            t.birthdaySurprise,
            t.freeShippingOver50
          ]
        };
      case 'Gold':
        return {
          icon: Crown,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          nextTier: 'Platinum',
          nextTierSpend: 500,
          benefits: [
            `1.5 ${t.pointsPerDollar}`,
            t.exclusiveProducts,
            t.priorityCustomerService,
            t.freeShippingOver25
          ]
        };
      case 'Platinum':
        return {
          icon: Trophy,
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          nextTier: null,
          nextTierSpend: 0,
          benefits: [
            `2 ${t.pointsPerDollar}`,
            t.vipExperiences,
            t.personalStylist,
            t.freeShippingAlways,
            t.exclusiveEvents
          ]
        };
      default:
        return {
          icon: Sparkles,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          nextTier: 'Gold',
          nextTierSpend: 200,
          benefits: [`1 ${t.pointsPerDollar}`]
        };
    }
  };

  const tierInfo = getTierInfo(member.tier);
  const TierIcon = tierInfo.icon;

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(member.referralCode);
      setCopiedReferral(true);
      setTimeout(() => setCopiedReferral(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const redeemReward = (reward: Reward) => {
    if (member.points >= reward.pointsCost && reward.available) {
      onUpdateMember({
        ...member,
        points: member.points - reward.pointsCost
      });
      setSelectedReward(reward);
      setTimeout(() => setSelectedReward(null), 3000);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'product': return <Gift className="w-5 h-5" />;
      case 'discount': return <Zap className="w-5 h-5" />;
      case 'experience': return <Heart className="w-5 h-5" />;
      case 'exclusive': return <Crown className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'product': return t.product;
      case 'discount': return t.discount;
      case 'experience': return t.experience;
      case 'exclusive': return t.exclusive;
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-accent overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="container-standard py-16 lg:py-24 w-full">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <TierIcon className={`w-8 h-8 ${tierInfo.color}`} />
              <h1 className="text-4xl lg:text-6xl text-foreground" style={{ fontFamily: 'var(--font-family-secondary)' }}>
                {t.welcomeBackMember}, {member.name.split(' ')[0]}
              </h1>
            </div>
            
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {t.youAreAMember} {member.tier} {language === 'en' ? 'member with' : 'avec'} <span className="font-bold text-primary">{member.points} {t.points}</span> {t.pointsReadyToUse}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${tierInfo.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <TierIcon className={`w-6 h-6 ${tierInfo.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{member.tier} {language === 'en' ? 'Member' : 'Membre'}</h3>
                  <p className="text-sm text-muted-foreground">{t.since} {new Date(member.joinDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{member.points} {t.points}</h3>
                  <p className="text-sm text-muted-foreground">{t.availableToRedeem}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ShoppingBag className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">${member.totalSpent}</h3>
                  <p className="text-sm text-muted-foreground">{t.totalSpent}</p>
                </CardContent>
              </Card>
            </div>

            {/* Tier Progress */}
            {tierInfo.nextTier && (
              <Card className="mt-8">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{t.progressTo} {tierInfo.nextTier}</h3>
                      <span className="text-sm text-muted-foreground">
                        ${member.totalSpent} / ${tierInfo.nextTierSpend}
                      </span>
                    </div>
                    <Progress 
                      value={(member.totalSpent / tierInfo.nextTierSpend) * 100} 
                      className="h-3"
                    />
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' 
                        ? `Spend ${tierInfo.nextTierSpend - member.totalSpent} more to reach ${tierInfo.nextTier}!`
                        : `Dépensez ${tierInfo.nextTierSpend - member.totalSpent} ${t.spendMoreToReach} ${tierInfo.nextTier} !`
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="container-standard">
          <Tabs defaultValue="rewards" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
              <TabsTrigger value="rewards">{t.rewards}</TabsTrigger>
              <TabsTrigger value="benefits">{t.benefits}</TabsTrigger>
              <TabsTrigger value="wishlist">{t.wishlist}</TabsTrigger>
              <TabsTrigger value="history">{t.history}</TabsTrigger>
            </TabsList>

            {/* Rewards Tab */}
            <TabsContent value="rewards" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="mb-4 text-4xl lg:text-5xl text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
                  {t.redeemYourPoints}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t.chooseFromRewards}
                </p>
              </div>

              {selectedReward && (
                <Card className="border-primary bg-accent">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <Check className="w-6 h-6 text-primary" />
                      <h3 className="font-semibold text-foreground">{t.rewardRedeemed}</h3>
                    </div>
                    <p className="text-muted-foreground">
                      {language === 'en' ? 'Your' : 'Votre'} <strong>{selectedReward.name}</strong> {t.hasBeenAdded}
                      {t.checkEmailForDetails}
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <Card 
                    key={reward.id} 
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      !reward.available || member.points < reward.pointsCost 
                        ? 'opacity-60' 
                        : 'hover:border-primary/50'
                    }`}
                  >
                    {!reward.available && (
                      <div className="absolute top-3 right-3 z-10">
                        <Badge variant="secondary">
                          {member.tier !== 'Platinum' ? t.platinumOnly : t.unavailable}
                        </Badge>
                      </div>
                    )}
                    
                    <div className="aspect-square overflow-hidden">
                      <ImageWithFallback
                        src={reward.image}
                        alt={reward.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-accent text-accent-foreground">
                          {getCategoryIcon(reward.category)}
                          <span className="ml-1 capitalize">{getCategoryName(reward.category)}</span>
                        </Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {reward.pointsCost}
                          </div>
                          <div className="text-sm text-muted-foreground">{t.points}</div>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-2">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {reward.description}
                      </p>
                      
                      <Button
                        onClick={() => redeemReward(reward)}
                        disabled={!reward.available || member.points < reward.pointsCost}
                        className="w-full"
                        variant={member.points >= reward.pointsCost && reward.available ? "default" : "outline"}
                      >
                        {member.points >= reward.pointsCost && reward.available 
                          ? t.redeemNow
                          : `${language === 'en' ? 'Need' : 'Il faut'} ${reward.pointsCost - member.points} ${t.needMorePoints}`
                        }
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Benefits Tab */}
            <TabsContent value="benefits" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="mb-4 text-4xl lg:text-5xl text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
                  {language === 'en' ? `Your ${member.tier}` : `Vos ${t.yourBenefits}`} {member.tier}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t.enjoyPerks} {member.tier}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <TierIcon className={`w-6 h-6 ${tierInfo.color}`} />
                      <span>{t.currentBenefits}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {tierInfo.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {tierInfo.nextTier && (
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <Crown className="w-6 h-6 text-yellow-600" />
                        <span>{t.unlock} {tierInfo.nextTier}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {language === 'en' 
                          ? `Spend ${tierInfo.nextTierSpend - member.totalSpent} more to unlock:`
                          : `Dépensez ${tierInfo.nextTierSpend - member.totalSpent} de plus pour débloquer :`
                        }
                      </p>
                      {getTierInfo(tierInfo.nextTier).benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Star className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="mb-4 text-4xl lg:text-5xl text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
                  {t.yourWishlist}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t.productsSavedForLater}
                </p>
              </div>

              {likedProducts.size === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">{t.wishlistEmpty}</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    {t.startExploring}
                  </p>
                  <Button 
                    onClick={() => onProductClick(products[0])}
                    className="px-8"
                  >
                    {t.exploreProducts}
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from(likedProducts).map((productId) => {
                    const product = products.find(p => p.id === productId);
                    if (!product) return null;
                    
                    return (
                      <Card 
                        key={product.id} 
                        className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50"
                        onClick={() => onProductClick(product)}
                      >
                        <div className="aspect-square overflow-hidden rounded-t-lg">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{language === 'en' ? product.name : product.nameFr}</h3>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {language === 'en' ? product.description : product.descriptionFr}
                              </p>
                            </div>
                            
                            {onToggleLike && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleLike(product.id);
                                }}
                                className="ml-2 p-2 hover:bg-red-50 group"
                              >
                                <Heart className="w-4 h-4 fill-red-500 text-red-500 group-hover:scale-110 transition-transform" />
                              </Button>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-lg text-foreground">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            
                            <Badge variant="secondary" className="text-xs">
                              {language === 'en' ? product.category : product.categoryFr}
                            </Badge>
                          </div>
                          
                          <Button 
                            className="w-full mt-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              onProductClick(product);
                            }}
                          >
                            {t.viewDetails}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="mb-4 text-4xl lg:text-5xl text-foreground" style={{ fontFamily: 'var(--font-family-primary)' }}>
                  {t.pointsHistory}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t.trackPointsEarnings}
                </p>
              </div>

              <div className="container-standard p-[0px]">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              transaction.type === 'purchase' ? 'bg-green-100' :
                              transaction.type === 'reward' ? 'bg-red-100' :
                              transaction.type === 'referral' ? 'bg-blue-100' :
                              'bg-yellow-100'
                            }`}>
                              {transaction.type === 'purchase' && <ShoppingBag className="w-5 h-5 text-green-600" />}
                              {transaction.type === 'reward' && <Gift className="w-5 h-5 text-red-600" />}
                              {transaction.type === 'referral' && <Users className="w-5 h-5 text-blue-600" />}
                              {transaction.type === 'bonus' && <Star className="w-5 h-5 text-yellow-600" />}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{transaction.description}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(transaction.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              transaction.points > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.points > 0 ? '+' : ''}{transaction.points} pts
                            </p>
                            {transaction.amount && (
                              <p className="text-sm text-muted-foreground">${transaction.amount}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}