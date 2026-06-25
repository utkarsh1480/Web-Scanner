import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import PerformanceCard from './PerformanceCard';

const PerformanceWrapper = ({ score, pageSize, pageRequests, pageSpeed, imageUrl }) => {
  const performanceData = {
    imageUrl,
    pageSize,
    pageRequests,
    pageSpeed,
    performanceScore: score
  };

  return (
    <Card className="card p-6 w-full space-y-6 text-center">
      {/* Header */}
      <CardHeader className="p-0 space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Zap className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Performance</h2>
        </div>
        <div className={`text-4xl font-extrabold ${score >= 90 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
          {score}
          <span className="text-muted-foreground text-2xl">/100</span>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Website performance is crucial for user experience and search rankings. A fast website keeps visitors engaged and helps convert them into customers.
        </p>
      </CardHeader>

      {/* Performance Card */}
      <CardContent className="p-0 pt-6 border-t border-border">
        <PerformanceCard {...performanceData} />
      </CardContent>
    </Card>
  );
};

export default PerformanceWrapper; 