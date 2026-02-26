import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedFirms } from '../components/FeaturedFirms';
import { HowItWorks } from '../components/HowItWorks';
import { VisualComparisonHub } from '../components/VisualComparisonHub';
import { FAQSection } from '../components/FAQSection';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        onStartQuiz={() => navigate('/quiz')}
        onExplore={() => {
          const firmsSection = document.getElementById('featured-firms');
          if (firmsSection) {
            const yOffset = -80;
            const y = firmsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }}
      />
      <div id="featured-firms">
        <FeaturedFirms />
      </div>
      <VisualComparisonHub />
      <HowItWorks />
      <FAQSection />
    </div>
  );
};

export default LandingPage;