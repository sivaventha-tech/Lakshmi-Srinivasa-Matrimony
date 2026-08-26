import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  AppView, 
  UserProfile, 
  CandidateProfile, 
  SearchFilters, 
  Conversation, 
  ActiveMembership, 
  ActivityState,
  ChatMessage
} from '../types';
import { INITIAL_LOGGED_IN_USER, MOCK_CANDIDATES } from '../data/mockProfiles';
import { MEMBERSHIP_PLANS } from '../data/membershipPlans';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation & View
  currentView: AppView;
  navigateTo: (view: AppView, profileId?: string) => void;
  selectedProfileId: string | null;
  setSelectedProfileId: (id: string | null) => void;
  
  // User & Auth
  user: UserProfile;
  isAuthenticated: boolean;
  login: (demoId?: string) => void;
  logout: () => void;
  registerNewUser: (data: Partial<UserProfile>) => void;
  switchDemoUser: (gender: 'male' | 'female') => void;
  
  // Profiles & Search
  allCandidates: CandidateProfile[];
  searchFilters: SearchFilters;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  resetSearchFilters: () => void;
  
  // Activity (Shortlists & Interests)
  activity: ActivityState;
  toggleShortlist: (profileId: string) => void;
  isShortlisted: (profileId: string) => boolean;
  sendInterest: (profileId: string, customMessage?: string) => void;
  hasSentInterest: (profileId: string) => boolean;
  respondToInterest: (profileId: string, action: 'accepted' | 'declined') => void;
  
  // Contacts & Membership
  activeMembership: ActiveMembership;
  selectedPlanForCheckout: any;
  setSelectedPlanForCheckout: (plan: any) => void;
  unlockContact: (profileId: string) => boolean;
  isContactUnlocked: (profileId: string) => boolean;
  upgradeMembership: (planId: 'gold' | 'diamond' | 'platinum', paymentDetails: { method: string; amount: number; transactionId: string }) => void;
  completePayment: (planId: string, contactViews?: number) => void;
  
  // Messages / Chat
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessageToMatch: (conversationId: string, text: string) => void;
  startChatWithCandidate: (profileId: string) => void;
  
  // Toasts
  toasts: ToastNotification[];
  addToast: (type: 'success' | 'info' | 'warning', title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Login Modal
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

const DEFAULT_FILTERS: SearchFilters = {
  gender: 'female',
  ageMin: 21,
  ageMax: 35,
  heightMin: 58,
  heightMax: 76,
  maritalStatus: [],
  religion: [],
  caste: [],
  motherTongue: [],
  education: [],
  occupation: [],
  employedIn: [],
  minIncomeLPA: 0,
  state: '',
  city: '',
  country: '',
  diet: [],
  dosham: [],
  verifiedOnly: false,
  withPhotoOnly: false
};

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    matchId: 'LSM-2024-7104',
    matchName: 'Dr. Priya Sundaram',
    matchPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    matchOccupation: 'Consultant Dermatologist (Apollo)',
    matchLocation: 'Chennai, Tamil Nadu',
    lastMessage: 'Namaste Adithya, our parents saw your profile and horoscope match of 31 Gunas. We would love to connect for a family introductory call.',
    lastMessageTime: '10:45 AM',
    unreadCount: 1,
    isOnline: true,
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Namaste Dr. Priya! I came across your profile on Lakshmi Srinivasa Matrimony. Our backgrounds and cultural interests align wonderfully.',
        timestamp: 'Yesterday 08:30 PM'
      },
      {
        id: 'm2',
        sender: 'match',
        text: 'Namaste Adithya! Thank you for expressing interest. My parents reviewed your profile and horoscope match of 31 Gunas. We would love to connect for a family introductory call this weekend.',
        timestamp: '10:45 AM'
      }
    ]
  },
  {
    id: 'conv-2',
    matchId: 'LSM-2024-6520',
    matchName: 'Ananya Reddy',
    matchPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    matchOccupation: 'Senior Product Manager (Google)',
    matchLocation: 'Hyderabad, Telangana',
    lastMessage: 'Sure, we can speak this Sunday evening around 6 PM.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: 'm3',
        sender: 'user',
        text: 'Hi Ananya, great to connect. Both of us being in Hyderabad tech ecosystem and having shared family values is wonderful!',
        timestamp: '2 days ago'
      },
      {
        id: 'm4',
        sender: 'match',
        text: 'Sure, we can speak this Sunday evening around 6 PM after my parents review the biodata document.',
        timestamp: 'Yesterday'
      }
    ]
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<AppView>(() => {
    return 'home';
  });
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

  // User & Auth
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('lsm_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_LOGGED_IN_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('lsm_is_auth');
    return saved === 'true';
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Search Filters
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(() => {
    const initial = { ...DEFAULT_FILTERS };
    // If user is male, search for female by default
    initial.gender = user.gender === 'male' ? 'female' : 'male';
    return initial;
  });

  // Activity State (Shortlists & Interests)
  const [activity, setActivity] = useState<ActivityState>(() => {
    const saved = localStorage.getItem('lsm_activity');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      shortlistedIds: ['LSM-2024-7104', 'LSM-2024-5190'],
      interestsSent: [
        {
          id: 'int-1',
          profileId: 'LSM-2024-7104',
          date: '2025-02-20',
          status: 'accepted',
          message: 'Our family was impressed with your profile.'
        },
        {
          id: 'int-2',
          profileId: 'LSM-2024-6520',
          date: '2025-02-22',
          status: 'accepted'
        }
      ],
      interestsReceived: [
        {
          id: 'int-in-1',
          profileId: 'LSM-2024-8912',
          date: '2025-02-24',
          status: 'pending'
        },
        {
          id: 'int-in-2',
          profileId: 'LSM-2024-4328',
          date: '2025-02-25',
          status: 'pending'
        }
      ],
      viewedProfileIds: ['LSM-2024-7104', 'LSM-2024-6520', 'LSM-2024-5190', 'LSM-2024-8912', 'LSM-2024-4328'],
      contactUnlocks: [
        {
          profileId: 'LSM-2024-7104',
          unlockedAt: '2025-02-21'
        }
      ]
    };
  });

  // Membership
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<any>(MEMBERSHIP_PLANS[1]);
  const [activeMembership, setActiveMembership] = useState<ActiveMembership>(() => {
    const saved = localStorage.getItem('lsm_membership');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      planId: 'gold',
      planName: 'Gold Sacred Plan',
      purchasedAt: '2025-01-15',
      expiresAt: '2025-04-15',
      contactsRemaining: 28,
      totalContacts: 35,
      isAssisted: false
    };
  });

  // Conversations
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('lsm_conversations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CONVERSATIONS;
  });
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-1');

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('lsm_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('lsm_is_auth', String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('lsm_activity', JSON.stringify(activity));
  }, [activity]);

  useEffect(() => {
    localStorage.setItem('lsm_membership', JSON.stringify(activeMembership));
  }, [activeMembership]);

  useEffect(() => {
    localStorage.setItem('lsm_conversations', JSON.stringify(conversations));
  }, [conversations]);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (view: AppView, profileId?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (profileId) {
      setSelectedProfileId(profileId);
    }
    setCurrentView(view);
  };

  const login = (demoId?: string) => {
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    if (demoId) {
      const match = MOCK_CANDIDATES.find((c) => c.id === demoId);
      if (match) {
        const newUser: UserProfile = {
          ...match,
          profileCompletionPercentage: 100,
          accountStatus: 'Active'
        };
        setUser(newUser);
        setSearchFilters((prev) => ({
          ...prev,
          gender: match.gender === 'male' ? 'female' : 'male'
        }));
      }
    }
    addToast('success', 'Auspicious Login Successful', `Welcome back, ${user.name}!`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigateTo('home');
    addToast('info', 'Logged Out', 'You have been logged out securely.');
  };

  const switchDemoUser = (gender: 'male' | 'female') => {
    if (gender === 'male') {
      setUser(INITIAL_LOGGED_IN_USER);
      setSearchFilters((prev) => ({ ...prev, gender: 'female' }));
      addToast('info', 'Switched Profile', 'Active Profile: Adithya Sharma (Groom)');
    } else {
      const femaleDemo = MOCK_CANDIDATES.find((c) => c.gender === 'female');
      if (femaleDemo) {
        const fUser: UserProfile = {
          ...femaleDemo,
          profileCompletionPercentage: 98,
          accountStatus: 'Active'
        };
        setUser(fUser);
        setSearchFilters((prev) => ({ ...prev, gender: 'male' }));
        addToast('info', 'Switched Profile', `Active Profile: ${femaleDemo.name} (Bride)`);
      }
    }
  };

  const registerNewUser = (data: Partial<UserProfile>) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newProfile: UserProfile = {
      ...INITIAL_LOGGED_IN_USER,
      ...data,
      id: `LSM-2025-${randomNum}`,
      profileCompletionPercentage: 100,
      accountStatus: 'Active',
      registrationDate: new Date().toISOString().split('T')[0],
      lastActive: 'Just now',
      verified: {
        isIdVerified: true,
        isMobileVerified: true,
        isEducationVerified: true,
        isFamilyVerified: true
      }
    };
    setUser(newProfile);
    setIsAuthenticated(true);
    setSearchFilters((prev) => ({
      ...prev,
      gender: newProfile.gender === 'male' ? 'female' : 'male'
    }));
    addToast('success', 'Sacred Profile Registered', 'Your profile is 100% verified. Welcome to Lakshmi Srinivasa Matrimony!');
    navigateTo('dashboard');
  };

  const resetSearchFilters = () => {
    setSearchFilters({
      ...DEFAULT_FILTERS,
      gender: user.gender === 'male' ? 'female' : 'male'
    });
    addToast('info', 'Filters Reset', 'Search criteria returned to default.');
  };

  const toggleShortlist = (profileId: string) => {
    const isAlready = activity.shortlistedIds.includes(profileId);
    setActivity((prev) => {
      const updated = isAlready
        ? prev.shortlistedIds.filter((id) => id !== profileId)
        : [...prev.shortlistedIds, profileId];
      return { ...prev, shortlistedIds: updated };
    });
    
    const candidate = MOCK_CANDIDATES.find((c) => c.id === profileId);
    const name = candidate?.name || 'Profile';
    if (isAlready) {
      addToast('info', 'Shortlist Removed', `${name} has been removed from your saved list.`);
    } else {
      addToast('success', 'Profile Shortlisted', `${name} has been added to your Shortlisted candidates.`);
    }
  };

  const isShortlisted = (profileId: string) => {
    return activity.shortlistedIds.includes(profileId);
  };

  const sendInterest = (profileId: string, customMessage?: string) => {
    if (hasSentInterest(profileId)) {
      addToast('info', 'Already Expressed Interest', 'You have already sent an interest to this candidate.');
      return;
    }

    const newInterest = {
      id: `int-${Date.now()}`,
      profileId,
      date: new Date().toISOString().split('T')[0],
      status: 'pending' as const,
      message: customMessage || 'Our family is deeply interested in your profile and horoscope compatibility.'
    };

    setActivity((prev) => ({
      ...prev,
      interestsSent: [newInterest, ...prev.interestsSent]
    }));

    const candidate = MOCK_CANDIDATES.find((c) => c.id === profileId);
    addToast(
      'success', 
      'Interest Expressed Successfully!', 
      `Your auspicious interest with horoscope match was sent to ${candidate?.name || 'the family'}.`
    );
  };

  const hasSentInterest = (profileId: string) => {
    return activity.interestsSent.some((int) => int.profileId === profileId);
  };

  const respondToInterest = (profileId: string, action: 'accepted' | 'declined') => {
    setActivity((prev) => ({
      ...prev,
      interestsReceived: prev.interestsReceived.map((item) => {
        if (item.profileId === profileId) {
          return { ...item, status: action };
        }
        return item;
      })
    }));

    const candidate = MOCK_CANDIDATES.find((c) => c.id === profileId);
    const name = candidate?.name || 'Candidate';
    if (action === 'accepted') {
      addToast('success', 'Interest Accepted', `You accepted ${name}'s interest. You can now chat and share family contact details!`);
      // Start a chat conversation automatically
      startChatWithCandidate(profileId);
    } else {
      addToast('info', 'Interest Declined', `You politely declined the interest from ${name}.`);
    }
  };

  const isContactUnlocked = (profileId: string) => {
    return activity.contactUnlocks.some((c) => c.profileId === profileId);
  };

  const unlockContact = (profileId: string): boolean => {
    if (isContactUnlocked(profileId)) return true;

    if (activeMembership.contactsRemaining <= 0 && activeMembership.planId === 'free') {
      addToast('warning', 'Membership Upgrade Required', 'Free members cannot view verified phone numbers. Please upgrade to Gold or Diamond!');
      navigateTo('membership');
      return false;
    }

    if (activeMembership.contactsRemaining <= 0) {
      addToast('warning', 'Contact Limit Reached', 'You have used all contact credits for this cycle. Please upgrade your plan!');
      navigateTo('membership');
      return false;
    }

    setActiveMembership((prev) => ({
      ...prev,
      contactsRemaining: Math.max(0, prev.contactsRemaining - 1)
    }));

    setActivity((prev) => ({
      ...prev,
      contactUnlocks: [
        {
          profileId,
          unlockedAt: new Date().toISOString().split('T')[0]
        },
        ...prev.contactUnlocks
      ]
    }));

    const candidate = MOCK_CANDIDATES.find((c) => c.id === profileId);
    addToast(
      'success',
      'Verified Contact Unlocked',
      `Phone and WhatsApp details for ${candidate?.name || 'profile'} are now visible! (${activeMembership.contactsRemaining - 1} credits remaining)`
    );
    return true;
  };

  const upgradeMembership = (
    planId: 'gold' | 'diamond' | 'platinum',
    paymentDetails: { method: string; amount: number; transactionId: string }
  ) => {
    const selectedPlan = MEMBERSHIP_PLANS.find((p) => p.id === planId);
    if (!selectedPlan) return;

    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + (selectedPlan.durationMonths || 3));

    const newMembership: ActiveMembership = {
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      purchasedAt: new Date().toISOString().split('T')[0],
      expiresAt: expiry.toISOString().split('T')[0],
      contactsRemaining: selectedPlan.contactViews,
      totalContacts: selectedPlan.contactViews,
      isAssisted: planId === 'platinum'
    };

    setActiveMembership(newMembership);
    setUser((prev) => ({ ...prev, accountStatus: 'Premium' }));
    
    // Store latest invoice info in session for payment success screen
    sessionStorage.setItem('lsm_last_payment', JSON.stringify({
      plan: selectedPlan,
      payment: paymentDetails,
      expiryDate: expiry.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    }));

    navigateTo('payment-success');
    addToast('success', 'Plan Upgraded Successfully!', `Welcome to ${selectedPlan.name}. All premium features are unlocked.`);
  };

  const completePayment = (planId: string, contactViews: number = 35) => {
    const selectedPlan = MEMBERSHIP_PLANS.find((p) => p.id === planId) || MEMBERSHIP_PLANS[1];
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + (selectedPlan.durationMonths || 3));

    const newMembership: ActiveMembership = {
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      purchasedAt: new Date().toISOString().split('T')[0],
      expiresAt: expiry.toISOString().split('T')[0],
      contactsRemaining: contactViews,
      totalContacts: contactViews,
      isAssisted: planId === 'platinum'
    };

    setActiveMembership(newMembership);
    setUser((prev) => ({ ...prev, accountStatus: 'Premium' }));

    sessionStorage.setItem('lsm_last_payment', JSON.stringify({
      plan: selectedPlan,
      payment: {
        method: 'UPI / Card Online Payment',
        amount: selectedPlan.price * 1.18,
        transactionId: `TXN-LSM-${Date.now()}`
      },
      expiryDate: expiry.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    }));

    addToast('success', 'Payment Successful!', `Your ${selectedPlan.name} is activated.`);
  };

  const startChatWithCandidate = (profileId: string) => {
    const existing = conversations.find((c) => c.matchId === profileId);
    if (existing) {
      setActiveConversationId(existing.id);
      navigateTo('messages');
      return;
    }

    const candidate = MOCK_CANDIDATES.find((c) => c.id === profileId);
    if (!candidate) return;

    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      matchId: candidate.id,
      matchName: candidate.name,
      matchPhoto: candidate.photoUrl,
      matchOccupation: `${candidate.occupation} (${candidate.workingCompany})`,
      matchLocation: `${candidate.location.city}, ${candidate.location.state}`,
      lastMessage: 'Auspicious match established. Send a greeting to begin your conversation.',
      lastMessageTime: 'Just now',
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: `m-init-${Date.now()}`,
          sender: 'user',
          text: `Namaste ${candidate.name}! Delighted to connect with you and your family on Lakshmi Srinivasa Matrimony.`,
          timestamp: 'Just now'
        }
      ]
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    navigateTo('messages');
  };

  const sendMessageToMatch = (conversationId: string, text: string) => {
    if (!text.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: timeStr
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text.trim(),
            lastMessageTime: timeStr,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    // Realistic auto-reply simulation after 2 seconds
    setTimeout(() => {
      const matchReply: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'match',
        text: 'Thank you for your message! Our family has reviewed the horoscope details and we are happy to take this conversation forward. Can we schedule a brief video call?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === conversationId) {
            return {
              ...c,
              lastMessage: matchReply.text,
              lastMessageTime: matchReply.timestamp,
              messages: [...c.messages, matchReply]
            };
          }
          return c;
        })
      );
      addToast('info', 'New Message Received', 'Your match responded to your message.');
    }, 2500);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        navigateTo,
        selectedProfileId,
        setSelectedProfileId,
        user,
        isAuthenticated,
        login,
        logout,
        registerNewUser,
        switchDemoUser,
        allCandidates: MOCK_CANDIDATES,
        searchFilters,
        setSearchFilters,
        resetSearchFilters,
        activity,
        toggleShortlist,
        isShortlisted,
        sendInterest,
        hasSentInterest,
        respondToInterest,
        activeMembership,
        selectedPlanForCheckout,
        setSelectedPlanForCheckout,
        unlockContact,
        isContactUnlocked,
        upgradeMembership,
        completePayment,
        conversations,
        activeConversationId,
        setActiveConversationId,
        sendMessageToMatch,
        startChatWithCandidate,
        toasts,
        addToast,
        removeToast,
        isLoginModalOpen,
        setIsLoginModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
