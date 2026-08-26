import React from 'react';
import { SUCCESS_STORIES } from '../../data/mockProfiles';
import { Heart, Sparkles, Quote, MapPin, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SuccessStories: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section id="success-stories-section" className="py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#800020] bg-rose-50 px-3 py-1 rounded-full border border-rose-200 mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#800020] text-[#800020]" />
            <span>Sacred Marriages Solemnized</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-stone-900">
            Real Matrimonial Success Stories
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Read heartwarming stories of families who found their divine match through Lakshmi Srinivasa Matrimony.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story) => (
            <div
              key={story.id}
              id={`success-story-${story.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-amber-900/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Couple Photo */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                <img
                  src={story.photo}
                  alt={story.coupleName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-heading font-bold text-base text-amber-200">
                    {story.coupleName}
                  </h3>
                  <div className="flex items-center space-x-3 text-[10px] text-stone-300 mt-0.5">
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 text-amber-400 mr-1" />
                      {story.city}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 text-amber-400 mr-1" />
                      {story.weddingDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Story & Quote */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-stone-600 leading-relaxed">
                  {story.story}
                </p>

                <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-300/40 text-xs italic text-amber-950 font-serif">
                  <Quote className="w-4 h-4 text-amber-600 mb-1 inline mr-1" />
                  {story.quote}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Trust Callout */}
        <div className="mt-14 bg-gradient-to-r from-[#800020] via-[#9B111E] to-[#800020] rounded-3xl p-8 text-white shadow-xl text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-amber-100">
              Are You Looking For a Dignified Life Partner For Your Son / Daughter?
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              Join thousands of prospective Telugu, Tamil, Kannada, and Indian families who trust Lakshmi Srinivasa Matrimony. Register free today or speak with our senior matchmaker advisors.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                id="cta-register-bottom"
                onClick={() => navigateTo('register')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs shadow-md hover:brightness-105 transition"
              >
                Register Your Family's Profile Free
              </button>
              <button
                id="cta-upgrade-bottom"
                onClick={() => navigateTo('membership')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-300 text-amber-100 font-bold text-xs transition"
              >
                Explore Assisted VIP Membership
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
