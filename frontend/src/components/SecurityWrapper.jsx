import React from 'react';
import SecurityDetails from './SecurityDetails';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

const SecurityWrapper = ({ score, features }) => {
  return (
    <Card className="card w-full space-y-6 text-center">
      {/* Header */}
      <CardHeader className="p-0 space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Security</h2>
        </div>
        <div className={`text-4xl font-extrabold ${score >= 90 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
          {score}
          <span className="text-muted-foreground text-2xl">/100</span>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A secure website equipped with an SSL certificate and free from vulnerabilities is the standard online.
        </p>
      </CardHeader>

      {/* Security Details */}
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-0 pt-6 border-t border-border">
        {features && features.map((feature, index) => (
          <SecurityDetails key={index} {...feature} />
        ))}
      </CardContent>
    </Card>
  );
};

export default SecurityWrapper;
