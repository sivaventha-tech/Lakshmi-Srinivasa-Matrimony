import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CandidateProfile, Gender } from '../../types';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Heart, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  MessageSquare, 
  Grid, 
  List, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ChevronRight,
  SlidersHorizontal,
  Sparkles,
  Award
} from 'lucide-react';

export const FindMatches: React.FC = () => {
  const { 
    allCandidates, 
    searchFilters, 
    setSearchFilters, 
    resetSearchFilters, 
    navigateTo, 
    toggleShortlist, 
    isShortlisted, 
    sendInterest, 
    hasSentInterest,
    startChatWithCandidate,
    user
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'advanced' | 'horoscope' | 'id'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'matchScore' | 'horoscope' | 'ageAsc' | 'income'>('matchScore');
  const [searchIdQuery, setSearchIdQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter Logic
  const filteredCandidates = useMemo(() => {
    return allCandidates.filter((candidate) => {
      // 1. Gender Filter
      if (searchFilters.gender !== 'all' && candidate.gender !== searchFilters.gender) {
        return false;
      }

      // 2. Age Filter
      if (candidate.age < searchFilters.ageMin || candidate.age > searchFilters.ageMax) {
        return false;
      }

      // 3. Caste / Community Filter
      if (searchFilters.caste.length > 0) {
        const matchesCaste = searchFilters.caste.some((c) => 
          candidate.caste.toLowerCase().includes(c.toLowerCase()) || 
          candidate.subcaste.toLowerCase().includes(c.toLowerCase())
        );
        if (!matchesCaste) return false;
      }

      // 4. Mother Tongue
      if (searchFilters.motherTongue.length > 0) {
        if (!searchFilters.motherTongue.includes(candidate.motherTongue)) {
          return false;
        }
      }

      // 5. Education
      if (searchFilters.education.length > 0) {
        const matchesEdu = searchFilters.education.some((e) =>
          candidate.education.toLowerCase().includes(e.toLowerCase())
        );
        if (!matchesEdu) return false;
      }

      // 6. Occupation
      if (searchFilters.occupation.length > 0) {
        const matchesOcc = searchFilters.occupation.some((o) =>
          candidate.occupation.toLowerCase().includes(o.toLowerCase())
        );
        if (!matchesOcc) return false;
      }

      // 7. Diet
      if (searchFilters.diet.length > 0) {
        if (!searchFilters.diet.includes(candidate.lifestyle.diet)) {
          return false;
        }
      }

      // 8. Dosham
      if (searchFilters.dosham.length > 0) {
        if (!searchFilters.dosham.includes(candidate.horoscope.dosham)) {
          return false;
        }
      }

      // 9. Verified Only
      if (searchFilters.verifiedOnly && !candidate.verified.isIdVerified) {
        return false;
      }

      // 10. Star / Horoscope specific filter
      if (searchFilters.horoscopeStar && candidate.horoscope.nakshatra !== searchFilters.horoscopeStar) {
        return false;
      }

      // 11. Profile ID direct search
      if (searchIdQuery.trim()) {
        const query = searchIdQuery.toLowerCase().trim();
        const idMatches = candidate.id.toLowerCase().includes(query) || candidate.name.toLowerCase().includes(query);
        if (!idMatches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'matchScore') return b.compatibilityScore - a.compatibilityScore;
      if (sortBy === 'horoscope') return b.horoscopeScore - a.horoscopeScore;
      if (sortBy === 'ageAsc') return a.age - b.age;
      if (sortBy === 'income') return b.annualIncomeNumeric - a.annualIncomeNumeric;
      return 0;
    });
  }, [allCandidates, searchFilters, sortBy, searchIdQuery]);

  return (
    <div id="find-matches-page" className="min-h-screen py-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header with Search Tabs */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-900/10 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h1 className="font-heading text-2xl font-extrabold text-stone-900">
                  Find Auspicious Matches
                </h1>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Showing <strong className="text-stone-900">{filteredCandidates.length}</strong> 100% verified matrimonial profiles matching your criteria
              </p>
            </div>

            {/* View Mode & Sort Controls */}
            <div className="flex items-center space-x-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-3.5 py-2 rounded-xl bg-stone-100 border border-stone-300 text-xs font-bold text-stone-800 flex items-center space-x-1.5"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className="flex items-center space-x-1.5 bg-stone-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition ${
                    viewMode === 'grid' ? 'bg-white text-[#800020] shadow-xs' : 'text-stone-500'
                  }`}
                  aria-label="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition ${
                    viewMode === 'list' ? 'bg-white text-[#800020] shadow-xs' : 'text-stone-500'
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-stone-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-medium focus:ring-2 focus:ring-[#800020]"
                >
                  <option value="matchScore">Compatibility Match Score</option>
                  <option value="horoscope">Kundali Gunas (Highest)</option>
                  <option value="ageAsc">Age: Youngest First</option>
                  <option value="income">Annual Package</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Sub-Tabs */}
          <div className="flex flex-wrap gap-2 border-t border-stone-100 pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'all'
                  ? 'bg-[#800020] text-amber-100 shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Matches ({allCandidates.length})
            </button>

            <button
              onClick={() => {
                setActiveTab('horoscope');
                setSortBy('horoscope');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                activeTab === 'horoscope'
                  ? 'bg-[#800020] text-amber-100 shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Kundali 30+ Guna Matches</span>
            </button>

            <button
              onClick={() => setActiveTab('id')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                activeTab === 'id'
                  ? 'bg-[#800020] text-amber-100 shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search by Profile ID / Name</span>
            </button>
          </div>

          {/* ID Search Input Bar (Visible when ID Tab active) */}
          {activeTab === 'id' && (
            <div className="pt-2 flex items-center space-x-2 animate-in fade-in">
              <input
                type="text"
                placeholder="Type Matrimony ID (e.g. LSM-2024-7104) or Candidate Name..."
                value={searchIdQuery}
                onChange={(e) => setSearchIdQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-amber-900/30 focus:ring-2 focus:ring-[#800020]"
              />
              {searchIdQuery && (
                <button
                  onClick={() => setSearchIdQuery('')}
                  className="px-3 py-2 text-xs font-bold text-stone-500 hover:text-stone-900"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>

        {/* Main Grid: Sidebar Filters + Match Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-sm space-y-5 sticky top-28">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-heading font-bold text-stone-900 text-sm flex items-center space-x-1.5">
                  <Filter className="w-4 h-4 text-amber-700" />
                  <span>Refine Match Criteria</span>
                </h3>
                <button
                  onClick={resetSearchFilters}
                  className="text-[11px] font-bold text-[#800020] hover:underline flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Looking For Gender */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Looking For
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['female', 'male', 'all'] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setSearchFilters((prev) => ({ ...prev, gender: g }))}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition capitalize ${
                        searchFilters.gender === g
                          ? 'bg-[#800020] text-amber-100 border-[#800020]'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {g === 'female' ? 'Bride' : g === 'male' ? 'Groom' : 'All'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Range Slider / Inputs */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1">
                  <span>Age Range</span>
                  <span className="text-[#800020]">{searchFilters.ageMin} - {searchFilters.ageMax} Yrs</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min={21}
                    max={50}
                    value={searchFilters.ageMin}
                    onChange={(e) => setSearchFilters((prev) => ({ ...prev, ageMin: Number(e.target.value) }))}
                    className="px-2.5 py-1.5 text-xs rounded-lg border border-stone-300"
                  />
                  <input
                    type="number"
                    min={21}
                    max={50}
                    value={searchFilters.ageMax}
                    onChange={(e) => setSearchFilters((prev) => ({ ...prev, ageMax: Number(e.target.value) }))}
                    className="px-2.5 py-1.5 text-xs rounded-lg border border-stone-300"
                  />
                </div>
              </div>

              {/* Mother Tongue */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Mother Tongue
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['Telugu', 'Tamil', 'Kannada', 'Malayalam', 'Marathi', 'Hindi'].map((lang) => {
                    const isSelected = searchFilters.motherTongue.includes(lang);
                    return (
                      <button
                        key={lang}
                        onClick={() => {
                          setSearchFilters((prev) => ({
                            ...prev,
                            motherTongue: isSelected
                              ? prev.motherTongue.filter((l) => l !== lang)
                              : [...prev.motherTongue, lang]
                          }));
                        }}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition ${
                          isSelected
                            ? 'bg-[#800020] text-amber-100 border-[#800020]'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Caste / Community */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Community / Caste
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['Brahmin', 'Reddy', 'Kamma', 'Arya Vysya', 'Kshatriya', 'Maratha', 'Nair'].map((caste) => {
                    const isSelected = searchFilters.caste.includes(caste);
                    return (
                      <button
                        key={caste}
                        onClick={() => {
                          setSearchFilters((prev) => ({
                            ...prev,
                            caste: isSelected
                              ? prev.caste.filter((c) => c !== caste)
                              : [...prev.caste, caste]
                          }));
                        }}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition ${
                          isSelected
                            ? 'bg-[#800020] text-amber-100 border-[#800020]'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {caste}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Diet Preference */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Dietary Habits
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['Vegetarian', 'Eggetarian', 'Non-Vegetarian'].map((diet) => {
                    const isSelected = searchFilters.diet.includes(diet);
                    return (
                      <button
                        key={diet}
                        onClick={() => {
                          setSearchFilters((prev) => ({
                            ...prev,
                            diet: isSelected
                              ? prev.diet.filter((d) => d !== diet)
                              : [...prev.diet, diet]
                          }));
                        }}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition ${
                          isSelected
                            ? 'bg-[#800020] text-amber-100 border-[#800020]'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {diet}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Verified Only Toggle */}
              <div className="pt-2 border-t border-stone-100">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={searchFilters.verifiedOnly}
                    onChange={(e) => setSearchFilters((prev) => ({ ...prev, verifiedOnly: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#800020] focus:ring-[#800020] accent-[#800020]"
                  />
                  <span className="text-xs font-bold text-stone-800 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Show ID Verified Profiles Only</span>
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* Matches List / Grid Container */}
          <main className="lg:col-span-8 space-y-6">
            {filteredCandidates.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-amber-900/10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 mx-auto flex items-center justify-center text-[#800020]">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-lg font-bold text-stone-900">
                  No Profiles Match Your Exact Filter Criteria
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try broadening your age range or selecting "All Communities" to view more auspicious matches.
                </p>
                <button
                  onClick={resetSearchFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#800020] text-amber-100 text-xs font-bold hover:bg-[#6A001A] transition"
                >
                  Reset All Search Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* GRID VIEW */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredCandidates.map((candidate) => {
                  const shortlisted = isShortlisted(candidate.id);
                  const interestSent = hasSentInterest(candidate.id);

                  return (
                    <div
                      key={candidate.id}
                      id={`match-grid-card-${candidate.id}`}
                      className="bg-white rounded-3xl overflow-hidden border border-amber-900/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                    >
                      {/* Photo Header */}
                      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                        <img
                          src={candidate.photoUrl}
                          alt={candidate.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Verified ID */}
                        <div className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-sm">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verified Biodata</span>
                        </div>

                        {/* Kundali Score */}
                        <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm flex items-center space-x-0.5">
                          <Star className="w-3 h-3 fill-stone-950" />
                          <span>{candidate.horoscopeScore}/36 Gunas</span>
                        </div>

                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleShortlist(candidate.id);
                          }}
                          className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md transition shadow-md ${
                            shortlisted 
                              ? 'bg-rose-600 text-white' 
                              : 'bg-white/85 text-stone-700 hover:text-rose-600 hover:bg-white'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${shortlisted ? 'fill-white' : ''}`} />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="font-heading font-bold text-base text-stone-900 group-hover:text-[#800020] transition">
                              {candidate.name}
                            </h3>
                            <span className="text-xs font-bold text-stone-500">{candidate.age} Yrs</span>
                          </div>

                          <p className="text-xs font-bold text-[#800020] mt-0.5">
                            {candidate.caste} ({candidate.subcaste}) • {candidate.motherTongue}
                          </p>

                          <div className="mt-3 space-y-1.5 text-xs text-stone-600">
                            <div className="flex items-center space-x-1.5 truncate">
                              <GraduationCap className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                              <span className="truncate">{candidate.education}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 truncate">
                              <Briefcase className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                              <span className="truncate">{candidate.occupation} ({candidate.workingCompany})</span>
                            </div>
                            <div className="flex items-center space-x-1.5 truncate">
                              <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                              <span className="truncate">{candidate.location.city}, {candidate.location.state}</span>
                            </div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                            <span>Star: <strong>{candidate.horoscope.nakshatra}</strong></span>
                            <span>Gothram: <strong>{candidate.horoscope.gothram}</strong></span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 grid grid-cols-2 gap-2">
                          <button
                            id={`match-view-${candidate.id}`}
                            onClick={() => navigateTo('profile-view', candidate.id)}
                            className="py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition text-center"
                          >
                            Full Biodata
                          </button>

                          <button
                            id={`match-interest-${candidate.id}`}
                            onClick={() => sendInterest(candidate.id)}
                            disabled={interestSent}
                            className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 ${
                              interestSent
                                ? 'bg-emerald-100 text-emerald-800 cursor-default'
                                : 'bg-[#800020] hover:bg-[#6A001A] text-amber-100 shadow-xs'
                            }`}
                          >
                            {interestSent ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Sent</span>
                              </>
                            ) : (
                              <>
                                <Heart className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                                <span>Express Interest</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* DETAILED LIST VIEW */
              <div className="space-y-4">
                {filteredCandidates.map((candidate) => {
                  const shortlisted = isShortlisted(candidate.id);
                  const interestSent = hasSentInterest(candidate.id);

                  return (
                    <div
                      key={candidate.id}
                      id={`match-list-card-${candidate.id}`}
                      className="bg-white rounded-3xl overflow-hidden border border-amber-900/15 shadow-sm hover:shadow-lg transition-all p-5 flex flex-col sm:flex-row gap-5 items-center sm:items-start"
                    >
                      <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shrink-0 bg-stone-100">
                        <img
                          src={candidate.photoUrl}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-amber-500 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                          {candidate.horoscopeScore}/36 Gunas
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div>
                            <h3 className="font-heading font-bold text-lg text-stone-900 hover:text-[#800020] transition cursor-pointer"
                              onClick={() => navigateTo('profile-view', candidate.id)}
                            >
                              {candidate.name}
                            </h3>
                            <p className="text-xs font-bold text-[#800020]">
                              {candidate.id} • {candidate.caste} ({candidate.subcaste}) • {candidate.motherTongue}
                            </p>
                          </div>
                          <span className="text-xs font-bold text-stone-500">{candidate.age} Yrs, {candidate.height}</span>
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                          {candidate.aboutMe}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-stone-600 pt-1">
                          <div>
                            <span className="text-stone-400 block text-[10px]">Education:</span>
                            <span className="font-semibold truncate block">{candidate.education}</span>
                          </div>
                          <div>
                            <span className="text-stone-400 block text-[10px]">Occupation:</span>
                            <span className="font-semibold truncate block">{candidate.occupation}</span>
                          </div>
                          <div>
                            <span className="text-stone-400 block text-[10px]">Location:</span>
                            <span className="font-semibold truncate block">{candidate.location.city}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleShortlist(candidate.id)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition ${
                                shortlisted
                                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                              }`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${shortlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                              <span>{shortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                            </button>

                            <button
                              onClick={() => startChatWithCandidate(candidate.id)}
                              className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 text-xs font-bold hover:bg-stone-100 flex items-center space-x-1.5"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                              <span>Chat</span>
                            </button>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => navigateTo('profile-view', candidate.id)}
                              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition"
                            >
                              View Full Biodata
                            </button>

                            <button
                              onClick={() => sendInterest(candidate.id)}
                              disabled={interestSent}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                                interestSent
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-[#800020] text-amber-100 hover:bg-[#6A001A]'
                              }`}
                            >
                              {interestSent ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Interest Sent</span>
                                </>
                              ) : (
                                <>
                                  <Heart className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                                  <span>Express Interest</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
};
