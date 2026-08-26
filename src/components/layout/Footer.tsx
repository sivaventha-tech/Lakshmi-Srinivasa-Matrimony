import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Phone, Mail, MapPin, Sparkles, Heart, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer id="main-footer" className="bg-[#1A0B0E] text-stone-300 border-t-4 border-amber-500/80">
      {/* Auspicious Blessing Tag */}
      <div className="bg-gradient-to-r from-amber-900/40 via-amber-800/40 to-amber-900/40 py-4 border-b border-amber-500/20 text-center px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs text-amber-200">
          <span className="flex items-center font-medium">
            <Sparkles className="w-4 h-4 text-amber-400 mr-1.5" />
            100% Genuine Family Background Verifications
          </span>
          <span className="hidden sm:inline text-amber-500/50">•</span>
          <span className="flex items-center font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mr-1.5" />
            Vedic Horoscope Match & Astrological Consultation
          </span>
          <span className="hidden sm:inline text-amber-500/50">•</span>
          <span className="flex items-center font-medium">
            <Award className="w-4 h-4 text-yellow-400 mr-1.5" />
            Govt. ID Verified Alliances
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#800020] border-2 border-amber-400 flex items-center justify-center text-amber-300 font-serif font-bold text-lg shadow-md">
                ॐ
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-amber-100 tracking-wider">
                  LAKSHMI SRINIVASA
                </h3>
                <p className="text-[10px] tracking-widest uppercase font-semibold text-amber-400">
                  Matrimony
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Lakshmi Srinivasa Matrimony is the premier sacred matchmaking sanctuary for Indian families seeking cultured, verified, and astrologically harmonious alliances across South India and the global Indian diaspora.
            </p>
            <div className="pt-2 text-xs text-stone-300 space-y-1.5">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Toll Free Helpline: <strong>1800-425-7799 / +91 98490 55443</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Email Support: <strong>care@lakshmisrinivasa.com</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>HQ: Srinivasa Towers, Road No. 12, Banjara Hills, Hyderabad - 500034</span>
              </div>
            </div>
          </div>

          {/* Column 2: Regional Matrimony */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
              Regional Alliances
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">Telugu Matrimony</button></li>
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">Tamil Matrimony</button></li>
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">Kannada Matrimony</button></li>
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">Malayalam Matrimony</button></li>
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">Marathi Matrimony</button></li>
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">Hindi / North Indian Matrimony</button></li>
            </ul>
          </div>

          {/* Column 3: Community & Caste Portals */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
              Community Portals
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">Brahmin Matrimony (Iyer, Iyengar, Niyogi)</button></li>
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">Reddy Matrimony</button></li>
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">Kamma Matrimony</button></li>
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">Arya Vysya Matrimony</button></li>
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">Kshatriya / Raju Matrimony</button></li>
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">Nair / Menon Matrimony</button></li>
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">NRI Matrimony (USA, UK, Australia)</button></li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Services */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
              Sacred Services
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={() => navigateTo('register')} className="hover:text-amber-300 transition">Register Free Profile</button></li>
              <li><button onClick={() => navigateTo('matches')} className="hover:text-amber-300 transition">Search Horoscope Matches</button></li>
              <li><button onClick={() => navigateTo('membership')} className="hover:text-amber-300 transition">Membership Upgrade Plans</button></li>
              <li><button onClick={() => navigateTo('membership')} className="hover:text-amber-300 transition">Assisted Matchmaker VIP Service</button></li>
              <li><button onClick={() => navigateTo('home')} className="hover:text-amber-300 transition">Vedic Kundali 36 Guna Reports</button></li>
              <li><button onClick={() => navigateTo('home')} className="hover:text-amber-300 transition">Success Stories & Testimonials</button></li>
            </ul>
          </div>
        </div>

        {/* City Branches Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 text-[11px] text-stone-500">
          <p className="font-semibold text-stone-400 mb-2">Our Consultation Centers Across India & Overseas:</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>Hyderabad (Banjara Hills & Kukatpally)</span>
            <span>•</span>
            <span>Chennai (T. Nagar & Mylapore)</span>
            <span>•</span>
            <span>Bengaluru (Malleshwaram & Indiranagar)</span>
            <span>•</span>
            <span>Vijayawada (M.G. Road)</span>
            <span>•</span>
            <span>Visakhapatnam (Dwaraka Nagar)</span>
            <span>•</span>
            <span>Tirupati (Alipiri Road)</span>
            <span>•</span>
            <span>Mumbai (Dadar)</span>
            <span>•</span>
            <span>New Jersey / Dallas / London / Singapore</span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Lakshmi Srinivasa Matrimony Private Limited. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Shield</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Sacred Alliances</span>
            <span className="hover:text-stone-400 cursor-pointer">Security Guidelines</span>
            <span className="hover:text-stone-400 cursor-pointer">Astrology Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
