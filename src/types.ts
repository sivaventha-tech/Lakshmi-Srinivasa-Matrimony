export type AppView = 
  | 'home' 
  | 'register' 
  | 'dashboard' 
  | 'matches' 
  | 'profile-view' 
  | 'shortlisted'
  | 'messages' 
  | 'membership' 
  | 'payment'
  | 'payment-success'
  | 'help'
  | 'settings';

export type Gender = 'female' | 'male';

export type MaritalStatus = 'Never Married' | 'Divorced' | 'Widowed' | 'Awaiting Divorce';

export type DietType = 'Vegetarian' | 'Non-Vegetarian' | 'Eggetarian' | 'Jain' | 'Vegan';

export type FamilyValues = 'Traditional' | 'Moderate' | 'Liberal';

export type FamilyType = 'Nuclear' | 'Joint';

export type FamilyStatus = 'Middle Class' | 'Upper Middle Class' | 'Rich / Affluent';

export interface LocationInfo {
  city: string;
  state: string;
  country: string;
  nativePlace?: string;
  citizenship?: string;
}

export interface FamilyInfo {
  type: FamilyType;
  values: FamilyValues;
  status: FamilyStatus;
  fatherOccupation: string;
  motherOccupation: string;
  brothersCount: number;
  brothersMarried: number;
  sistersCount: number;
  sistersMarried: number;
  aboutFamily: string;
}

export interface HoroscopeInfo {
  rasi: string;
  nakshatra: string;
  gothram: string;
  dosham: 'None' | 'Manglik / Kuja Dosha' | 'Chevvai Dosha' | 'Sarpa Dosha' | 'Don\'t Know';
  birthTime?: string;
  birthPlace?: string;
  padam?: number;
  horoscopeMatchGunas?: number; // out of 36 gunas
}

export interface LifestyleInfo {
  diet: DietType;
  smoking: 'No' | 'Yes' | 'Occasionally';
  drinking: 'No' | 'Yes' | 'Occasionally';
  hobbies: string[];
}

export interface PartnerPreferences {
  ageRange: [number, number];
  heightRange: [string, string];
  maritalStatus: MaritalStatus[];
  motherTongue: string[];
  religion: string[];
  caste: string[];
  education: string[];
  occupation: string[];
  minAnnualIncome: string;
  preferredStates: string[];
  diet: DietType[];
  manglikPreference: 'Doesn\'t Matter' | 'Only Non-Manglik' | 'Only Manglik';
}

export interface CandidateProfile {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  height: string; // e.g. "5' 5\" (165 cm)"
  heightInches: number; // for numeric filtering
  dateOfBirth: string;
  motherTongue: string;
  religion: string;
  caste: string;
  subcaste: string;
  maritalStatus: MaritalStatus;
  photoUrl: string;
  galleryPhotos: string[];
  photoPrivacy: 'Public' | 'OnRequest' | 'Protected';
  
  // Professional
  education: string;
  educationField: string;
  college: string;
  occupation: string;
  employedIn: 'Private Sector' | 'Government / PSU' | 'Business / Entrepreneur' | 'Civil Services' | 'Defence' | 'Not Working';
  workingCompany: string;
  annualIncome: string;
  annualIncomeNumeric: number; // in LPA for filtering
  
  // Location
  location: LocationInfo;
  
  // Astrology
  horoscope: HoroscopeInfo;
  
  // Family
  family: FamilyInfo;
  
  // Lifestyle
  lifestyle: LifestyleInfo;
  
  // Preferences
  partnerPreferences: PartnerPreferences;
  
  // Matrimonial Details
  aboutMe: string;
  profileCreatedBy: 'Self' | 'Parents' | 'Sibling' | 'Relative' | 'Friend';
  verified: {
    isIdVerified: boolean;
    isMobileVerified: boolean;
    isEducationVerified: boolean;
    isFamilyVerified: boolean;
  };
  
  compatibilityScore: number; // 0 - 100%
  horoscopeScore: number; // 0 - 36 gunas
  contactNumber: string;
  email: string;
  whatsappNumber: string;
  registrationDate: string;
  lastActive: string;
}

export interface UserProfile extends CandidateProfile {
  profileCompletionPercentage: number;
  accountStatus: 'Active' | 'Pending Verification' | 'Premium';
}

export interface SearchFilters {
  gender: Gender | 'all';
  ageMin: number;
  ageMax: number;
  heightMin: number; // in inches (e.g. 58 = 4'10")
  heightMax: number; // in inches (e.g. 78 = 6'6")
  maritalStatus: string[];
  religion: string[];
  caste: string[];
  motherTongue: string[];
  education: string[];
  occupation: string[];
  employedIn: string[];
  minIncomeLPA: number;
  state: string;
  city: string;
  country: string;
  diet: string[];
  dosham: string[];
  verifiedOnly: boolean;
  withPhotoOnly: boolean;
  searchId?: string;
  horoscopeStar?: string;
  horoscopeRasi?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'match';
  text: string;
  timestamp: string;
  isQuickPrompt?: boolean;
}

export interface Conversation {
  id: string;
  matchId: string;
  matchName: string;
  matchPhoto: string;
  matchOccupation: string;
  matchLocation: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: ChatMessage[];
}

export interface ActivityState {
  shortlistedIds: string[];
  interestsSent: {
    id: string;
    profileId: string;
    date: string;
    status: 'pending' | 'accepted' | 'declined';
    message?: string;
  }[];
  interestsReceived: {
    id: string;
    profileId: string;
    date: string;
    status: 'pending' | 'accepted' | 'declined';
  }[];
  viewedProfileIds: string[];
  contactUnlocks: {
    profileId: string;
    unlockedAt: string;
  }[];
}

export interface MembershipPlan {
  id: 'free' | 'gold' | 'diamond' | 'platinum';
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  durationMonths: number;
  durationLabel: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  contactViews: number;
  unlimitedInterests: boolean;
  features: string[];
  color: string;
  badge: string;
}

export interface ActiveMembership {
  planId: 'free' | 'gold' | 'diamond' | 'platinum';
  planName: string;
  purchasedAt: string;
  expiresAt: string;
  contactsRemaining: number;
  totalContacts: number;
  isAssisted: boolean;
}
