import React from 'react';
import { useApp } from '../../context/AppContext';
import { CandidateProfile } from '../../types';
import { Heart, Sparkles, ShieldCheck, MapPin, Briefcase, GraduationCap, CheckCircle2, ChevronRight } from 'lucide-react';

export const FeaturedProfiles: React.FC = () => {
  const { 
    allCandidates, 
    navigateTo, 
    toggleShortlist, 
    isShortlisted, 
    sendInterest, 
    hasSentInterest,
    user
  } = useApp();

  // Filter candidates relevant to user's gender preference or show top 4 featured
  const featured = allCandidates
    .filter((c) => (user ? c.gender !== user.gender : true))
    .slice(0, 4);

  return (
    <section id="featured-profiles-section" className="py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#800020] bg-rose-50 px-3 py-1 rounded-full border border-rose-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Curated Auspicious Alliances</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
            Featured Verified Profiles
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Explore newly registered and 100% verified matrimonial biodatas with horoscope compatibility reports.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((profile) => {
            const shortlisted = isShortlisted(profile.id);
            const interestSent = hasSentInterest(profile.id);

            return (
              <div 
                key={profile.id}
                id={`featured-card-${profile.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-amber-900/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Photo & Overlay */}
                <div className="relative aspect-4/5 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={profile.photoUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Verified Seal Badge */}
                  <div className="absolute top-3 left-3 bg-emerald-700/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-sm">
                    <ShieldCheck className="w-3 h-3" />
                    <span>ID Verified</span>
                  </div>

                  {/* Kundali Gunas Badge */}
                  <div className="absolute top-3 right-3 bg-amber-500/95 backdrop-blur-xs text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                    {profile.horoscopeScore}/36 Gunas
                  </div>

                  {/* Bookmark / Shortlist icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleShortlist(profile.id);
                    }}
                    className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md transition shadow-md ${
                      shortlisted 
                        ? 'bg-rose-600 text-white' 
                        : 'bg-white/80 text-stone-700 hover:text-rose-600 hover:bg-white'
                    }`}
                    aria-label="Shortlist profile"
                  >
                    <Heart className={`w-4 h-4 ${shortlisted ? 'fill-white' : ''}`} />
                  </button>
                </div>

                {/* Profile Information */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-bold text-base text-stone-900 group-hover:text-[#800020] transition">
                        {profile.name}
                      </h3>
                      <span className="text-xs font-semibold text-stone-500">{profile.age} Yrs</span>
                    </div>

                    <p className="text-[11px] font-semibold text-[#800020] mt-0.5">
                      {profile.caste} ({profile.subcaste}) • {profile.motherTongue}
                    </p>

                    <div className="mt-2.5 space-y-1.5 text-xs text-stone-600">
                      <div className="flex items-center space-x-1.5 truncate">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate">{profile.education}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 truncate">
                        <Briefcase className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate">{profile.occupation}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate">{profile.location.city}, {profile.location.state}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-stone-100 flex items-center space-x-2">
                    <button
                      id={`view-biodata-${profile.id}`}
                      onClick={() => navigateTo('profile-view', profile.id)}
                      className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition text-center"
                    >
                      View Biodata
                    </button>
                    
                    <button
                      id={`express-interest-${profile.id}`}
                      onClick={() => sendInterest(profile.id)}
                      disabled={interestSent}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 ${
                        interestSent
                          ? 'bg-emerald-100 text-emerald-800 cursor-default'
                          : 'bg-[#800020] hover:bg-[#6A001A] text-amber-100 shadow-xs'
                      }`}
                    >
                      {interestSent ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Sent</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-3 h-3 fill-amber-300 text-amber-300" />
                          <span>Interest</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Matches Button */}
        <div className="mt-10 text-center">
          <button
            id="view-all-matches-cta"
            onClick={() => navigateTo('matches')}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white border-2 border-[#800020] text-[#800020] font-bold text-xs hover:bg-[#800020] hover:text-amber-100 transition shadow-sm"
          >
            <span>View All 1,420+ Verified Community Profiles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
