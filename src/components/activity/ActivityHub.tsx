import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  Send, 
  Inbox, 
  Eye, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Clock
} from 'lucide-react';

export const ActivityHub: React.FC = () => {
  const { 
    activity, 
    allCandidates, 
    navigateTo, 
    toggleShortlist, 
    respondToInterest, 
    startChatWithCandidate,
    sendInterest,
    hasSentInterest
  } = useApp();

  const [activeTab, setActiveTab] = useState<'shortlist' | 'received' | 'sent' | 'visitors' | 'contacts'>('shortlist');

  // Shortlisted Candidates
  const shortlistedCandidates = allCandidates.filter((c) => activity.shortlistedIds.includes(c.id));

  // Interests Received
  const receivedInterests = activity.interestsReceived.map((item) => {
    const candidate = allCandidates.find((c) => c.id === item.profileId);
    return { ...item, candidate };
  }).filter((item) => item.candidate);

  // Interests Sent
  const sentInterests = activity.interestsSent.map((item) => {
    const candidate = allCandidates.find((c) => c.id === item.profileId);
    return { ...item, candidate };
  }).filter((item) => item.candidate);

  // Unlocked Contacts
  const unlockedCandidates = activity.contactUnlocks.map((item) => {
    const candidate = allCandidates.find((c) => c.id === item.profileId);
    return { ...item, candidate };
  }).filter((item) => item.candidate);

  return (
    <div id="activity-hub-page" className="min-h-screen py-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Title */}
        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <h1 className="font-heading text-2xl font-bold text-stone-900">
                Activity Hub & Connections
              </h1>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage your shortlisted candidates, express interests, incoming marriage proposals, and contact unlocks.
            </p>
          </div>

          <button
            onClick={() => navigateTo('matches')}
            className="px-4 py-2 bg-[#800020] text-amber-100 rounded-xl text-xs font-bold hover:bg-[#6A001A] transition flex items-center space-x-1.5"
          >
            <span>Explore More Matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            id="tab-shortlist"
            onClick={() => setActiveTab('shortlist')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center space-x-2 ${
              activeTab === 'shortlist'
                ? 'bg-[#800020] text-amber-100 shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Shortlisted Profiles ({shortlistedCandidates.length})</span>
          </button>

          <button
            id="tab-received"
            onClick={() => setActiveTab('received')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center space-x-2 relative ${
              activeTab === 'received'
                ? 'bg-[#800020] text-amber-100 shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Inbox className="w-4 h-4 text-amber-600" />
            <span>Interests Received ({receivedInterests.length})</span>
          </button>

          <button
            id="tab-sent"
            onClick={() => setActiveTab('sent')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center space-x-2 ${
              activeTab === 'sent'
                ? 'bg-[#800020] text-amber-100 shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Send className="w-4 h-4 text-emerald-600" />
            <span>Interests Sent ({sentInterests.length})</span>
          </button>

          <button
            id="tab-contacts"
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center space-x-2 ${
              activeTab === 'contacts'
                ? 'bg-[#800020] text-amber-100 shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Phone className="w-4 h-4 text-amber-700" />
            <span>Unlocked Phone Numbers ({unlockedCandidates.length})</span>
          </button>
        </div>

        {/* TAB 1: Shortlisted Profiles */}
        {activeTab === 'shortlist' && (
          <div className="space-y-4 animate-in fade-in">
            {shortlistedCandidates.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-amber-900/10 space-y-3">
                <Heart className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-heading text-base font-bold text-stone-800">No Shortlisted Profiles Yet</h3>
                <p className="text-xs text-stone-500">Bookmark candidate profiles while browsing matches to review them together with your family.</p>
                <button
                  onClick={() => navigateTo('matches')}
                  className="px-4 py-2 bg-[#800020] text-amber-100 rounded-xl text-xs font-bold"
                >
                  Browse Matches
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shortlistedCandidates.map((c) => {
                  const interestSent = hasSentInterest(c.id);
                  return (
                    <div
                      key={c.id}
                      className="bg-white rounded-3xl p-5 border border-amber-900/15 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4 items-center sm:items-start"
                    >
                      <img
                        src={c.photoUrl}
                        alt={c.name}
                        className="w-28 h-28 rounded-2xl object-cover border border-amber-300 shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
                        <div>
                          <h3 
                            onClick={() => navigateTo('profile-view', c.id)}
                            className="font-heading font-bold text-base text-stone-900 hover:text-[#800020] cursor-pointer"
                          >
                            {c.name}
                          </h3>
                          <p className="text-xs text-[#800020] font-semibold">
                            {c.age} Yrs • {c.caste} ({c.subcaste}) • {c.location.city}
                          </p>
                          <p className="text-xs text-stone-600 truncate">{c.education} • {c.occupation}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
                          <button
                            onClick={() => navigateTo('profile-view', c.id)}
                            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold"
                          >
                            Biodata
                          </button>
                          
                          <button
                            onClick={() => sendInterest(c.id)}
                            disabled={interestSent}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                              interestSent ? 'bg-emerald-100 text-emerald-800' : 'bg-[#800020] text-amber-100'
                            }`}
                          >
                            {interestSent ? 'Interest Sent' : 'Express Interest'}
                          </button>

                          <button
                            onClick={() => toggleShortlist(c.id)}
                            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Interests Received */}
        {activeTab === 'received' && (
          <div className="space-y-4 animate-in fade-in">
            {receivedInterests.map((item) => {
              const c = item.candidate!;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 border border-amber-900/15 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={c.photoUrl}
                      alt={c.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-amber-400 shrink-0"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 
                          onClick={() => navigateTo('profile-view', c.id)}
                          className="font-heading font-bold text-base text-stone-900 hover:text-[#800020] cursor-pointer"
                        >
                          {c.name}
                        </h3>
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {c.horoscopeScore}/36 Gunas
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#800020]">
                        {c.age} Yrs, {c.height} • {c.caste} ({c.subcaste}) • {c.motherTongue}
                      </p>
                      <p className="text-xs text-stone-600">{c.education} • {c.occupation} ({c.workingCompany})</p>
                      <p className="text-[11px] text-stone-400 mt-1">Interest Received on {item.date}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3 shrink-0">
                    {item.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => respondToInterest(c.id, 'accepted')}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition flex items-center space-x-1.5 shadow-xs"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Accept & Chat</span>
                        </button>
                        <button
                          onClick={() => respondToInterest(c.id, 'declined')}
                          className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 transition flex items-center space-x-1"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Decline</span>
                        </button>
                      </>
                    ) : item.status === 'accepted' ? (
                      <div className="flex items-center space-x-3">
                        <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-xl">
                          Accepted
                        </span>
                        <button
                          onClick={() => startChatWithCandidate(c.id)}
                          className="px-4 py-2 rounded-xl bg-[#800020] text-amber-100 text-xs font-bold"
                        >
                          Message Family
                        </button>
                      </div>
                    ) : (
                      <span className="text-stone-500 text-xs font-semibold bg-stone-100 px-3 py-1.5 rounded-xl">
                        Declined
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: Interests Sent */}
        {activeTab === 'sent' && (
          <div className="space-y-4 animate-in fade-in">
            {sentInterests.map((item) => {
              const c = item.candidate!;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 border border-amber-900/15 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={c.photoUrl}
                      alt={c.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-amber-400 shrink-0"
                    />
                    <div>
                      <h3 
                        onClick={() => navigateTo('profile-view', c.id)}
                        className="font-heading font-bold text-base text-stone-900 hover:text-[#800020] cursor-pointer"
                      >
                        {c.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#800020]">
                        {c.caste} ({c.subcaste}) • {c.location.city}
                      </p>
                      <p className="text-xs text-stone-600">{c.education} • {c.occupation}</p>
                      <p className="text-[11px] text-stone-400 mt-1">Sent on {item.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {item.status === 'accepted' ? (
                      <div className="flex items-center space-x-2">
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Interest Accepted</span>
                        </span>
                        <button
                          onClick={() => startChatWithCandidate(c.id)}
                          className="px-4 py-2 rounded-xl bg-[#800020] text-amber-100 text-xs font-bold"
                        >
                          Chat Now
                        </button>
                      </div>
                    ) : (
                      <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-amber-700" />
                        <span>Awaiting Response from Family</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: Unlocked Contacts */}
        {activeTab === 'contacts' && (
          <div className="space-y-4 animate-in fade-in">
            {unlockedCandidates.map((item) => {
              const c = item.candidate!;
              return (
                <div
                  key={item.profileId}
                  className="bg-white rounded-3xl p-6 border border-emerald-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={c.photoUrl}
                      alt={c.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-emerald-400 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-heading font-bold text-base text-stone-900">{c.name}</h3>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Contact Unlocked
                        </span>
                      </div>
                      <p className="text-xs text-stone-600">{c.caste} • {c.location.city}, {c.location.state}</p>
                      
                      <div className="flex flex-wrap gap-3 pt-1 text-xs font-bold text-stone-900">
                        <span>📞 Phone: <span className="text-[#800020]">{c.contactNumber}</span></span>
                        <span>💬 WhatsApp: <span className="text-[#800020]">{c.whatsappNumber}</span></span>
                        <span>✉️ Email: <span className="text-[#800020]">{c.email}</span></span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateTo('profile-view', c.id)}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-800 shrink-0"
                  >
                    View Biodata
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
