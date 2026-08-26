import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  Eye, 
  Send, 
  Inbox, 
  Crown, 
  Search, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Compass, 
  Phone, 
  ArrowRight,
  CheckCircle2,
  Calendar,
  Star
} from 'lucide-react';

export const MemberDashboard: React.FC = () => {
  const { 
    user, 
    navigateTo, 
    allCandidates, 
    activity, 
    activeMembership, 
    toggleShortlist, 
    isShortlisted,
    sendInterest,
    hasSentInterest
  } = useApp();

  // Recommendations filtered for opposite gender
  const recommendations = allCandidates.filter((c) => c.gender !== user.gender);

  const pendingReceivedCount = activity.interestsReceived.filter((i) => i.status === 'pending').length;
  const acceptedSentCount = activity.interestsSent.filter((i) => i.status === 'accepted').length;

  return (
    <div id="member-dashboard" className="min-h-screen py-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome & Profile Summary Hero Banner */}
        <div className="bg-gradient-to-r from-[#800020] via-[#9B111E] to-[#800020] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border-2 border-amber-400/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            
            {/* User Avatar & Basic Info */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
              <div className="relative">
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-amber-300 shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-100">
                    Namaste, {user.name}
                  </h1>
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {user.id}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
                  {user.age} Yrs, {user.height} • {user.caste} ({user.subcaste}) • {user.motherTongue}
                </p>
                <p className="text-xs text-stone-300">
                  {user.education} • {user.occupation} at <span className="text-amber-200 font-semibold">{user.workingCompany}</span>
                </p>

                {/* Completion Bar */}
                <div className="pt-2 max-w-md">
                  <div className="flex items-center justify-between text-[11px] text-amber-200 mb-1">
                    <span>Profile Strength & Astrological Verification</span>
                    <span className="font-bold text-emerald-300">{user.profileCompletionPercentage}% (Excellent)</span>
                  </div>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full"
                      style={{ width: `${user.profileCompletionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Status & CTA */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-amber-300/30 flex flex-col justify-between space-y-4 text-center sm:text-left">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-300 flex items-center">
                    <Crown className="w-3.5 h-3.5 mr-1" />
                    Membership Tier
                  </span>
                  <span className="text-xs font-black bg-amber-400 text-stone-950 px-2 py-0.5 rounded-full uppercase">
                    {activeMembership.planId}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xs text-stone-200">Verified Contact Credits:</span>
                  <span className="text-base font-extrabold text-amber-200">
                    {activeMembership.contactsRemaining} Unlocks Left
                  </span>
                </div>
              </div>

              <button
                id="dashboard-upgrade-plan-btn"
                onClick={() => navigateTo('membership')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs shadow-md hover:brightness-105 transition flex items-center justify-center space-x-1.5"
              >
                <span>Upgrade Plan & Boost Visibility</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
              </button>
            </div>

          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div 
            onClick={() => navigateTo('matches')}
            className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs hover:border-amber-500 hover:shadow-md cursor-pointer transition"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#800020] mb-2">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-xl font-extrabold text-stone-900 font-heading">{recommendations.length * 12}+</div>
            <div className="text-xs text-stone-500 font-medium">Matches Found</div>
          </div>

          <div 
            onClick={() => navigateTo('activity')}
            className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs hover:border-amber-500 hover:shadow-md cursor-pointer transition relative"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 mb-2">
              <Inbox className="w-5 h-5" />
            </div>
            <div className="text-xl font-extrabold text-stone-900 font-heading">{activity.interestsReceived.length}</div>
            <div className="text-xs text-stone-500 font-medium">Interests Received</div>
            {pendingReceivedCount > 0 && (
              <span className="absolute top-3 right-3 bg-[#800020] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {pendingReceivedCount} New
              </span>
            )}
          </div>

          <div 
            onClick={() => navigateTo('activity')}
            className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs hover:border-amber-500 hover:shadow-md cursor-pointer transition"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 mb-2">
              <Send className="w-5 h-5" />
            </div>
            <div className="text-xl font-extrabold text-stone-900 font-heading">{activity.interestsSent.length}</div>
            <div className="text-xs text-stone-500 font-medium">Interests Sent</div>
          </div>

          <div 
            onClick={() => navigateTo('activity')}
            className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs hover:border-amber-500 hover:shadow-md cursor-pointer transition"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 mb-2">
              <Heart className="w-5 h-5 fill-rose-600" />
            </div>
            <div className="text-xl font-extrabold text-stone-900 font-heading">{activity.shortlistedIds.length}</div>
            <div className="text-xs text-stone-500 font-medium">Shortlisted</div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700 mb-2">
              <Eye className="w-5 h-5" />
            </div>
            <div className="text-xl font-extrabold text-stone-900 font-heading">{activity.viewedProfileIds.length * 9}</div>
            <div className="text-xs text-stone-500 font-medium">Profile Views</div>
          </div>

          <div 
            onClick={() => navigateTo('membership')}
            className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs hover:border-amber-500 hover:shadow-md cursor-pointer transition"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900 mb-2">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xl font-extrabold text-amber-900 font-heading">{activeMembership.contactsRemaining}</div>
            <div className="text-xs text-stone-500 font-medium">Contact Credits</div>
          </div>
        </div>

        {/* Daily Recommendations / Matches For You Carousel / Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-stone-900">
                  Daily Matches Tailored For You
                </h2>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Profiles matching your caste, education, age criteria & Vedic horoscope
              </p>
            </div>
            <button
              id="view-all-recommendations-btn"
              onClick={() => navigateTo('matches')}
              className="text-xs font-bold text-[#800020] hover:underline flex items-center space-x-1"
            >
              <span>View All Matches ({recommendations.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 3).map((candidate) => {
              const shortlisted = isShortlisted(candidate.id);
              const interestSent = hasSentInterest(candidate.id);

              return (
                <div
                  key={candidate.id}
                  id={`rec-card-${candidate.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-16/10 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={candidate.photoUrl}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute top-3 left-3 bg-[#800020]/90 backdrop-blur-xs text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                      <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                      <span>{candidate.compatibilityScore}% Match</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      {candidate.horoscopeScore}/36 Gunas
                    </div>

                    <button
                      onClick={() => toggleShortlist(candidate.id)}
                      className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md ${
                        shortlisted ? 'bg-rose-600 text-white' : 'bg-white/80 text-stone-700 hover:text-rose-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${shortlisted ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading font-bold text-base text-stone-900">
                          {candidate.name}
                        </h3>
                        <span className="text-xs text-stone-500 font-semibold">{candidate.age} Yrs</span>
                      </div>
                      <p className="text-[11px] font-bold text-[#800020] mt-0.5">
                        {candidate.caste} ({candidate.subcaste}) • {candidate.motherTongue}
                      </p>
                      <p className="text-xs text-stone-600 mt-1.5">
                        {candidate.education} • {candidate.occupation}
                      </p>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {candidate.location.city}, {candidate.location.state} • Star: {candidate.horoscope.nakshatra}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center space-x-2">
                      <button
                        onClick={() => navigateTo('profile-view', candidate.id)}
                        className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition text-center"
                      >
                        View Biodata
                      </button>
                      <button
                        onClick={() => sendInterest(candidate.id)}
                        disabled={interestSent}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 ${
                          interestSent
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-[#800020] text-amber-100 hover:bg-[#6A001A]'
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
                            <span>Send Interest</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner: Astrologer / Matchmaker Consultation */}
        <div className="bg-amber-100/70 border border-amber-300/80 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-amber-950">
          <div className="flex items-center space-x-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#800020] text-amber-300 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-stone-900">
                Need Astrological Guidance or Senior Matchmaker Assistance?
              </h4>
              <p className="text-xs text-stone-700">
                Our Vedic pandits and relationship managers provide 1-on-1 family horoscope consultations.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigateTo('messages')}
              className="px-4 py-2.5 rounded-xl bg-white border border-amber-400 text-amber-950 text-xs font-bold hover:bg-amber-50 transition"
            >
              Consult Matchmaker
            </button>
            <button
              onClick={() => navigateTo('membership')}
              className="px-5 py-2.5 rounded-xl bg-[#800020] text-amber-100 text-xs font-bold hover:bg-[#6A001A] transition shadow-xs"
            >
              Upgrade VIP
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
