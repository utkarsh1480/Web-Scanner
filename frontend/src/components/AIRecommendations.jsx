import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import RecommendationCard from './RecommendationCard';

const AIRecommendations = ({ recommendations }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [filter, setFilter] = useState('all');

  if (!recommendations || recommendations.length === 0) return null;

  const highCount = recommendations.filter(r => r.priority?.toLowerCase() === 'high').length;
  const mediumCount = recommendations.filter(r => r.priority?.toLowerCase() === 'medium').length;
  const lowCount = recommendations.filter(r => r.priority?.toLowerCase() === 'low').length;

  const filtered = filter === 'all'
    ? recommendations
    : recommendations.filter(r => r.priority?.toLowerCase() === filter);

  return (
    <div className="ai-recommendations-section">
      {/* Header */}
      <div
        className="ai-recommendations-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="ai-icon-wrapper">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground" style={{ marginBottom: 0 }}>
              AI Recommendations
            </h2>
            <p className="text-sm text-muted-foreground" style={{ marginBottom: 0 }}>
              {recommendations.length} suggestion{recommendations.length !== 1 ? 's' : ''} to improve your site
            </p>
          </div>
        </div>
        <button className="ai-expand-btn" aria-label={isExpanded ? 'Collapse' : 'Expand'}>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="ai-recommendations-body">
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`ai-filter-chip ${filter === 'all' ? 'ai-filter-chip--active' : ''}`}
            >
              All ({recommendations.length})
            </button>
            {highCount > 0 && (
              <button
                onClick={() => setFilter('high')}
                className={`ai-filter-chip ai-filter-chip--high ${filter === 'high' ? 'ai-filter-chip--active-high' : ''}`}
              >
                🔥 High ({highCount})
              </button>
            )}
            {mediumCount > 0 && (
              <button
                onClick={() => setFilter('medium')}
                className={`ai-filter-chip ai-filter-chip--medium ${filter === 'medium' ? 'ai-filter-chip--active-medium' : ''}`}
              >
                ⚡ Medium ({mediumCount})
              </button>
            )}
            {lowCount > 0 && (
              <button
                onClick={() => setFilter('low')}
                className={`ai-filter-chip ai-filter-chip--low ${filter === 'low' ? 'ai-filter-chip--active-low' : ''}`}
              >
                ✅ Low ({lowCount})
              </button>
            )}
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {filtered.map((rec, index) => (
              <RecommendationCard key={index} recommendation={rec} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
