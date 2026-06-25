import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <svg className="w-20 h-20" viewBox="0 0 240 240">
        {/* Ring A */}
        <circle
          cx="120"
          cy="120"
          r="105"
          fill="none"
          className="stroke-[#f42f25] animate-ringA"
          strokeWidth="20"
          strokeDasharray="0 660"
          strokeDashoffset="-330"
          strokeLinecap="round"
        />
        {/* Ring B */}
        <circle
          cx="120"
          cy="120"
          r="35"
          fill="none"
          className="stroke-[#f49725] animate-ringB"
          strokeWidth="20"
          strokeDasharray="0 220"
          strokeDashoffset="-110"
          strokeLinecap="round"
        />
        {/* Ring C */}
        <circle
          cx="85"
          cy="120"
          r="70"
          fill="none"
          className="stroke-[#255ff4] animate-ringC"
          strokeWidth="20"
          strokeDasharray="0 440"
          strokeLinecap="round"
        />
        {/* Ring D */}
        <circle
          cx="155"
          cy="120"
          r="70"
          fill="none"
          className="stroke-[#f42582] animate-ringD"
          strokeWidth="20"
          strokeDasharray="0 440"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default LoadingPage;