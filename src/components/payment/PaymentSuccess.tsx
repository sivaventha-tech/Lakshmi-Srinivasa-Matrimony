import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Sparkles, 
  Crown, 
  ArrowRight, 
  Download, 
  Phone, 
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const PaymentSuccess: React.FC = () => {
  const { 
    activeMembership, 
    navigateTo, 
    user,
    addToast
  } = useApp();

  const handleDownloadInvoice = () => {
    addToast('success', 'Tax Invoice Downloaded', 'Official GST invoice receipt saved.');
  };

  return (
    <div id="payment-success-page" className="min-h-screen py-12 bg-[#FDFBF7] flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500 shadow-2xl text-center space-y-6 relative overflow-hidden">
          
          {/* Top Auspicious Floral Deco */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-300 text-emerald-700 mx-auto flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auspicious Upgrade Confirmed</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
              Payment Successful!
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              Congratulations! Your <strong>{activeMembership.planId.toUpperCase()} Membership</strong> is now active for {user.name}.
            </p>
          </div>

          {/* Receipt Summary Card */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Transaction ID:</span>
              <span className="font-mono font-bold text-stone-900">{activeMembership.transactionId || 'TXN-LSM-9812409'}</span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Plan Upgraded:</span>
              <span className="font-bold text-[#800020] uppercase">{activeMembership.planId} Tier</span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Verified Contact Credits:</span>
              <span className="font-extrabold text-emerald-700">{activeMembership.contactsRemaining} Phone Unlocks</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Plan Expiry Date:</span>
              <span className="font-bold text-stone-900">{activeMembership.validUntil}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              id="success-go-dashboard-btn"
              onClick={() => navigateTo('dashboard')}
              className="w-full py-3.5 rounded-2xl bg-[#800020] text-amber-100 font-extrabold text-xs tracking-wider uppercase shadow-lg hover:bg-[#6A001A] transition flex items-center justify-center space-x-2"
            >
              <span>Go to Member Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="success-browse-matches-btn"
              onClick={() => navigateTo('matches')}
              className="w-full py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition"
            >
              Browse Matches & Unlock Contacts
            </button>

            <button
              onClick={handleDownloadInvoice}
              className="text-[11px] font-bold text-stone-500 hover:text-stone-800 underline flex items-center justify-center space-x-1 mx-auto pt-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Tax Invoice (Receipt)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
