
// Update 19/11/24 (2)
// components/PerformanceWrapper.js
import React, { useContext } from "react";
import PerformanceCard from "./PerformanceCard";
import { PageSpeedContext } from "../Context/context";

const PerformanceWrapper = () => {
  const { data, loading, error } = useContext(PageSpeedContext);
  console.log("Context data in Wrapper:", { data, loading, error });

  console.log("PerformanceWrapper component is rendering");

  // console.log("Context data in PerformanceWrapper:", data);  // Debugging

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No performance data available.</div>;

  // Ensure we're passing the correct data to PerformanceCard
  console.log("Data passed to PerformanceCard:", {
    imageUrl: data.imageUrl,
    pageSize: data.pageSize,
    pageRequests: data.pageRequests,
    pageSpeed: data.pageSpeed,
    performanceScore: data.performanceScore,
  });

  return (
    <PerformanceCard
      imageUrl={data.imageUrl}
      pageSize={data.pageSize}
      pageRequests={data.pageRequests}
      pageSpeed={data.pageSpeed}
      performanceScore={data.performanceScore}
    />
  );
};

export default PerformanceWrapper;
