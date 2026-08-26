import React from 'react';
import { UserPlus, Search, Users, HeartHandshake } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { navigateTo } = useApp();

  const steps = [
    {
      number: '1',
      title: 'Create Verified Profile',
      desc: 'Register free with your educational, family, and astrological details for 100% ID verification.',
      icon: UserPlus
    },
    {
      number: '2',
      title: 'Vedic Kundali Matching',
      desc: 'Our intelligent astrology engine calculates 36 Guna Ashtakoota compatibility and Dosha analysis.',
      icon: Search
    },
    {
      number: '3',
      title: 'Connect with Families',
      desc: 'Express interest, chat securely, and unlock verified phone & WhatsApp numbers of compatible matches.',
      icon: Users
    },
    {
      number: '4',
      title: 'Sacred Vivaha Union',
      desc: 'Arrange auspicious family meetings and proceed with traditional Vedic marriage rituals.',
      icon: HeartHandshake
    }
  ];

  return (
    <section id="how-it-works-section" className="py-16 bg-gradient-to-b from-white to-amber-50/50 border-y border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#800020] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Sacred Matchmaking Journey
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
            How Lakshmi Srinivasa Matrimony Works
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Four simple and transparent steps to finding your lifelong auspicious life partner.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                id={`how-it-works-step-${step.number}`}
                className="bg-white rounded-2xl p-6 border border-amber-900/15 shadow-sm text-center relative flex flex-col items-center hover:border-amber-500 hover:shadow-lg transition-all duration-300"
              >
                {/* Step badge */}
                <div className="absolute -top-3 bg-gradient-to-r from-[#800020] to-[#9B111E] text-amber-200 text-xs font-bold px-3 py-0.5 rounded-full border border-amber-300 shadow-xs">
                  Step {step.number}
                </div>

                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-300/80 flex items-center justify-center text-[#800020] mt-2 mb-4">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="font-heading font-bold text-base text-stone-900 mb-2">
                  {step.title}
                </h3>
                
                <p className="text-xs text-stone-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            id="how-it-works-register-cta"
            onClick={() => navigateTo('register')}
            className="px-8 py-3.5 rounded-xl bg-[#800020] text-amber-100 font-bold text-xs shadow-md hover:bg-[#6A001A] transition"
          >
            Start Your Auspicious Matchmaking Journey →
          </button>
        </div>

      </div>
    </section>
  );
};
