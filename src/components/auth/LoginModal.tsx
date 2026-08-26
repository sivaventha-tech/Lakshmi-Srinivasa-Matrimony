import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Phone, Mail, UserCheck, ShieldCheck } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'demo' | 'otp' | 'password'>('demo');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) return;
    setOtpSent(true);
    setOtp('1234'); // Pre-fill mock OTP for smooth testing
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    login('LSM-2024-8891');
    navigateTo('dashboard');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('LSM-2024-8891');
    navigateTo('dashboard');
  };

  return (
    <div id="login-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        id="login-modal-container" 
        className="bg-white rounded-3xl shadow-2xl border border-amber-900/20 max-w-md w-full overflow-hidden relative"
      >
        {/* Header with temple border */}
        <div className="bg-gradient-to-r from-[#800020] via-[#9B111E] to-[#800020] p-6 text-white text-center relative border-b-2 border-amber-400">
          <button
            id="close-login-modal"
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-4 right-4 text-amber-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 mx-auto rounded-full bg-white/10 backdrop-blur-xs border border-amber-300 flex items-center justify-center text-amber-300 font-serif text-2xl font-bold shadow-inner mb-2">
            ॐ
          </div>
          <h3 className="font-heading text-xl font-bold text-amber-100">
            Welcome to Sacred Portal
          </h3>
          <p className="text-xs text-amber-200/90 mt-1">
            Lakshmi Srinivasa Matrimony Member Sign In
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              activeTab === 'demo' 
                ? 'bg-white text-[#800020] border-b-2 border-[#800020]' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Instant Demo</span>
          </button>
          <button
            onClick={() => setActiveTab('otp')}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              activeTab === 'otp' 
                ? 'bg-white text-[#800020] border-b-2 border-[#800020]' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-stone-600" />
            <span>Mobile OTP</span>
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              activeTab === 'password' 
                ? 'bg-white text-[#800020] border-b-2 border-[#800020]' 
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-stone-600" />
            <span>Email / ID</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-4">
          {activeTab === 'demo' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-600">
                Click any pre-configured verified account to experience all candidate matching, messaging, and Kundali features immediately:
              </p>
              
              <div className="space-y-2">
                <button
                  id="demo-login-adithya"
                  onClick={() => {
                    login('LSM-2024-8891');
                    navigateTo('dashboard');
                  }}
                  className="w-full p-3 rounded-xl border border-amber-900/20 hover:border-amber-600 hover:bg-amber-50/50 flex items-center space-x-3 text-left transition group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                    alt="Adithya"
                    className="w-10 h-10 rounded-full object-cover border border-amber-400"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900 group-hover:text-[#800020]">
                        Adithya Sharma (Groom)
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                        Verified Groom
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate">
                      Staff Software Architect • Hyderabad • Brahmin
                    </p>
                  </div>
                </button>

                <button
                  id="demo-login-priya"
                  onClick={() => {
                    login('LSM-2024-7104');
                    navigateTo('dashboard');
                  }}
                  className="w-full p-3 rounded-xl border border-amber-900/20 hover:border-amber-600 hover:bg-rose-50/50 flex items-center space-x-3 text-left transition group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    alt="Dr. Priya"
                    className="w-10 h-10 rounded-full object-cover border border-rose-400"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900 group-hover:text-[#800020]">
                        Dr. Priya Sundaram (Bride)
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                        Verified Bride
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate">
                      MD Dermatologist • Chennai • Iyer Brahmin
                    </p>
                  </div>
                </button>

                <button
                  id="demo-login-ananya"
                  onClick={() => {
                    login('LSM-2024-6520');
                    navigateTo('dashboard');
                  }}
                  className="w-full p-3 rounded-xl border border-amber-900/20 hover:border-amber-600 hover:bg-amber-50/50 flex items-center space-x-3 text-left transition group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                    alt="Ananya"
                    className="w-10 h-10 rounded-full object-cover border border-amber-400"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900 group-hover:text-[#800020]">
                        Ananya Reddy (Bride)
                      </span>
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                        Google PM
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate">
                      Product Leader • Hyderabad • Reddy
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'otp' && (
            <form onSubmit={otpSent ? handleOtpVerify : handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Enter Registered Mobile Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-stone-300 bg-stone-100 text-stone-600 text-xs font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="98490 12345"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-r-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#800020]"
                    required
                  />
                </div>
              </div>

              {otpSent && (
                <div className="animate-in fade-in">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Enter 4-Digit OTP (Mock auto-filled: 1234)
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={4}
                    className="w-full px-3 py-2.5 text-center tracking-widest text-lg font-bold rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#800020]"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#800020] text-amber-100 font-bold text-xs shadow-md hover:bg-[#6A001A] transition"
              >
                {otpSent ? 'Verify OTP & Enter' : 'Get Auspicious OTP'}
              </button>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Email ID or Profile ID (e.g. LSM-2024-8891)
                </label>
                <input
                  type="text"
                  placeholder="adithya.sharma@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#800020]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#800020]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#800020] text-amber-100 font-bold text-xs shadow-md hover:bg-[#6A001A] transition mt-2"
              >
                Sign In to Account
              </button>
            </form>
          )}

          {/* Footer note */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>New family to LSM?</span>
            <button
              onClick={() => {
                setIsLoginModalOpen(false);
                navigateTo('register');
              }}
              className="font-bold text-[#800020] hover:underline"
            >
              Register Free Profile →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
