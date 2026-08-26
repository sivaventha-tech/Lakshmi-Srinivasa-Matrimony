import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile, Gender, MaritalStatus, DietType, FamilyType, FamilyValues, FamilyStatus } from '../../types';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldCheck, 
  Camera, 
  Upload, 
  User, 
  BookOpen, 
  Compass, 
  Briefcase, 
  Users, 
  Heart, 
  Settings, 
  Star,
  Check
} from 'lucide-react';

const SAMPLE_PHOTO_PRESETS = [
  {
    gender: 'male',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    label: 'Preset 1 (Adithya)'
  },
  {
    gender: 'male',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    label: 'Preset 2 (Vikram)'
  },
  {
    gender: 'female',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    label: 'Preset 3 (Dr. Priya)'
  },
  {
    gender: 'female',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    label: 'Preset 4 (Ananya)'
  }
];

export const MultiStepRegistration: React.FC = () => {
  const { registerNewUser, navigateTo } = useApp();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Basic
    profileCreatedBy: 'Self' as 'Self' | 'Parents' | 'Sibling' | 'Relative' | 'Friend',
    gender: 'male' as Gender,
    name: 'Srikar Vangala',
    email: 'srikar.v@example.com',
    contactNumber: '+91 98491 55667',
    password: 'Password123!',

    // Step 2: Personal & Astrology
    dateOfBirth: '1996-08-15',
    age: 28,
    maritalStatus: 'Never Married' as MaritalStatus,
    height: "5' 10\" (178 cm)",
    heightInches: 70,
    motherTongue: 'Telugu',
    religion: 'Hindu',
    caste: 'Brahmin',
    subcaste: 'Vaiki / Niyogi',
    gothram: 'Bharadwaja',
    rasi: 'Kanya (Virgo)',
    nakshatra: 'Hasta',
    dosham: 'None' as const,
    horoscopeMatchGunas: 32,

    // Step 3: Location
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    nativePlace: 'Guntur, Andhra Pradesh',
    citizenship: 'Indian',

    // Step 4: Education & Career
    education: 'M.Tech / M.S.',
    educationField: 'Computer Science',
    college: 'IIT Hyderabad',
    employedIn: 'Private Sector' as const,
    occupation: 'Lead Cloud Architect',
    workingCompany: 'Oracle India',
    annualIncome: '₹ 35 - 45 Lakhs / yr',
    annualIncomeNumeric: 38,

    // Step 5: Family
    familyType: 'Nuclear' as FamilyType,
    familyValues: 'Moderate' as FamilyValues,
    familyStatus: 'Upper Middle Class' as FamilyStatus,
    fatherOccupation: 'Senior Executive, AP Govt. Service',
    motherOccupation: 'Homemaker',
    brothersCount: 1,
    brothersMarried: 0,
    sistersCount: 0,
    sistersMarried: 0,
    aboutFamily: 'We are a close-knit, traditional Telugu family with high educational background and deep cultural values.',

    // Step 6: Lifestyle
    diet: 'Vegetarian' as DietType,
    smoking: 'No' as const,
    drinking: 'No' as const,
    hobbies: ['Carnatic Music', 'Badminton', 'Trekking', 'Reading'],

    // Step 7: Photo
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    photoPrivacy: 'Public' as 'Public' | 'OnRequest' | 'Protected',

    // Step 8: Partner Preferences
    partnerMinAge: 23,
    partnerMaxAge: 27,
    partnerMinHeight: "5' 2\"",
    partnerMaxHeight: "5' 8\"",
    partnerCaste: 'Brahmin / Any Open Minded',
    partnerEducation: 'B.Tech / MS / MBA / MD',
    partnerOccupation: 'Software / Medical / Corporate',
    partnerMinIncome: '₹ 15 Lakhs / yr',
    partnerDiet: 'Vegetarian / Eggetarian',

    // Step 9: Bio
    aboutMe: 'Warm-hearted, ambitious professional living in Hyderabad. I respect traditional values while enjoying a modern lifestyle. Looking for an educated, understanding partner for a joyous lifelong companionship.'
  });

  const updateForm = (fields: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const stepsList = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Personal & Astrology' },
    { num: 3, label: 'Location' },
    { num: 4, label: 'Career & Education' },
    { num: 5, label: 'Family' },
    { num: 6, label: 'Lifestyle' },
    { num: 7, label: 'Photo Upload' },
    { num: 8, label: 'Partner Preferences' },
    { num: 9, label: 'Review & Verify' }
  ];

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalProfile: Partial<UserProfile> = {
      name: formData.name,
      gender: formData.gender,
      age: formData.age,
      dateOfBirth: formData.dateOfBirth,
      height: formData.height,
      heightInches: formData.heightInches,
      motherTongue: formData.motherTongue,
      religion: formData.religion,
      caste: formData.caste,
      subcaste: formData.subcaste,
      maritalStatus: formData.maritalStatus,
      photoUrl: formData.photoUrl,
      galleryPhotos: [formData.photoUrl],
      photoPrivacy: formData.photoPrivacy,
      education: formData.education,
      educationField: formData.educationField,
      college: formData.college,
      occupation: formData.occupation,
      employedIn: formData.employedIn,
      workingCompany: formData.workingCompany,
      annualIncome: formData.annualIncome,
      annualIncomeNumeric: formData.annualIncomeNumeric,
      location: {
        city: formData.city,
        state: formData.state,
        country: formData.country,
        nativePlace: formData.nativePlace,
        citizenship: formData.citizenship
      },
      horoscope: {
        rasi: formData.rasi,
        nakshatra: formData.nakshatra,
        gothram: formData.gothram,
        dosham: formData.dosham,
        horoscopeMatchGunas: formData.horoscopeMatchGunas
      },
      family: {
        type: formData.familyType,
        values: formData.familyValues,
        status: formData.familyStatus,
        fatherOccupation: formData.fatherOccupation,
        motherOccupation: formData.motherOccupation,
        brothersCount: formData.brothersCount,
        brothersMarried: formData.brothersMarried,
        sistersCount: formData.sistersCount,
        sistersMarried: formData.sistersMarried,
        aboutFamily: formData.aboutFamily
      },
      lifestyle: {
        diet: formData.diet,
        smoking: formData.smoking,
        drinking: formData.drinking,
        hobbies: formData.hobbies
      },
      partnerPreferences: {
        ageRange: [formData.partnerMinAge, formData.partnerMaxAge],
        heightRange: [formData.partnerMinHeight, formData.partnerMaxHeight],
        maritalStatus: ['Never Married'],
        motherTongue: [formData.motherTongue],
        religion: ['Hindu'],
        caste: [formData.partnerCaste],
        education: [formData.partnerEducation],
        occupation: [formData.partnerOccupation],
        minAnnualIncome: formData.partnerMinIncome,
        preferredStates: [formData.state],
        diet: [formData.diet],
        manglikPreference: 'Doesn\'t Matter'
      },
      aboutMe: formData.aboutMe,
      profileCreatedBy: formData.profileCreatedBy,
      contactNumber: formData.contactNumber,
      email: formData.email,
      whatsappNumber: formData.contactNumber
    };

    registerNewUser(finalProfile);
  };

  return (
    <div id="registration-wizard" className="min-h-screen py-10 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#800020] text-amber-300 font-serif font-bold text-2xl flex items-center justify-center border-2 border-amber-400 shadow-md mb-2">
            ॐ
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
            Register Sacred Matrimonial Biodata
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Fill your family & astrological details to discover 100% verified compatible matches.
          </p>
        </div>

        {/* Progress Stepper Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-900/10 mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[650px] relative">
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-stone-200 -translate-y-1/2 z-0"></div>
            <div 
              className="absolute top-1/2 left-4 h-0.5 bg-[#800020] -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 95}%` }}
            ></div>

            {stepsList.map((s) => (
              <div 
                key={s.num} 
                className="flex flex-col items-center relative z-10 cursor-pointer"
                onClick={() => setCurrentStep(s.num)}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                    currentStep === s.num
                      ? 'bg-[#800020] text-amber-100 ring-4 ring-rose-100 scale-110'
                      : currentStep > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 text-stone-500 border border-stone-300'
                  }`}
                >
                  {currentStep > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-[10px] mt-1 font-semibold whitespace-nowrap ${
                  currentStep === s.num ? 'text-[#800020]' : 'text-stone-500'
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Step Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-900/10 relative">
          
          {/* STEP 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <h2 className="font-heading text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                <User className="w-5 h-5 text-amber-700" />
                <span>Step 1: Basic Account & Profile For</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    This Profile is being Created For
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {(['Self', 'Parents', 'Sibling', 'Relative', 'Friend'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateForm({ profileCreatedBy: opt })}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition border text-center ${
                          formData.profileCreatedBy === opt
                            ? 'bg-[#800020] text-amber-100 border-[#800020]'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Gender
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => updateForm({ gender: 'male' })}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                        formData.gender === 'male' 
                          ? 'bg-[#800020] text-amber-100 border-[#800020]' 
                          : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      Male (Groom)
                    </button>
                    <button
                      type="button"
                      onClick={() => updateForm({ gender: 'female' })}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                        formData.gender === 'female' 
                          ? 'bg-[#800020] text-amber-100 border-[#800020]' 
                          : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      Female (Bride)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Full Name (as per Govt ID)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#800020]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Mobile Number (for OTP & Match Calls)
                  </label>
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => updateForm({ contactNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#800020]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#800020]"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Personal & Astrology */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <h2 className="font-heading text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                <Star className="w-5 h-5 text-amber-700" />
                <span>Step 2: Personal & Astrological Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateForm({ dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#800020]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Marital Status
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => updateForm({ maritalStatus: e.target.value as MaritalStatus })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
                  >
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Awaiting Divorce">Awaiting Divorce</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Height
                  </label>
                  <select
                    value={formData.height}
                    onChange={(e) => updateForm({ height: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
                  >
                    <option value="5' 4&quot; (163 cm)">5' 4" (163 cm)</option>
                    <option value="5' 6&quot; (168 cm)">5' 6" (168 cm)</option>
                    <option value="5' 8&quot; (173 cm)">5' 8" (173 cm)</option>
                    <option value="5' 10&quot; (178 cm)">5' 10" (178 cm)</option>
                    <option value="6' 0&quot; (183 cm)">6' 0" (183 cm)</option>
                    <option value="6' 2&quot; (188 cm)">6' 2" (188 cm)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Mother Tongue
                  </label>
                  <select
                    value={formData.motherTongue}
                    onChange={(e) => updateForm({ motherTongue: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
                  >
                    <option value="Telugu">Telugu</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Community / Caste
                  </label>
                  <input
                    type="text"
                    value={formData.caste}
                    onChange={(e) => updateForm({ caste: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                    placeholder="e.g. Brahmin, Reddy, Kamma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Subcaste / Sect
                  </label>
                  <input
                    type="text"
                    value={formData.subcaste}
                    onChange={(e) => updateForm({ subcaste: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                    placeholder="e.g. Niyogi, Vadama, Motati"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Gothram
                  </label>
                  <input
                    type="text"
                    value={formData.gothram}
                    onChange={(e) => updateForm({ gothram: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                    placeholder="e.g. Bharadwaja, Kashyapa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Rasi (Moon Sign)
                  </label>
                  <select
                    value={formData.rasi}
                    onChange={(e) => updateForm({ rasi: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
                  >
                    <option value="Mesha (Aries)">Mesha (Aries)</option>
                    <option value="Vrishabha (Taurus)">Vrishabha (Taurus)</option>
                    <option value="Mithuna (Gemini)">Mithuna (Gemini)</option>
                    <option value="Karka (Cancer)">Karka (Cancer)</option>
                    <option value="Simha (Leo)">Simha (Leo)</option>
                    <option value="Kanya (Virgo)">Kanya (Virgo)</option>
                    <option value="Tula (Libra)">Tula (Libra)</option>
                    <option value="Vrischika (Scorpio)">Vrischika (Scorpio)</option>
                    <option value="Dhanus (Sagittarius)">Dhanus (Sagittarius)</option>
                    <option value="Makara (Capricorn)">Makara (Capricorn)</option>
                    <option value="Kumbha (Aquarius)">Kumbha (Aquarius)</option>
                    <option value="Meena (Pisces)">Meena (Pisces)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Star / Nakshatra
                  </label>
                  <select
                    value={formData.nakshatra}
                    onChange={(e) => updateForm({ nakshatra: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
                  >
                    <option value="Ashwini">Ashwini</option>
                    <option value="Bharani">Bharani</option>
                    <option value="Krittika">Krittika</option>
                    <option value="Rohini">Rohini</option>
                    <option value="Mrigashira">Mrigashira</option>
                    <option value="Ardra">Ardra</option>
                    <option value="Punarvasu">Punarvasu</option>
                    <option value="Pushya">Pushya</option>
                    <option value="Ashlesha">Ashlesha</option>
                    <option value="Magha">Magha</option>
                    <option value="Purva Phalguni">Purva Phalguni (Pubba)</option>
                    <option value="Uttara Phalguni">Uttara Phalguni</option>
                    <option value="Hasta">Hasta</option>
                    <option value="Chitra">Chitra</option>
                    <option value="Swati">Swati</option>
                    <option value="Vishakha">Vishakha</option>
                    <option value="Anuradha">Anuradha</option>
                    <option value="Jyeshtha">Jyeshtha</option>
                    <option value="Moola">Moola</option>
                    <option value="Purva Ashadha">Purva Ashadha</option>
                    <option value="Uttara Ashadha">Uttara Ashadha</option>
                    <option value="Shravana">Shravana</option>
                    <option value="Dhanishta">Dhanishta</option>
                    <option value="Shatabhisha">Shatabhisha</option>
                    <option value="Purva Bhadrapada">Purva Bhadrapada</option>
                    <option value="Uttara Bhadrapada">Uttara Bhadrapada</option>
                    <option value="Revati">Revati</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Location */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <h2 className="font-heading text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                <Compass className="w-5 h-5 text-amber-700" />
                <span>Step 3: Location & Ancestral Roots</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => updateForm({ country: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => updateForm({ state: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Current City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateForm({ city: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Native Place / Ancestral Town
                  </label>
                  <input
                    type="text"
                    value={formData.nativePlace}
                    onChange={(e) => updateForm({ nativePlace: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                    placeholder="e.g. Guntur, AP / Thanjavur, TN"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Career & Education */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <h2 className="font-heading text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-amber-700" />
                <span>Step 4: Education & Profession</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Highest Education
                  </label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => updateForm({ education: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                    placeholder="e.g. B.Tech / M.Tech / MBA / MBBS / CA"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => updateForm({ college: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                    placeholder="e.g. IIT, BITS Pilani, IIM, MMC"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Employed In
                  </label>
                  <select
                    value={formData.employedIn}
                    onChange={(e) => updateForm({ employedIn: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
                  >
                    <option value="Private Sector">Private Sector</option>
                    <option value="Government / PSU">Government / PSU</option>
                    <option value="Business / Entrepreneur">Business / Entrepreneur</option>
                    <option value="Civil Services">Civil Services</option>
                    <option value="Defence">Defence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Job Title / Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => updateForm({ occupation: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                    placeholder="e.g. Staff Software Architect"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Working Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.workingCompany}
                    onChange={(e) => updateForm({ workingCompany: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                    placeholder="e.g. Microsoft, Google, Apollo"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Annual Income Range
                  </label>
                  <input
                    type="text"
                    value={formData.annualIncome}
                    onChange={(e) => updateForm({ annualIncome: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                    placeholder="e.g. ₹ 35 - 45 Lakhs / yr"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Family Details */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in">
              <h2 className="font-heading text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                <Users className="w-5 h-5 text-amber-700" />
                <span>Step 5: Family Background & Values</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Family Values
                  </label>
                  <select
                    value={formData.familyValues}
                    onChange={(e) => updateForm({ familyValues: e.target.value as FamilyValues })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
                  >
                    <option value="Traditional">Traditional</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Liberal">Liberal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Family Type
                  </label>
                  <select
                    value={formData.familyType}
                    onChange={(e) => updateForm({ familyType: e.target.value as FamilyType })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
                  >
                    <option value="Nuclear">Nuclear Family</option>
                    <option value="Joint">Joint Family</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Family Status
                  </label>
                  <select
                    value={formData.familyStatus}
                    onChange={(e) => updateForm({ familyStatus: e.target.value as FamilyStatus })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
                  >
                    <option value="Middle Class">Middle Class</option>
                    <option value="Upper Middle Class">Upper Middle Class</option>
                    <option value="Rich / Affluent">Rich / Affluent</option>
                  </select>
                </div>

                <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Father's Occupation
                    </label>
                    <input
                      type="text"
                      value={formData.fatherOccupation}
                      onChange={(e) => updateForm({ fatherOccupation: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Mother's Occupation
                    </label>
                    <input
                      type="text"
                      value={formData.motherOccupation}
                      onChange={(e) => updateForm({ motherOccupation: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    About Family
                  </label>
                  <textarea
                    rows={2}
                    value={formData.aboutFamily}
                    onChange={(e) => updateForm({ aboutFamily: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Lifestyle */}
          {currentStep === 6 && (
            <div className="space-y-5 animate-in fade-in">
              <h2 className="font-heading text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-amber-700" />
                <span>Step 6: Lifestyle & Habits</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Dietary Habits
                  </label>
                  <select
                    value={formData.diet}
                    onChange={(e) => updateForm({ diet: e.target.value as DietType })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
                  >
                    <option value="Vegetarian">Strict Vegetarian</option>
                    <option value="Eggetarian">Eggetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Jain">Jain Vegetarian</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Smoking Habits
                  </label>
                  <select
                    value={formData.smoking}
                    onChange={(e) => updateForm({ smoking: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
                  >
                    <option value="No">No / Non-Smoker</option>
                    <option value="Occasionally">Occasionally</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Drinking Habits
                  </label>
                  <select
                    value={formData.drinking}
                    onChange={(e) => updateForm({ drinking: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50"
                  >
                    <option value="No">No / Teetotaler</option>
                    <option value="Occasionally">Occasionally</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    About Me & Personal Outlook
                  </label>
                  <textarea
                    rows={3}
                    value={formData.aboutMe}
                    onChange={(e) => updateForm({ aboutMe: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Photo Upload */}
          {currentStep === 7 && (
            <div className="space-y-5 animate-in fade-in">
              <h2 className="font-heading text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                <Camera className="w-5 h-5 text-amber-700" />
                <span>Step 7: Profile Photo & Privacy</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 flex flex-col items-center">
                  <div className="relative w-44 h-44 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl bg-stone-100">
                    <img
                      src={formData.photoUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] text-center py-1 rounded-lg">
                      Active Profile Photo
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-7 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Quick Demo Photo Selection
                    </label>
                    <p className="text-[11px] text-stone-500 mb-2">
                      Choose an authentic profile photo for your demo preview:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {SAMPLE_PHOTO_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => updateForm({ photoUrl: p.url })}
                          className={`p-2 rounded-xl border text-xs font-bold flex items-center space-x-2 transition ${
                            formData.photoUrl === p.url
                              ? 'bg-rose-50 border-[#800020] text-[#800020]'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          <img src={p.url} alt={p.label} className="w-7 h-7 rounded-full object-cover" />
                          <span className="truncate">{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Photo Privacy Controls
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: 'Public', label: 'Visible to All' },
                        { val: 'OnRequest', label: 'Visible on Request' },
                        { val: 'Protected', label: 'Members Only' }
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => updateForm({ photoPrivacy: item.val as any })}
                          className={`py-2 px-2 text-[11px] font-bold rounded-xl border transition ${
                            formData.photoPrivacy === item.val
                              ? 'bg-[#800020] text-amber-100 border-[#800020]'
                              : 'bg-stone-50 text-stone-700 border-stone-200'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: Partner Preferences */}
          {currentStep === 8 && (
            <div className="space-y-5 animate-in fade-in">
              <h2 className="font-heading text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-amber-700" />
                <span>Step 8: Partner Expectations & Criteria</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Preferred Partner Age Range
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={formData.partnerMinAge}
                      onChange={(e) => updateForm({ partnerMinAge: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                    />
                    <span className="text-stone-500 text-xs">to</span>
                    <input
                      type="number"
                      value={formData.partnerMaxAge}
                      onChange={(e) => updateForm({ partnerMaxAge: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Preferred Community / Caste
                  </label>
                  <input
                    type="text"
                    value={formData.partnerCaste}
                    onChange={(e) => updateForm({ partnerCaste: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Preferred Education
                  </label>
                  <input
                    type="text"
                    value={formData.partnerEducation}
                    onChange={(e) => updateForm({ partnerEducation: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Preferred Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.partnerOccupation}
                    onChange={(e) => updateForm({ partnerOccupation: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 9: Review & Verify */}
          {currentStep === 9 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h2 className="font-heading text-lg font-bold text-stone-900 flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Step 9: Review Biodata & Verification</span>
                </h2>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  100% Complete
                </span>
              </div>

              {/* Summary Card */}
              <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-300/60 grid grid-cols-1 sm:grid-cols-12 gap-6">
                <div className="sm:col-span-3 text-center">
                  <img
                    src={formData.photoUrl}
                    alt={formData.name}
                    className="w-28 h-28 rounded-2xl object-cover mx-auto border-2 border-amber-400 shadow-md"
                  />
                  <div className="mt-2 text-xs font-bold text-stone-900">{formData.name}</div>
                  <div className="text-[10px] text-stone-500">{formData.gender === 'male' ? 'Groom' : 'Bride'} • {formData.age} Yrs</div>
                </div>

                <div className="sm:col-span-9 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-500 font-medium">Community:</span>
                    <p className="font-bold text-stone-800">{formData.caste} ({formData.subcaste})</p>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Gothram & Star:</span>
                    <p className="font-bold text-stone-800">{formData.gothram} • {formData.nakshatra}</p>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Education:</span>
                    <p className="font-bold text-stone-800">{formData.education} ({formData.college})</p>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Profession:</span>
                    <p className="font-bold text-stone-800">{formData.occupation} • {formData.workingCompany}</p>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Location:</span>
                    <p className="font-bold text-stone-800">{formData.city}, {formData.state}</p>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Contact:</span>
                    <p className="font-bold text-stone-800">{formData.contactNumber}</p>
                  </div>
                </div>
              </div>

              {/* Verification Stamp */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center space-x-3 text-xs text-emerald-900">
                <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
                <div>
                  <p className="font-bold">Auspicious Verification Ready</p>
                  <p className="text-[11px] text-emerald-700">
                    By submitting, your profile will be registered with 100% ID verification and instantly connected to Member Dashboard.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-50 transition flex items-center space-x-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 9 ? (
              <button
                type="button"
                id="registration-next-btn"
                onClick={() => setCurrentStep((prev) => Math.min(9, prev + 1))}
                className="px-6 py-2.5 rounded-xl bg-[#800020] text-amber-100 font-bold text-xs shadow-md hover:bg-[#6A001A] transition flex items-center space-x-1.5"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                id="registration-submit-btn"
                onClick={handleFinalSubmit}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-extrabold text-xs tracking-wider uppercase shadow-lg hover:brightness-110 active:scale-95 transition flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Complete Registration & Open Dashboard</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
