import React, { useEffect, useState } from 'react';
import FeatureCard from './FeatureCard';

const FeatureList = () => {
  const [features, setFeatures] = useState([]);

  // Mock data fetching function
  const fetchFeatureData = async () => {
    const data = [
      {
        title: 'Browser Caching',
        status: 'PASS',
        message: 'Wowee. Your web caching is world class.',
        description: 'Browser caching speeds up your website by storing frequently used content in local memory.'
      },
      {
        title: 'Minimal Page Redirects',
        status: 'PASS',
        message: 'Straight to the point.',
        description: 'Multiple redirects can make your site load slower. Aim for no more than one redirect.'
      },
      {
        title: 'Image Size',
        status: 'PASS',
        message: 'They fit perfectly!',
        description: 'Images can take a long time to load. Use responsive images or SVGs to optimize your images for different screen sizes.'
      },
      {
        title: 'Minified JavaScript',
        status: 'PASS',
        message: 'Have you been working out?',
        description: 'When your JavaScript is properly compressed, it makes your website run much faster.'
      },
      {
        title: 'Minified CSS',
        status: 'PASS',
        message: 'Short and sweet.',
        description: 'When your CSS is properly compressed, it makes your website run much faster.'
      }
    ];

    // Simulate API response delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setFeatures(data);
  };

  useEffect(() => {
    fetchFeatureData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          status={feature.status}
          message={feature.message}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeatureList;
