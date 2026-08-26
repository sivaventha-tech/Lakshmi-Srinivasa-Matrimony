import { MembershipPlan } from '../types';

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'free',
    name: 'Free Basic',
    subtitle: 'Explore matches and register verified biodata',
    price: 0,
    originalPrice: 0,
    durationMonths: 0,
    durationLabel: 'Lifetime Free',
    contactViews: 0,
    unlimitedInterests: false,
    badge: 'Basic',
    color: 'stone',
    features: [
      'Create 100% Verified Profile with Photos',
      'Search & Filter all Bride / Groom Profiles',
      'View Horoscope / Kundali Match Score (Gunas)',
      'Send up to 5 Express Interests per month',
      'Receive unlimited incoming interests',
      'Basic security & privacy controls'
    ]
  },
  {
    id: 'gold',
    name: 'Gold Sacred',
    subtitle: 'Ideal for active match seekers wanting direct contact',
    price: 3499,
    originalPrice: 4999,
    durationMonths: 3,
    durationLabel: '3 Months Access',
    contactViews: 35,
    unlimitedInterests: true,
    badge: 'Popular for Starters',
    color: 'amber',
    features: [
      'Unlock 35 Verified Phone, Email & WhatsApp numbers',
      'Send Unlimited Express Interests',
      'Direct Chat & Instant Message with matches',
      'Download Detailed Horoscope & Biodata PDFs',
      'View Who Visited Your Profile in real-time',
      'Highlight Profile with "Gold Member" auspicious badge',
      'Dedicated SMS & WhatsApp match alerts'
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond Mahalakshmi',
    subtitle: 'Maximum visibility with priority matchmaking boost',
    price: 5999,
    originalPrice: 8999,
    durationMonths: 6,
    durationLabel: '6 Months Access',
    isPopular: true,
    isBestValue: true,
    contactViews: 75,
    unlimitedInterests: true,
    badge: 'Most Popular',
    color: 'rose',
    features: [
      'Unlock 75 Verified Phone, Email & WhatsApp numbers',
      'Send Unlimited Express Interests',
      'Top Tier Priority Listing in Daily Search Results',
      'Personal Matchmaking Advisor for initial family calls',
      'Comprehensive 36 Guna Kundali & Dosha analysis reports',
      'Mutual Family Background Verification assistance',
      'WhatsApp Concierge support 7 days a week',
      'Hide contact until mutual interest is approved option'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum Royal Assisted',
    subtitle: 'VIP Concierge with Dedicated Senior Matchmaker',
    price: 11999,
    originalPrice: 17999,
    durationMonths: 12,
    durationLabel: '12 Months Full Assistance',
    contactViews: 150,
    unlimitedInterests: true,
    badge: 'VIP Elite',
    color: 'purple',
    features: [
      'Dedicated Senior Matchmaker assigned to your family',
      'Handpicked weekly curated match recommendations',
      'Direct conference calls arranged between parents / elders',
      'Unlock up to 150 Verified Contact Details',
      'In-person & Astrologer consultation credits',
      'Confidential background & reference checks',
      'Relationship Manager attends to all shortlisted communications',
      '100% money-back guarantee if 0 family meetings in 90 days'
    ]
  }
];

export const COUPONS: Record<string, { discountPercent: number; description: string }> = {
  'FAMILY10': { discountPercent: 10, description: '10% Auspicious Family Discount applied' },
  'VIVAH20': { discountPercent: 20, description: '20% Wedding Season Special Discount applied' },
  'SHUBHAM25': { discountPercent: 25, description: '25% Festival Special Discount applied' }
};
