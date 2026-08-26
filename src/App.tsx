/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { LoginModal } from './components/auth/LoginModal';

// Views
import { HomeView } from './components/home/HomeView';
import { MultiStepRegistration } from './components/registration/MultiStepRegistration';
import { MemberDashboard } from './components/dashboard/MemberDashboard';
import { FindMatches } from './components/matches/FindMatches';
import { FullProfileView } from './components/profile/FullProfileView';
import { ActivityHub } from './components/activity/ActivityHub';
import { MessagesView } from './components/chat/MessagesView';
import { MembershipView } from './components/membership/MembershipView';
import { PaymentCheckout } from './components/payment/PaymentCheckout';
import { PaymentSuccess } from './components/payment/PaymentSuccess';
import { HelpSupportView } from './components/help/HelpSupportView';
import { SettingsView } from './components/settings/SettingsView';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-stone-900 font-sans selection:bg-[#800020] selection:text-amber-100">
      <Navbar />
      
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'register' && <MultiStepRegistration />}
        {currentView === 'dashboard' && <MemberDashboard />}
        {currentView === 'matches' && <FindMatches />}
        {currentView === 'profile-view' && <FullProfileView />}
        {currentView === 'shortlisted' && <ActivityHub />}
        {currentView === 'messages' && <MessagesView />}
        {currentView === 'membership' && <MembershipView />}
        {currentView === 'payment' && <PaymentCheckout />}
        {currentView === 'payment-success' && <PaymentSuccess />}
        {currentView === 'help' && <HelpSupportView />}
        {currentView === 'settings' && <SettingsView />}
      </main>

      <Footer />
      <LoginModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
