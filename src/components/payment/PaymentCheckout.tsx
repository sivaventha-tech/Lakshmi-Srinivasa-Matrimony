import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MEMBERSHIP_PLANS } from '../../data/membershipPlans';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet, 
  CheckCircle2, 
  Lock, 
  ArrowLeft, 
  Sparkles,
  QrCode,
  Check
} from 'lucide-react';

export const PaymentCheckout: React.FC = () => {
  const { 
    selectedPlanForCheckout, 
    completePayment, 
    navigateTo,
    addToast
  } = useApp();

  const plan = selectedPlanForCheckout || MEMBERSHIP_PLANS[1]; // Default to Gold if none selected

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);

  // Card details state
  const [cardNumber, setCardNumber] = useState('4532 8912 3456 7890');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('883');
  const [cardName, setCardName] = useState('Srikar Vangala');

  // Selected Bank for Netbanking
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const gstAmount = Math.round(plan.price * 0.18);
  const totalAmount = plan.price === 0 ? 0 : plan.price + gstAmount;

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    addToast('info', 'Processing Payment...', 'Connecting with secure banking gateway.');

    setTimeout(() => {
      setIsProcessing(false);
      completePayment(plan.id, plan.contactViews);
      navigateTo('payment-success');
    }, 1500);
  };

  return (
    <div id="payment-checkout-page" className="min-h-screen py-10 bg-[#FDFBF7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Back Button */}
        <button
          onClick={() => navigateTo('membership')}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#800020] hover:bg-rose-50 px-3 py-1.5 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Plans</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Payment Methods Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h1 className="font-heading text-xl font-bold text-stone-900">
                  Select Payment Method
                </h1>
                <p className="text-xs text-stone-500">100% Encrypted & RBI Approved Payment Gateway</p>
              </div>
              <div className="flex items-center space-x-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl text-xs font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL</span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                { id: 'card', label: 'Cards', icon: CreditCard },
                { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                { id: 'wallet', label: 'Wallets', icon: Wallet }
              ].map((m) => {
                const Icon = m.icon;
                const isSel = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center space-y-1.5 transition ${
                      isSel
                        ? 'bg-[#800020] text-amber-100 border-[#800020] shadow-md'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* FORM CONTAINER */}
            <form onSubmit={handlePayNow} className="space-y-4 pt-2">
              
              {/* UPI Option */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 bg-amber-50/70 border border-amber-300/60 rounded-2xl flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-amber-950">Fastest: Instant UPI QR Code</p>
                      <p className="text-[11px] text-amber-900">Scan with Google Pay, PhonePe, Paytm or BHIM app</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-xl border border-amber-300 flex items-center justify-center text-[#800020] shadow-xs">
                      <QrCode className="w-8 h-8" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Or Enter Your UPI ID (VPA)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@oksbi"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#800020]"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Card Option */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 font-mono"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300"
                      required
                    />
                  </div>
                </div>
              )}

              {/* NetBanking Option */}
              {paymentMethod === 'netbanking' && (
                <div className="space-y-3 animate-in fade-in">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Select Your Bank
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Andhra / Union Bank'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBank(b)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition text-left ${
                          selectedBank === b
                            ? 'bg-[#800020] text-amber-100 border-[#800020]'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Wallets Option */}
              {paymentMethod === 'wallet' && (
                <div className="space-y-2 animate-in fade-in">
                  {['Paytm Wallet', 'Amazon Pay', 'Mobikwik'].map((w) => (
                    <div key={w} className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-800">{w}</span>
                      <input type="radio" name="wallet" defaultChecked className="accent-[#800020]" />
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Payment CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  id="checkout-pay-btn"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#800020] to-[#9B111E] text-amber-100 font-extrabold text-sm shadow-xl hover:brightness-110 active:scale-98 transition flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <span className="animate-pulse">Authorizing Bank Transaction...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-amber-300" />
                      <span>
                        {totalAmount === 0 ? 'Confirm Free Activation' : `Pay ₹ ${totalAmount.toLocaleString()} Securely`}
                      </span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* RIGHT: Order Summary Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-amber-900/15 shadow-md space-y-4">
              <h3 className="font-heading font-bold text-base text-stone-900 border-b border-stone-100 pb-3">
                Order & Plan Summary
              </h3>

              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-300/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-stone-900 text-sm">{plan.name}</span>
                  <span className="text-xs font-bold text-stone-500">{plan.durationLabel}</span>
                </div>
                <p className="text-xs text-stone-600">{plan.subtitle}</p>
                <div className="pt-1 text-xs font-bold text-emerald-800 flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>{plan.contactViews} Verified Contact Credits Included</span>
                </div>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Plan Base Price:</span>
                  <span className="font-bold text-stone-900">₹ {plan.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Govt. GST (18%):</span>
                  <span className="font-bold text-stone-900">₹ {gstAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Amount Payable:</span>
                  <span className="text-[#800020] text-base">₹ {totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Money-back Guarantee & Support */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">100% Satisfaction Guarantee</p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  If you do not find suitable family profiles within 30 days, our dedicated matchmaking team will extend your plan free.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
