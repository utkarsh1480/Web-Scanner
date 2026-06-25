import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const FeatureCard = ({ title, status, description, message }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'PASS':
        return 'text-green-500';
      case 'FAIL':
        return 'text-red-500';
      case 'WARN':
        return 'text-yellow-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PASS':
        return <CheckCircle className={`w-8 h-8 ${getStatusColor(status)}`} />;
      case 'FAIL':
        return <XCircle className={`w-8 h-8 ${getStatusColor(status)}`} />;
      case 'WARN':
        return <AlertCircle className={`w-8 h-8 ${getStatusColor(status)}`} />;
      default:
        return null; // Or a default icon
    }
  };

  return (
    <Card className="card p-6 flex flex-col items-center text-center space-y-4 h-full">
      {/* Status badge */}
      {status && (
        <div className={`text-xs font-semibold ${getStatusColor(status)} bg-secondary/50 px-3 py-1 rounded-full inline-block`}>
          {status}
        </div>
      )}

      {/* Icon */}
      <div className="flex-shrink-0">
        {getStatusIcon(status)}
      </div>

      {/* Title */}
      <CardHeader className="p-0">
         <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </CardHeader>

      {/* Message */}
      {message && (
        <CardContent className="p-0 flex-grow">
           <p className="text-muted-foreground font-medium">{message}</p>
        </CardContent>
      )}

      {/* Description */}
      {description && (
        <CardFooter className="p-0 pt-4 border-t border-border w-full">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default FeatureCard;
