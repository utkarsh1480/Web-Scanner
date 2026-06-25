import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { FaTachometerAlt, FaRegFileAlt, FaCloudDownloadAlt } from "react-icons/fa";
import { Zap } from 'lucide-react';

const PerformanceCard = ({
  imageUrl,
  pageSize,
  pageRequests,
  pageSpeed,
  performanceScore,
}) => {

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formattedPageSize = typeof pageSize === 'number' ? `${(pageSize / 1024).toFixed(2)} KB` : pageSize;
  const formattedPageSpeed = typeof pageSpeed === 'number' ? `${pageSpeed.toFixed(2)} s` : pageSpeed;

  return (
    <Card className="card w-full space-y-6">
      {/* Header Section */}
      <CardHeader className="text-center p-0">
        <div className="flex items-center justify-center mb-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Performance"
              className="w-24 h-24 rounded-full object-cover shadow-md border border-border"
            />
          ) : (
            <div className="w-24 h-24 bg-secondary flex items-center justify-center rounded-full border border-border">
              <Zap className="w-12 h-12 text-primary" />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Performance Score</h2>
          <div className={`text-4xl font-extrabold ${getScoreColor(performanceScore)}`}>
            {performanceScore}
            <span className="text-muted-foreground text-2xl">/100</span> {/* Assuming max score is 100 */}
          </div>
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="text-center space-y-4 p-0">
        <p className="text-muted-foreground">
          Optimizing your website performance is crucial to increasing traffic, improving conversion rates, and boosting revenue.
        </p>
        <Button className="btn-primary w-full">
          Improve your website performance with a free lesson
        </Button>
      </CardContent>

      {/* Statistics Section */}
      <CardFooter className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full p-0 pt-6 border-t border-border">
        {/* Page Size */}
        <div className="flex flex-col items-center space-y-2">
          <FaCloudDownloadAlt className="text-2xl text-green-500" />
          <h3 className="text-sm font-medium text-muted-foreground">Page Size</h3>
          <div className="text-xl font-bold text-foreground">{formattedPageSize}</div>
        </div>

        {/* Page Requests */}
        <div className="flex flex-col items-center space-y-2">
          <FaRegFileAlt className="text-2xl text-yellow-500" />
          <h3 className="text-sm font-medium text-muted-foreground">Page Requests</h3>
          <div className="text-xl font-bold text-foreground">{pageRequests}</div>
        </div>

        {/* Page Speed */}
        <div className="flex flex-col items-center space-y-2">
          <FaTachometerAlt className="text-2xl text-red-500" />
          <h3 className="text-sm font-medium text-muted-foreground">Page Speed</h3>
          <div className="text-xl font-bold text-foreground">{formattedPageSpeed}</div>
        </div>
      </CardFooter>
    </Card>
  );
};

PerformanceCard.propTypes = {
  imageUrl: PropTypes.string,
  pageSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pageRequests: PropTypes.number,
  pageSpeed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  performanceScore: PropTypes.number,
};

export default PerformanceCard;
