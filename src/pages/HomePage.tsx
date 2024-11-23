import React from 'react';
import Hero from '../components/Hero';
import Fundraiser from '../components/Fundraiser';
import CourseSection from '../components/CourseSection';
import Resources from '../components/Resources';

const HomePage: React.FC = () => {
  return (
    <main className="w-full">
      <Hero />
      <div id="fundraiser">
        <Fundraiser />
      </div>
      <CourseSection />
      <Resources />
    </main>
  );
};

export default HomePage;