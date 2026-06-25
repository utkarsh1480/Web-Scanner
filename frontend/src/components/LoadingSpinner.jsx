import React from 'react';

const LoadingSpinner = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
      <p className="text-gray-600 font-medium">{message || "Analyzing website..."}</p>
      <p className="text-sm text-gray-400 mt-2">This might take a minute as we run Lighthouse and generate AI insights.</p>
    </div>
  );
};

export default LoadingSpinner;
