import React from 'react';
import { HeroSection } from './HeroSection';
import { FeaturedProfiles } from './FeaturedProfiles';
import { HowItWorks } from './HowItWorks';
import { SuccessStories } from './SuccessStories';

export const HomeView: React.FC = () => {
  return (
    <div id="home-view" className="space-y-0 animate-in fade-in duration-300">
      <HeroSection />
      <FeaturedProfiles />
      <HowItWorks />
      <SuccessStories />
    </div>
  );
};
