import React, { useEffect, useState } from 'react';
import SEOFeature from './SEOFeature';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

const SEOWrapper = ({ score, features }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="card w-full h-full space-y-6 text-center">
      {/* SEO Score Header */}
      <CardHeader className="p-0 space-y-2">
         <div className="flex items-center justify-center space-x-2">
           <Search className="w-8 h-8 text-primary" />
           <h2 className="text-3xl md:text-4xl font-bold text-foreground">SEO Optimization</h2>
         </div>
        <div className={`text-4xl font-extrabold ${getScoreColor(score)}`}>
          {score}
          <span className="text-muted-foreground text-2xl">/100</span>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Optimizing your website content for search helps you drive organic traffic to your website. You can do this by providing a great experience for people and web crawlers alike.
        </p>
      </CardHeader>

      {/* SEO Features Grid */}
      <CardContent className="grid grid-cols-1 gap-6 p-6 border-t border-border">
        {features && features.map((feature, index) => (
          <SEOFeature key={index} {...feature} />
        ))}
      </CardContent>
    </Card>
  );
};

export default SEOWrapper;
