import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code2, Lightbulb, TrendingUp } from 'lucide-react';

const RecommendationCard = ({ recommendation, index }) => {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  const priorityConfig = {
    high: {
      label: 'High',
      icon: '🔥',
      borderClass: 'rec-card--high',
      badgeClass: 'rec-badge--high',
    },
    medium: {
      label: 'Medium',
      icon: '⚡',
      borderClass: 'rec-card--medium',
      badgeClass: 'rec-badge--medium',
    },
    low: {
      label: 'Low',
      icon: '✅',
      borderClass: 'rec-card--low',
      badgeClass: 'rec-badge--low',
    },
  };

  const priority = recommendation.priority?.toLowerCase() || 'medium';
  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <div
      className={`rec-card ${config.borderClass}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2" style={{ marginBottom: 0 }}>
          <span className="text-lg">{config.icon}</span>
          {recommendation.title}
        </h3>
        <span className={`rec-badge ${config.badgeClass}`}>
          {config.label} Priority
        </span>
      </div>

      {/* Suggestion */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Suggestion</span>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed pl-6" style={{ marginBottom: 0 }}>
          {recommendation.suggestion}
        </p>
      </div>

      {/* Code Example */}
      {recommendation.codeExample && (
        <div className="mb-4">
          <button
            onClick={() => setIsCodeExpanded(!isCodeExpanded)}
            className="rec-code-toggle"
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Code Example
              </span>
            </div>
            {isCodeExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {isCodeExpanded && (
            <div className="rec-code-block">
              <pre>
                <code>{recommendation.codeExample}</code>
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Impact */}
      <div className="rec-impact">
        <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Expected Impact</span>
          <p className="text-sm text-foreground/90 font-medium mt-0.5" style={{ marginBottom: 0 }}>
            {recommendation.impact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
