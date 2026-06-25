import React from 'react';

const ScoreCards = ({ scores }) => {
  return (
    <div className="flex gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md flex-1 text-center">
        <h3 className="text-gray-500 text-sm font-semibold mb-2">Performance</h3>
        <p className={`text-4xl font-bold ${scores.performance >= 90 ? 'text-green-500' : scores.performance >= 50 ? 'text-orange-500' : 'text-red-500'}`}>
          {scores.performance}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex-1 text-center">
        <h3 className="text-gray-500 text-sm font-semibold mb-2">SEO</h3>
        <p className={`text-4xl font-bold ${scores.seo >= 90 ? 'text-green-500' : scores.seo >= 50 ? 'text-orange-500' : 'text-red-500'}`}>
          {scores.seo}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex-1 text-center">
        <h3 className="text-gray-500 text-sm font-semibold mb-2">Accessibility</h3>
        <p className={`text-4xl font-bold ${scores.accessibility >= 90 ? 'text-green-500' : scores.accessibility >= 50 ? 'text-orange-500' : 'text-red-500'}`}>
          {scores.accessibility}
        </p>
      </div>
    </div>
  );
};

export default ScoreCards;
