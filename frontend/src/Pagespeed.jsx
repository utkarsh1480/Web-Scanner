import React, { useState } from "react";
import "./App.css";
import { analyzeWebsite } from "./services/api";
import ScoreCards from "./components/ScoreCards";
import AIRecommendations from "./components/AIRecommendations";
import LoadingSpinner from "./components/LoadingSpinner";

const PageSpeedInsights = () => {
  const [url, setUrl] = useState("https://developers.google.com");
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError(null);
    setAnalysisData(null);
    
    try {
      const data = await analyzeWebsite(url);
      setAnalysisData(data);
    } catch (err) {
      console.error("Error analyzing website:", err);
      setError("Failed to analyze website. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Web Scanner AI</h1>
      
      <form onSubmit={handleAnalyze} className="mb-12 flex gap-4 max-w-2xl mx-auto">
        <input 
          type="url" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL (e.g. https://example.com)"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow disabled:opacity-50 transition-colors"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {loading && <LoadingSpinner />}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {analysisData && !loading && (
        <div>
          <ScoreCards scores={analysisData.scores} />
          <AIRecommendations recommendations={analysisData.recommendations} />
        </div>
      )}
    </div>
  );
};

export default PageSpeedInsights;
