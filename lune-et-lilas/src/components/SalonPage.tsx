import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Calendar, Clock, Scissors, Star, MapPin, Phone, Mail, ChevronLeft, ChevronRight, Check, Heart, User, MessageCircle } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  image: string;
  category: 'cut' | 'color' | 'treatment' | 'styling';
  popular?: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
  period: 'morning' | 'afternoon' | 'evening';
}

type BookingStep = 'date' | 'time' | 'service' | 'details' | 'confirmation';

export function SalonPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('date');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    isFirstTime: false
  });
  const { language, t } = useLanguage();

  const getServices = () => {
    const services = [
      {
        id: '1',
        name: language === 'en' ? 'Signature Cut & Style' : 'Coupe & Coiffage Signature',
        description: language === 'en' 
          ? 'Personalized consultation, precision cut, and gorgeous styling'
          : 'Consultation personnalisée, coupe de précision et coiffage magnifique',
        duration: 90,
        price: 120,
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
        category: 'cut',
        popular: true
      },
      {
        id: '2',
        name: language === 'en' ? 'Color Transformation' : 'Transformation Couleur',
        description: language === 'en' 
          ? 'Complete color journey with expert consultation'
          : 'Voyage complet de coloration avec consultation experte',
        duration: 180,
        price: 200,
        image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop',
        category: 'color'
      },
      {
        id: '3',
        name: language === 'en' ? 'Luxury Hair Treatment' : 'Soin Capillaire de Luxe',
        description: language === 'en' 
          ? 'Deeply nourishing ritual for ultimate hair health'
          : 'Rituel profondément nourrissant pour une santé capillaire ultime',
        duration: 60,
        price: 80,
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
        category: 'treatment'
      },
      {
        id: '4',
        name: language === 'en' ? 'Special Occasion Style' : 'Coiffage Occasion Spéciale',
        description: language === 'en' 
          ? 'Elegant styling for your most important moments'
          : 'Coiffage élégant pour vos moments les plus importants',
        duration: 120,
        price: 150,
        image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=300&fit=crop',
        category: 'styling'
      },
      {
        id: '5',
        name: language === 'en' ? 'Curl Love Session' : 'Session Amour de Boucles',
        description: language === 'en' 
          ? 'Specialized care for beautiful, bouncy curls'
          : 'Soins spécialisés pour de belles boucles rebondissantes',
        duration: 120,
        price: 140,
        image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=300&fit=crop',
        category: 'cut',
        popular: true
      },
      {
        id: '6',
        name: language === 'en' ? 'Balayage Magic' : 'Magie du Balayage',
        description: language === 'en' 
          ? 'Sun-kissed highlights that look effortlessly natural'
          : 'Mèches dorées par le soleil qui paraissent naturellement sans effort',
        duration: 150,
        price: 180,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        category: 'color'
      }
    ];
    return services;
  };
  
  const services = getServices();

  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true, period: 'morning' },
    { time: '10:30 AM', available: true, period: 'morning' },
    { time: '12:00 PM', available: false, period: 'afternoon' },
    { time: '1:30 PM', available: true, period: 'afternoon' },
    { time: '3:00 PM', available: true, period: 'afternoon' },
    { time: '4:30 PM', available: false, period: 'evening' },
    { time: '6:00 PM', available: true, period: 'evening' }
  ];

  // Generate calendar dates for the current viewing month
  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month and how many days in month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      dates.push(null);
    }
    
    // Add all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const isToday = dateString === today.toISOString().split('T')[0];
      const isPast = date < today && !isToday;
      
      dates.push({
        date: dateString,
        day: day,
        dayName: getLocalizedDayName(date.getDay()),
        month: getLocalizedMonthName(date.getMonth()),
        isToday,
        isPast,
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      });
    }
    
    return dates;
  };

  const getLocalizedDayName = (dayNumber: number) => {
    const days = [t.sunday, t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.saturday];
    return days[dayNumber];
  };

  const getLocalizedMonthName = (monthNumber: number) => {
    const months = [
      t.january, t.february, t.march, t.april, t.may, t.june,
      t.july, t.august, t.september, t.october, t.november, t.december
    ];
    return months[monthNumber];
  };

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = language === 'fr' ? 'fr-FR' : 'en-US';
    return date.toLocaleDateString(locale, { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getFormattedMonth = (date: Date) => {
    const locale = language === 'fr' ? 'fr-FR' : 'en-US';
    return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  };

  const calendarDates = generateCalendarDates();
  
  // Navigation functions
  const canGoToPreviousMonth = () => {
    const today = new Date();
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(currentMonth.getMonth() - 1);
    return prevMonth.getMonth() >= today.getMonth() && prevMonth.getFullYear() >= today.getFullYear();
  };

  const canGoToNextMonth = () => {
    const today = new Date();
    const threeMonthsLater = new Date(today);
    threeMonthsLater.setMonth(today.getMonth() + 3);
    
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    return nextMonth <= threeMonthsLater;
  };

  const goToPreviousMonth = () => {
    if (canGoToPreviousMonth()) {
      setCurrentMonth(prev => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() - 1);
        return newDate;
      });
    }
  };

  const goToNextMonth = () => {
    if (canGoToNextMonth()) {
      setCurrentMonth(prev => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() + 1);
        return newDate;
      });
    }
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 'date': return 20;
      case 'time': return 40;
      case 'service': return 60;
      case 'details': return 80;
      case 'confirmation': return 100;
      default: return 0;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'date': return '';
      case 'time': return language === 'en' ? 'What Time Works Best?' : 'Quelle Heure Convient le Mieux ?';
      case 'service': return language === 'en' ? 'Choose Your Experience' : 'Choisissez Votre Expérience';
      case 'details': return language === 'en' ? 'Tell Us About You' : 'Parlez-nous de Vous';
      case 'confirmation': return language === 'en' ? 'All Set!' : 'Tout est Prêt !';
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 'date': return language === 'en' ? 'When would you like to visit?' : 'Quand aimeriez-vous nous rendre visite ?';
      case 'time': return language === 'en' ? 'Choose your ideal time slot for your appointment' : 'Choisissez votre créneau horaire idéal pour votre rendez-vous';
      case 'service': return language === 'en' ? 'What beautiful transformation are you dreaming of today?' : 'Quelle belle transformation rêvez-vous aujourd\'hui ?';
      case 'details': return language === 'en' ? 'Just a few details so we can personalize your experience' : 'Juste quelques détails pour personnaliser votre expérience';
      case 'confirmation': return language === 'en' ? 'Your appointment is confirmed! We can\'t wait to see you.' : 'Votre rendez-vous est confirmé ! Nous avons hâte de vous voir.';
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 'date': return selectedDate !== '';
      case 'time': return selectedTime !== '';
      case 'service': return selectedService !== null;
      case 'details': return clientInfo.name !== '' && clientInfo.email !== '';
      case 'confirmation': return false;
    }
  };

  const handleNext = () => {
    if (!canProceedToNext()) return;
    
    switch (currentStep) {
      case 'date': setCurrentStep('time'); break;
      case 'time': setCurrentStep('service'); break;
      case 'service': setCurrentStep('details'); break;
      case 'details': setCurrentStep('confirmation'); break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'time': setCurrentStep('date'); break;
      case 'service': setCurrentStep('time'); break;
      case 'details': setCurrentStep('service'); break;
      case 'confirmation': setCurrentStep('details'); break;
    }
  };

  const handleBookAnother = () => {
    setCurrentStep('date');
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setCurrentMonth(new Date());
    setClientInfo({ name: '', email: '', phone: '', notes: '', isFirstTime: false });
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'cut': return language === 'en' ? 'Cut & Style' : 'Coupe & Coiffage';
      case 'color': return language === 'en' ? 'Color' : 'Couleur';
      case 'treatment': return language === 'en' ? 'Treatment' : 'Soin';
      case 'styling': return language === 'en' ? 'Styling' : 'Coiffage';
      default: return language === 'en' ? 'Service' : 'Service';
    }
  };

  const getPeriodIcon = (period: string) => {
    switch (period) {
      case 'morning': return '';
      case 'afternoon': return '';
      case 'evening': return '';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with progress */}
      <section className="bg-accent py-8 border-b border-border">
        <div className="container-standard">
          <div className="text-center mb-6">
            {getStepTitle() && (
              <h1 className="mb-2 text-foreground" style={{ fontFamily: 'var(--font-family-secondary)' }}>
                {getStepTitle()}
              </h1>
            )}
            <p className="text-lg text-muted-foreground">
              {getStepSubtitle()}
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <Progress value={getStepProgress()} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className={currentStep === 'date' ? 'text-primary font-medium' : ''}>{language === 'en' ? 'Date' : 'Date'}</span>
              <span className={currentStep === 'time' ? 'text-primary font-medium' : ''}>{language === 'en' ? 'Time' : 'Heure'}</span>
              <span className={currentStep === 'service' ? 'text-primary font-medium' : ''}>{language === 'en' ? 'Service' : 'Service'}</span>
              <span className={currentStep === 'details' ? 'text-primary font-medium' : ''}>{language === 'en' ? 'Details' : 'Détails'}</span>
              <span className={currentStep === 'confirmation' ? 'text-primary font-medium' : ''}>{language === 'en' ? 'Confirm' : 'Confirmer'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Step content */}
      <section className="section-spacing">
        <div className="container-standard">
          {/* Step 1: Date Selection */}
          {currentStep === 'date' && (
            <div className="space-y-8">
              {/* Calendar */}
              <div>
                <div className="text-center mb-8">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center justify-center">
                    <Calendar className="w-6 h-6 mr-3 text-primary" />
                    {language === 'en' ? 'Choose Your Perfect Day' : 'Choisissez Votre Jour Parfait'}
                  </h3>
                  
                  {/* Month navigation */}
                  <div className="flex items-center justify-center space-x-6 mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToPreviousMonth}
                      disabled={!canGoToPreviousMonth()}
                      className="p-2"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    
                    <h4 className="text-xl font-semibold text-foreground min-w-[200px]">
                      {getFormattedMonth(currentMonth)}
                    </h4>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToNextMonth}
                      disabled={!canGoToNextMonth()}
                      className="p-2"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="max-w-4xl mx-auto">
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-3 mb-4">
                    {[t.sunday, t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.saturday].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-3">
                    {calendarDates.map((dateInfo, index) => {
                      if (!dateInfo) {
                        return <div key={index} className="aspect-square"></div>;
                      }
                      
                      const isDisabled = dateInfo.isPast || dateInfo.isWeekend;
                      
                      return (
                        <button
                          key={dateInfo.date}
                          onClick={() => !isDisabled && setSelectedDate(dateInfo.date)}
                          disabled={isDisabled}
                          className={`
                            aspect-square p-3 rounded-xl border-2 transition-all relative flex flex-col items-center justify-center
                            ${selectedDate === dateInfo.date
                              ? 'border-primary bg-primary text-white shadow-lg transform scale-105'
                              : isDisabled
                              ? 'border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                              : 'border-border hover:border-primary hover:bg-accent'
                            }
                            ${dateInfo.isToday ? 'ring-2 ring-primary/30' : ''}
                          `}
                        >
                          <div className="text-lg font-bold">{dateInfo.day}</div>
                          
                          {dateInfo.isToday && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Time Selection */}
          {currentStep === 'time' && (
            <div className="space-y-8">
              {/* Selected date reminder */}
              <Card className="bg-accent/50 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {getFormattedDate(selectedDate)}
                        </h3>
                        <p className="text-sm text-muted-foreground">{language === 'en' ? 'Your selected date' : 'Votre date sélectionnée'}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep('date')}
                      className="text-primary hover:text-primary/80"
                    >
{language === 'en' ? 'Change Date' : 'Changer la Date'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Time Selection */}
              <div>
                <h3 className="text-center font-semibold text-foreground mb-8 flex items-center justify-center">
                  <Clock className="w-6 h-6 mr-3 text-primary" />
                  {language === 'en' ? 'Pick Your Ideal Time' : 'Choisissez Votre Heure Idéale'}
                </h3>
                
                <div className="max-w-3xl mx-auto space-y-8">
                  {['morning', 'afternoon', 'evening'].map(period => {
                    const periodSlots = timeSlots.filter(slot => slot.period === period);
                    const availableSlots = periodSlots.filter(slot => slot.available);
                    
                    if (availableSlots.length === 0) return null;
                    
                    return (
                      <div key={period} className="space-y-4">
                        <h4 className="font-medium text-foreground capitalize text-center">
                          {language === 'en' 
                            ? `${period} (${availableSlots.length} slots available)`
                            : `${period === 'morning' ? t.morning : period === 'afternoon' ? t.afternoon : t.evening} (${availableSlots.length} créneaux disponibles)`
                          }
                        </h4>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                          {availableSlots.map((slot) => (
                            <Button
                              key={slot.time}
                              variant={selectedTime === slot.time ? "default" : "outline"}
                              onClick={() => setSelectedTime(slot.time)}
                              className={`
                                p-4 h-auto text-base rounded-xl transition-all min-w-[140px]
                                ${selectedTime === slot.time
                                  ? 'bg-primary text-white shadow-lg transform scale-105' 
                                  : 'border-2 hover:border-primary hover:bg-accent'
                                }
                              `}
                            >
                              <div className="text-center">
                                <div className="font-semibold">{slot.time}</div>
                                <div className="text-sm opacity-80">{language === 'en' ? 'Available' : 'Disponible'}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Service Selection */}
          {currentStep === 'service' && (
            <div className="space-y-8">
              {/* Selected date/time reminder */}
              <Card className="bg-accent/50 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {getFormattedDate(selectedDate)} {language === 'en' ? 'at' : 'à'} {selectedTime}
                        </h3>
                        <p className="text-sm text-muted-foreground">{language === 'en' ? 'Your selected appointment time' : 'Votre heure de rendez-vous sélectionnée'}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep('time')}
                      className="text-primary hover:text-primary/80"
                    >
{language === 'en' ? 'Change' : 'Changer'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Card 
                    key={service.id} 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 relative overflow-hidden ${
                      selectedService?.id === service.id 
                        ? 'border-primary shadow-lg transform scale-105' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    {service.popular && (
                      <div className="absolute top-3 right-3 z-10">
                        <Badge className="bg-primary text-white">
                          <Star className="w-3 h-3 mr-1" />
{language === 'en' ? 'Popular' : 'Populaire'}
                        </Badge>
                      </div>
                    )}
                    
                    <div className="aspect-[4/3] overflow-hidden">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-primary bg-accent px-3 py-1 rounded-full">
                          {getCategoryTitle(service.category)}
                        </span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">${service.price}</div>
                          <div className="text-sm text-muted-foreground">{service.duration} min</div>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-2">{service.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      
                      {selectedService?.id === service.id && (
                        <div className="mt-4 flex items-center justify-center text-primary">
                          <Check className="w-5 h-5 mr-2" />
                          <span className="font-medium">{language === 'en' ? 'Selected' : 'Sélectionné'}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Client Details */}
          {currentStep === 'details' && selectedService && (
            <div className="space-y-8">
              {/* Appointment summary */}
              <Card className="bg-accent/50 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">{t.appointmentSummary}</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-foreground">{t.dateAndTime}</h4>
                      <p className="text-muted-foreground">
                        {getFormattedDate(selectedDate)} {language === 'en' ? 'at' : 'à'} {selectedTime}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{t.service}</h4>
                      <p className="text-muted-foreground">{selectedService.name}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{t.total}</h4>
                      <p className="text-2xl font-bold text-primary">${selectedService.price}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-foreground mb-2 flex items-center">
                        <User className="w-4 h-4 mr-2 text-primary" />
                        {t.yourBeautifulName} *
                      </label>
                      <Input
                        type="text"
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={t.whatShouldWeCallYou}
                        className="w-full p-4 border-2 focus:border-primary rounded-xl"
                      />
                    </div>
                    
                    <div>
                      <label className="block font-medium text-foreground mb-2 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-primary" />
                        {t.emailAddress} *
                      </label>
                      <Input
                        type="email"
                        value={clientInfo.email}
                        onChange={(e) => setClientInfo(prev => ({ ...prev, email: e.target.value }))}
                        placeholder={t.yourEmail}
                        className="w-full p-4 border-2 focus:border-primary rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-foreground mb-2 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-primary" />
                      {t.phoneNumber}
                    </label>
                    <Input
                      type="tel"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder={t.phoneNumberPlaceholder}
                      className="w-full p-4 border-2 focus:border-primary rounded-xl"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {t.sweetReminder}
                    </p>
                  </div>

                  <div>
                    <label className="block font-medium text-foreground mb-2 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-primary" />
                      {t.anythingSpecial}
                    </label>
                    <Textarea
                      value={clientInfo.notes}
                      onChange={(e) => setClientInfo(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder={t.tellUsAboutHair}
                      className="w-full p-4 border-2 focus:border-primary rounded-xl min-h-[120px] resize-none"
                    />
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-accent/30 rounded-xl border">
                    <input
                      type="checkbox"
                      id="firstTime"
                      checked={clientInfo.isFirstTime}
                      onChange={(e) => setClientInfo(prev => ({ ...prev, isFirstTime: e.target.checked }))}
                      className="w-5 h-5 text-primary bg-background border-2 border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <label htmlFor="firstTime" className="text-foreground flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-primary" />
                      {t.firstVisit}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 'confirmation' && selectedService && (
            <div className="space-y-8">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-family-secondary)' }}>
                    Perfect! You're All Set
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-md mx-auto">
                    We've sent a confirmation email to {clientInfo.email}. 
                    We can't wait to pamper you and create beautiful hair magic together!
                  </p>
                </div>
              </div>

              {/* Appointment Details Card */}
              <Card className="max-w-2xl mx-auto bg-gradient-to-br from-accent/50 to-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="font-semibold text-foreground mb-6 text-center">Your Appointment Details</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-white/70 rounded-lg">
                      <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground">Date & Time</h4>
                        <p className="text-muted-foreground">
                          {new Date(selectedDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric',
                            year: 'numeric'
                          })} at {selectedTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-white/70 rounded-lg">
                      <Scissors className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground">Service</h4>
                        <p className="text-muted-foreground">{selectedService.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedService.duration} minutes • ${selectedService.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-white/70 rounded-lg">
                      <User className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground">Contact</h4>
                        <p className="text-muted-foreground">{clientInfo.name}</p>
                        <p className="text-sm text-muted-foreground">{clientInfo.email}</p>
                        {clientInfo.phone && (
                          <p className="text-sm text-muted-foreground">{clientInfo.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-white/70 rounded-lg">
                      <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground">Location</h4>
                        <p className="text-muted-foreground">Lune & Lilas Salon</p>
                        <p className="text-sm text-muted-foreground">
                          123 Beauty Boulevard<br />
                          Los Angeles, CA 90210<br />
                          (555) 123-HAIR
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-medium text-foreground mb-2 flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-primary" />
                      What to Expect
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Arrive 10 minutes early for your consultation</li>
                      <li>• Complimentary scalp massage with every service</li>
                      <li>• We'll call you the day before to confirm</li>
                      <li>• Bring inspiration photos if you have them!</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button
                  onClick={handleBookAnother}
                  className="bg-primary hover:bg-lilac-600 text-white px-8 py-4 rounded-xl text-base"
                >
                  Book Another Appointment
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Questions? Call us at (555) 123-HAIR or email hello@lunelilas.com
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {currentStep !== 'confirmation' && (
            <div className="mt-12 pt-8">
              <div className="flex justify-between items-center max-w-2xl mx-auto">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 'date'}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.back}</span>
                </Button>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{language === 'en' ? `Step ${['date', 'time', 'service', 'details'].indexOf(currentStep) + 1} of 4` : `Étape ${['date', 'time', 'service', 'details'].indexOf(currentStep) + 1} sur 4`}</span>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                  className="flex items-center space-x-2 bg-primary hover:bg-lilac-600 text-white px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {currentStep === 'details' 
                      ? (language === 'en' ? 'Confirm Booking' : 'Confirmer la Réservation')
                      : t.continue
                    }
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}