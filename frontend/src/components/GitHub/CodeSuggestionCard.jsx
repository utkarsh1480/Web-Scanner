import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, ShieldAlert, Zap, FileCode2 } from 'lucide-react';

const CodeSuggestionCard = ({ suggestion, type }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Dynamic styling based on priority
    const priorityConfig = {
        'High': { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500' },
        'Medium': { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500' },
        'Low': { color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500' }
    };

    // Dynamic icon based on category type
    const getTypeIcon = () => {
        switch (type) {
            case 'performance': return <Zap className="w-5 h-5 text-blue-500" />;
            case 'security': return <ShieldAlert className="w-5 h-5 text-red-500" />;
            case 'accessibility': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            default: return <AlertCircle className="w-5 h-5 text-amber-500" />;
        }
    };

    const config = priorityConfig[suggestion.priority] || priorityConfig['Medium'];

    return (
        <div className={`overflow-hidden bg-card/80 backdrop-blur-sm border border-border rounded-xl mb-4 transition-all duration-300 animate-in slide-in-from-bottom-4`}>
            {/* Left border indicator */}
            <div className="flex">
                <div className={`w-1 ${config.bg} ${config.border} border-l-4`} />
                
                <div className="flex-grow p-5">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-1">{getTypeIcon()}</div>
                            <div>
                                <h3 className="font-semibold text-lg text-foreground mb-1">
                                    {suggestion.issue}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                    <FileCode2 className="w-4 h-4" />
                                    <span className="font-mono text-xs px-2 py-0.5 bg-secondary rounded">{suggestion.file}</span>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    {suggestion.solution}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>
                                {suggestion.priority} Priority
                            </span>
                            
                            {suggestion.codeExample && (
                                <button 
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="p-1 hover:bg-secondary rounded-full transition-colors"
                                >
                                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Expandable Code Section */}
                    {isExpanded && suggestion.codeExample && (
                        <div className="mt-4 pt-4 border-t border-border animate-in slide-in-from-top-2">
                            <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Suggested Fix</div>
                            <div className="relative group">
                                <pre className="bg-[#0d1117] text-[#c9d1d9] p-4 rounded-lg overflow-x-auto border border-border/50 text-sm font-mono leading-relaxed">
                                    <code>{suggestion.codeExample}</code>
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodeSuggestionCard;
