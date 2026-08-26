import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Heart, 
  ShieldCheck, 
  Star, 
  Phone, 
  Mail, 
  MessageSquare, 
  Download, 
  Share2, 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Sparkles, 
  Lock, 
  Unlock,
  Check
} from 'lucide-react';

export const FullProfileView: React.FC = () => {
  const { 
    selectedProfileId, 
    allCandidates, 
    navigateTo, 
    toggleShortlist, 
    isShortlisted, 
    sendInterest, 
    hasSentInterest, 
    unlockContact, 
    isContactUnlocked,
    startChatWithCandidate,
    addToast,
    user
  } = useApp();

  // Find candidate or fallback to first
  const candidate = allCandidates.find((c) => c.id === selectedProfileId) || allCandidates[0];
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!candidate) {
    return (
      <div className="min-h-screen py-20 text-center bg-[#FDFBF7]">
        <h2 className="font-heading text-xl font-bold">Profile Not Found</h2>
        <button onClick={() => navigateTo('matches')} className="mt-4 px-4 py-2 bg-[#800020] text-white rounded-xl text-xs">
          Back to Matches
        </button>
      </div>
    );
  }

  const isUnlocked = isContactUnlocked(candidate.id);
  const shortlisted = isShortlisted(candidate.id);
  const interestSent = hasSentInterest(candidate.id);

  const handleUnlockClick = () => {
    unlockContact(candidate.id);
  };

  const handleDownloadPdf = () => {
    addToast('success', 'Auspicious Biodata Downloaded', `PDF Biodata for ${candidate.name} (${candidate.id}) downloaded.`);
  };

  const handleShareWhatsApp = () => {
    addToast('info', 'Family Share Link Copied', `Biodata link for ${candidate.name} is ready to share with elders.`);
  };

  return (
    <div id="full-profile-view" className="min-h-screen py-8 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Back Button & Title Header */}
        <div className="flex items-center justify-between">
          <button
            id="back-to-matches-btn"
            onClick={() => navigateTo('matches')}
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#800020] hover:bg-rose-50 px-3 py-1.5 rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Matches</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShareWhatsApp}
              className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 text-xs font-bold flex items-center space-x-1.5 shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Share with Family</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 text-xs font-bold flex items-center space-x-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Hero Card with Photo Gallery & Core Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-900/10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Photos */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-stone-100 border border-amber-300/80 shadow-md">
              <img
                src={candidate.galleryPhotos[selectedPhotoIndex] || candidate.photoUrl}
                alt={candidate.name}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% ID Verified</span>
              </div>

              <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-xs font-black px-2.5 py-0.5 rounded-full shadow-sm">
                {candidate.horoscopeScore}/36 Gunas
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {candidate.galleryPhotos.length > 1 && (
              <div className="flex space-x-2">
                {candidate.galleryPhotos.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPhotoIndex(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                      selectedPhotoIndex === i ? 'border-[#800020] ring-2 ring-rose-200' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Identity, Compatibility & Contact Unlock */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h1 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900">
                    {candidate.name}
                  </h1>
                  <p className="text-xs font-bold text-[#800020] mt-0.5">
                    Profile ID: <span className="underline">{candidate.id}</span> • Registered by {candidate.profileCreatedBy}
                  </p>
                </div>
                <div className="bg-rose-50 text-[#800020] border border-rose-200 px-3 py-1 rounded-xl text-xs font-bold">
                  {candidate.compatibilityScore}% Compatibility
                </div>
              </div>

              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-300/50 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-stone-500 font-medium block text-[10px]">Age & Height</span>
                  <span className="font-bold text-stone-900">{candidate.age} Yrs, {candidate.height}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block text-[10px]">Community / Sect</span>
                  <span className="font-bold text-stone-900">{candidate.caste} ({candidate.subcaste})</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block text-[10px]">Mother Tongue</span>
                  <span className="font-bold text-stone-900">{candidate.motherTongue}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block text-[10px]">Gothram</span>
                  <span className="font-bold text-stone-900">{candidate.horoscope.gothram}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block text-[10px]">Star / Nakshatra</span>
                  <span className="font-bold text-stone-900">{candidate.horoscope.nakshatra} ({candidate.horoscope.rasi})</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium block text-[10px]">Dosham</span>
                  <span className="font-bold text-emerald-700">{candidate.horoscope.dosham}</span>
                </div>
              </div>

              {/* Bio Summary */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">About Candidate</h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  {candidate.aboutMe}
                </p>
              </div>
            </div>

            {/* Contact Details Card (Locked vs Unlocked) */}
            <div className="p-4 rounded-2xl border bg-stone-50 border-stone-200">
              {isUnlocked ? (
                <div className="space-y-2 animate-in fade-in">
                  <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
                    <Unlock className="w-4 h-4 text-emerald-600" />
                    <span>Verified Contact Details (Unlocked)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                    <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                      <span className="text-stone-400 block text-[10px]">Phone Number:</span>
                      <span className="font-bold text-stone-900">{candidate.contactNumber}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                      <span className="text-stone-400 block text-[10px]">Email Address:</span>
                      <span className="font-bold text-stone-900 truncate block">{candidate.email}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                      <span className="text-stone-400 block text-[10px]">WhatsApp:</span>
                      <span className="font-bold text-stone-900">{candidate.whatsappNumber}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center space-x-3 text-center sm:text-left">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900">
                        Candidate Phone, Email & WhatsApp Locked
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Click to view verified contact details of the family.
                      </p>
                    </div>
                  </div>
                  
                  <button
                    id="unlock-contact-btn"
                    onClick={handleUnlockClick}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-extrabold text-xs shadow-md hover:brightness-105 transition flex items-center justify-center space-x-1.5 shrink-0"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Unlock Contact Info</span>
                  </button>
                </div>
              )}
            </div>

            {/* Core Action Bar */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <button
                id="profile-shortlist-btn"
                onClick={() => toggleShortlist(candidate.id)}
                className={`py-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition ${
                  shortlisted
                    ? 'bg-rose-50 border-rose-300 text-rose-700'
                    : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${shortlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                <span>{shortlisted ? 'Shortlisted' : 'Shortlist'}</span>
              </button>

              <button
                id="profile-chat-btn"
                onClick={() => startChatWithCandidate(candidate.id)}
                className="py-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold flex items-center justify-center space-x-1.5 transition"
              >
                <MessageSquare className="w-4 h-4 text-amber-700" />
                <span>Message</span>
              </button>

              <button
                id="profile-express-interest-btn"
                onClick={() => sendInterest(candidate.id)}
                disabled={interestSent}
                className={`py-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  interestSent
                    ? 'bg-emerald-100 text-emerald-800 cursor-default'
                    : 'bg-[#800020] hover:bg-[#6A001A] text-amber-100 shadow-md'
                }`}
              >
                {interestSent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Interest Sent</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span>Express Interest</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

        {/* Detailed Information Tabs / Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Section 1: Education & Career */}
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-base text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-amber-700" />
              <span>Education & Career Details</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">Highest Degree:</span>
                <span className="font-bold text-stone-800">{candidate.education}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">Field of Study:</span>
                <span className="font-bold text-stone-800">{candidate.educationField}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">College / Institute:</span>
                <span className="font-bold text-stone-800">{candidate.college}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">Occupation / Role:</span>
                <span className="font-bold text-stone-800">{candidate.occupation}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">Organization / Employer:</span>
                <span className="font-bold text-stone-800">{candidate.workingCompany}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Annual Income Range:</span>
                <span className="font-bold text-[#800020]">{candidate.annualIncome}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Family Background */}
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-base text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
              <Users className="w-5 h-5 text-amber-700" />
              <span>Family Background & Culture</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">Family Values:</span>
                <span className="font-bold text-stone-800">{candidate.family.values}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">Family Type & Status:</span>
                <span className="font-bold text-stone-800">{candidate.family.type} Family ({candidate.family.status})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">Father's Profession:</span>
                <span className="font-bold text-stone-800">{candidate.family.fatherOccupation}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">Mother's Profession:</span>
                <span className="font-bold text-stone-800">{candidate.family.motherOccupation}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">Siblings:</span>
                <span className="font-bold text-stone-800">
                  {candidate.family.brothersCount} Brother ({candidate.family.brothersMarried} Married), {candidate.family.sistersCount} Sister
                </span>
              </div>
              <div className="py-1">
                <span className="text-stone-500 block mb-1">About Family:</span>
                <p className="text-stone-700 leading-relaxed font-normal">{candidate.family.aboutFamily}</p>
              </div>
            </div>
          </div>

          {/* Section 3: Vedic Kundali & Horoscope */}
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-base text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
              <Star className="w-5 h-5 text-amber-700" />
              <span>Vedic Horoscope & Kundali</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">Moon Sign (Rasi):</span>
                <span className="font-bold text-stone-800">{candidate.horoscope.rasi}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">Birth Star (Nakshatra):</span>
                <span className="font-bold text-stone-800">{candidate.horoscope.nakshatra} (Padam {candidate.horoscope.padam || 1})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">Gothram:</span>
                <span className="font-bold text-stone-800">{candidate.horoscope.gothram}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-50">
                <span className="text-stone-500">Dosham / Kuja Dosha:</span>
                <span className="font-bold text-emerald-700">{candidate.horoscope.dosham}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">Ashtakoota Score:</span>
                <span className="font-extrabold text-[#800020]">{candidate.horoscopeScore} out of 36 Gunas</span>
              </div>
            </div>
          </div>

          {/* Section 4: Partner Expectations & Match Checklist */}
          <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-base text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-700" />
              <span>Partner Expectations Checklist</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50">
                <div>
                  <span className="text-stone-500 block text-[10px]">Preferred Age Range:</span>
                  <span className="font-bold text-stone-800">{candidate.partnerPreferences.ageRange[0]} - {candidate.partnerPreferences.ageRange[1]} Years</span>
                </div>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold flex items-center text-[10px]">
                  <Check className="w-3 h-3 mr-0.5" /> Matches You
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50">
                <div>
                  <span className="text-stone-500 block text-[10px]">Community Preference:</span>
                  <span className="font-bold text-stone-800">{candidate.partnerPreferences.caste.join(', ')}</span>
                </div>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold flex items-center text-[10px]">
                  <Check className="w-3 h-3 mr-0.5" /> Matches You
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50">
                <div>
                  <span className="text-stone-500 block text-[10px]">Education & Profession:</span>
                  <span className="font-bold text-stone-800">{candidate.partnerPreferences.education.join(', ')}</span>
                </div>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold flex items-center text-[10px]">
                  <Check className="w-3 h-3 mr-0.5" /> Matches You
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
