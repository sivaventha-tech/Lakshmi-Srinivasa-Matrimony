import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ShieldCheck, Heart, Sparkles, CheckCircle2, Award, Users } from 'lucide-react';
import { Gender } from '../../types';

export const HeroSection: React.FC = () => {
  const { navigateTo, setSearchFilters, setIsLoginModalOpen, isAuthenticated } = useApp();

  const [lookingFor, setLookingFor] = useState<Gender>('female');
  const [minAge, setMinAge] = useState(21);
  const [maxAge, setMaxAge] = useState(30);
  const [caste, setCaste] = useState('All');
  const [motherTongue, setMotherTongue] = useState('All');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilters((prev) => ({
      ...prev,
      gender: lookingFor,
      ageMin: Number(minAge),
      ageMax: Number(maxAge),
      caste: caste === 'All' ? [] : [caste],
      motherTongue: motherTongue === 'All' ? [] : [motherTongue]
    }));
    navigateTo('matches');
  };

  return (
    <div id="hero-section" className="relative bg-gradient-to-b from-amber-50/70 via-rose-50/40 to-white overflow-hidden pb-12 pt-8 sm:pt-12 border-b border-amber-900/10">
      {/* Background Decorative Temple Mandap Motif Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Trust Badges */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-rose-100 border border-amber-300/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-950 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
              <span>India's Most Trusted Sacred Matrimonial Platform</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
              Find Your Auspicious <br className="hidden sm:inline" />
              <span className="text-[#800020] underline decoration-amber-400 decoration-wavy decoration-2">
                Soulmate & Life Partner
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Connecting cultured Indian families through 100% verified biodata, authentic Vedic horoscope compatibility, and dignified matchmaking assistance.
            </p>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-md mx-auto lg:mx-0">
              <div className="p-3 bg-white rounded-xl border border-amber-900/10 shadow-xs text-center">
                <div className="text-lg sm:text-xl font-bold text-[#800020] font-heading">10 Lakh+</div>
                <div className="text-[11px] text-stone-500 font-medium">Verified Profiles</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-amber-900/10 shadow-xs text-center">
                <div className="text-lg sm:text-xl font-bold text-[#800020] font-heading">36 Guna</div>
                <div className="text-[11px] text-stone-500 font-medium">Kundali Matching</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-amber-900/10 shadow-xs text-center">
                <div className="text-lg sm:text-xl font-bold text-[#800020] font-heading">98.4%</div>
                <div className="text-[11px] text-stone-500 font-medium">Family Trust</div>
              </div>
            </div>

            {/* Quick CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                id="hero-register-cta"
                onClick={() => navigateTo('register')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#800020] via-[#9B111E] to-[#800020] text-amber-100 font-bold text-sm shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95 transition flex items-center justify-center space-x-2"
              >
                <span>Register Free Biodata</span>
                <Heart className="w-4 h-4 fill-amber-300 text-amber-300" />
              </button>
              
              <button
                id="hero-browse-matches-btn"
                onClick={() => navigateTo('matches')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white border-2 border-amber-800/30 text-amber-950 font-bold text-sm hover:bg-amber-50 transition flex items-center justify-center space-x-2 shadow-xs"
              >
                <Search className="w-4 h-4 text-amber-700" />
                <span>Explore Verified Matches</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Quick Match Finder Box */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-xl border-2 border-amber-400/50 p-6 relative overflow-hidden">
              {/* Auspicious top accent ribbon */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-rose-600 to-amber-500"></div>

              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-[#800020] font-bold">
                  ॐ
                </div>
                <div>
                  <h3 className="font-heading font-bold text-stone-900 text-base">
                    Quick Match Finder
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Find matches matching your community & horoscope
                  </p>
                </div>
              </div>

              <form onSubmit={handleHeroSearch} className="space-y-3.5">
                {/* Looking For Gender */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    I am looking for a
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLookingFor('female')}
                      className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 border ${
                        lookingFor === 'female'
                          ? 'bg-[#800020] text-amber-100 border-[#800020] shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <span>Bride (Woman)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLookingFor('male')}
                      className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 border ${
                        lookingFor === 'male'
                          ? 'bg-[#800020] text-amber-100 border-[#800020] shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <span>Groom (Man)</span>
                    </button>
                  </div>
                </div>

                {/* Age Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Min Age
                    </label>
                    <select
                      value={minAge}
                      onChange={(e) => setMinAge(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50 font-medium focus:ring-2 focus:ring-[#800020]"
                    >
                      {[21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((a) => (
                        <option key={a} value={a}>{a} Years</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Max Age
                    </label>
                    <select
                      value={maxAge}
                      onChange={(e) => setMaxAge(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50 font-medium focus:ring-2 focus:ring-[#800020]"
                    >
                      {[25, 26, 27, 28, 29, 30, 32, 35, 38, 42].map((a) => (
                        <option key={a} value={a}>{a} Years</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Community / Caste */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Community / Caste
                  </label>
                  <select
                    value={caste}
                    onChange={(e) => setCaste(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50 font-medium focus:ring-2 focus:ring-[#800020]"
                  >
                    <option value="All">All Communities / Open to Any</option>
                    <option value="Brahmin">Brahmin (All Sub-sects)</option>
                    <option value="Reddy">Reddy</option>
                    <option value="Kamma">Kamma</option>
                    <option value="Arya Vysya">Arya Vysya / Komati</option>
                    <option value="Kshatriya / Raju">Kshatriya / Raju</option>
                    <option value="Maratha">Maratha</option>
                    <option value="Nair">Nair / Menon</option>
                  </select>
                </div>

                {/* Mother Tongue */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Mother Tongue
                  </label>
                  <select
                    value={motherTongue}
                    onChange={(e) => setMotherTongue(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50 font-medium focus:ring-2 focus:ring-[#800020]"
                  >
                    <option value="All">All Mother Tongues</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="quick-search-submit-btn"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-stone-950 font-extrabold text-xs tracking-wider uppercase shadow-md hover:brightness-105 active:scale-95 transition flex items-center justify-center space-x-1.5"
                >
                  <Search className="w-4 h-4 text-stone-950" />
                  <span>Search Auspicious Matches</span>
                </button>
              </form>

              <div className="mt-3 text-center text-[10px] text-stone-500 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Privacy Protected • Photos Protected Upon Request</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
