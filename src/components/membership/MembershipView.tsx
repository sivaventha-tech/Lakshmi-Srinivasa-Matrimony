import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MEMBERSHIP_PLANS, COUPONS } from '../../data/membershipPlans';
import { MembershipPlan } from '../../types';
import { 
  Crown, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  Award, 
  Tag, 
  ArrowRight
} from 'lucide-react';

export const MembershipView: React.FC = () => {
  const { 
    setSelectedPlanForCheckout, 
    navigateTo, 
    activeMembership,
    addToast
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedDiscount(COUPONS[code].discountPercent);
      setCouponMessage(`Success! ${COUPONS[code].description}`);
      addToast('success', 'Coupon Applied', `${COUPONS[code].discountPercent}% discount applied!`);
    } else {
      setCouponMessage('Invalid or expired coupon. Try "VIVAH20", "FAMILY10" or "SHUBHAM25"');
    }
  };

  const handleSelectPlan = (plan: MembershipPlan) => {
    setSelectedPlanForCheckout(plan);
    navigateTo('payment');
  };

  return (
    <div id="membership-pricing-page" className="min-h-screen py-10 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#800020] bg-rose-50 px-3.5 py-1 rounded-full border border-rose-200">
            <Crown className="w-3.5 h-3.5" />
            <span>Auspicious Family Upgrades</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900">
            Choose Your Sacred Membership Plan
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Unlock verified phone numbers, arrange direct parent-to-parent meetings, and receive dedicated assistance from senior Vedic matchmakers.
          </p>

          {/* Coupon Input */}
          <form onSubmit={handleApplyCoupon} className="pt-2 flex max-w-md mx-auto items-center space-x-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-amber-700 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Promo Code (e.g. VIVAH20)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-amber-900/20 uppercase font-mono tracking-wider focus:ring-2 focus:ring-[#800020]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#800020] text-amber-100 text-xs font-bold hover:bg-[#6A001A] transition shadow-xs"
            >
              Apply
            </button>
          </form>
          {couponMessage && (
            <p className={`text-xs font-bold ${appliedDiscount ? 'text-emerald-700' : 'text-rose-600'}`}>
              {couponMessage}
            </p>
          )}
        </div>

        {/* Membership Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isCurrent = activeMembership.planId === plan.id;
            const discountedPrice = appliedDiscount
              ? Math.round(plan.price * (1 - appliedDiscount / 100))
              : plan.price;

            return (
              <div
                key={plan.id}
                id={`plan-card-${plan.id}`}
                className={`rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between relative ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-amber-50/90 via-white to-amber-50/50 border-2 border-amber-500 shadow-xl scale-105 z-10'
                    : 'bg-white border border-amber-900/15 shadow-sm hover:shadow-lg'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#800020] to-[#9B111E] text-amber-200 text-[11px] font-black px-4 py-0.5 rounded-full border border-amber-300 shadow-md uppercase tracking-wider flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="border-b border-stone-100 pb-4">
                    <h3 className="font-heading font-bold text-lg text-stone-900">{plan.name}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">{plan.subtitle}</p>
                    
                    <div className="mt-4 flex items-baseline">
                      {plan.price === 0 ? (
                        <span className="font-heading text-3xl font-extrabold text-stone-900">FREE</span>
                      ) : (
                        <div>
                          {appliedDiscount && (
                            <span className="text-xs text-stone-400 line-through mr-2">₹ {plan.price.toLocaleString()}</span>
                          )}
                          <span className="font-heading text-3xl font-extrabold text-[#800020]">
                            ₹ {discountedPrice.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <span className="text-xs text-stone-500 ml-1.5">/ {plan.durationLabel}</span>
                    </div>

                    <div className="mt-2 text-xs font-bold text-amber-900 bg-amber-100/60 px-2.5 py-1 rounded-lg inline-block">
                      {plan.contactViews > 0 ? `${plan.contactViews} Verified Contact Credits` : 'Standard Viewing'}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs text-stone-700">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan Action CTA */}
                <div className="pt-6 border-t border-stone-100">
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl bg-stone-100 text-stone-500 font-bold text-xs cursor-default text-center"
                    >
                      Active Plan
                    </button>
                  ) : (
                    <button
                      id={`choose-plan-${plan.id}`}
                      onClick={() => handleSelectPlan(plan)}
                      className={`w-full py-3 rounded-xl font-bold text-xs transition shadow-md flex items-center justify-center space-x-1.5 ${
                        plan.isPopular
                          ? 'bg-[#800020] text-amber-100 hover:bg-[#6A001A]'
                          : 'bg-stone-900 text-white hover:bg-stone-800'
                      }`}
                    >
                      <span>{plan.price === 0 ? 'Activate Free' : 'Choose Plan & Pay'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="bg-white rounded-3xl p-8 border border-amber-900/10 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-800 mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-sm text-stone-900">100% Privacy Protection</h4>
            <p className="text-xs text-stone-500">Your phone number and photographs are strictly protected by member privacy controls.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-[#800020] mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-sm text-stone-900">Senior Matchmaker Support</h4>
            <p className="text-xs text-stone-500">Dedicated relationship advisors assist your family in finding verified compatible matches.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-800 mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-sm text-stone-900">Direct Family Phone Connect</h4>
            <p className="text-xs text-stone-500">Unlock authentic phone & WhatsApp contact numbers to speak directly with parents.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
