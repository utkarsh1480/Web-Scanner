import React, { useState, useEffect } from 'react';
import { analyzeGitHubRepository } from '../../services/api';
import CodeSuggestionCard from './CodeSuggestionCard';
import LoadingSpinner from '../LoadingSpinner';
import { ArrowLeft, Sparkles, FolderTree, FolderGit2 } from 'lucide-react';

const AnalysisDashboard = ({ repo, scanConfig, onBack }) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('performance');

    const isFolderScan = scanConfig?.mode === 'folder';
    const targetFolder = scanConfig?.targetFolder;

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setError(null);
        try {
            const data = await analyzeGitHubRepository(repo.full_name, repo.default_branch, isFolderScan ? targetFolder : null);
            setResults(data);
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Failed to analyze repository.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    // Automatically trigger analysis on load
    useEffect(() => {
        if (repo) {
            handleAnalyze();
        }
    }, [repo, scanConfig]);

    const renderSuggestions = (type) => {
        if (!results || !results[type] || results[type].length === 0) {
            return (
                <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-xl">
                    No suggestions found for this category. Great job!
                </div>
            );
        }

        return results[type].map((suggestion, index) => (
            <CodeSuggestionCard key={index} suggestion={suggestion} type={type} />
        ));
    };

    const tabs = [
        { id: 'performance', label: 'Performance' },
        { id: 'seo', label: 'SEO' },
        { id: 'accessibility', label: 'Accessibility' },
        { id: 'security', label: 'Security' },
        { id: 'bestPractices', label: 'Best Practices' }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Repositories
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 border border-border bg-card/50 rounded-xl backdrop-blur-sm">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold text-primary">{repo.full_name}</h2>
                        {isFolderScan ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 text-xs font-semibold rounded-full">
                                <FolderTree className="w-3 h-3" />
                                Folder Scan: /{targetFolder}
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-semibold rounded-full">
                                <FolderGit2 className="w-3 h-3" />
                                Full Repo Scan
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">Default branch: {repo.default_branch}</p>
                </div>
                {!results && !isAnalyzing && (
                    <button 
                        onClick={handleAnalyze}
                        className="btn-primary inline-flex items-center gap-2 shadow-lg shadow-primary/20"
                    >
                        <Sparkles className="w-4 h-4" />
                        Re-Analyze Repository
                    </button>
                )}
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                    {error}
                </div>
            )}

            {isAnalyzing && (
                <div className="flex flex-col items-center justify-center py-20 border border-border bg-card/30 rounded-xl">
                    <LoadingSpinner />
                    <p className="mt-6 text-lg font-medium animate-pulse text-primary">
                        {isFolderScan ? `Scanning folder /${targetFolder}...` : `Scanning entire repository source code...`}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 text-center max-w-md">
                        {isFolderScan
                            ? `Our AI is currently auditing files inside the "${targetFolder}" directory of ${repo.name}.`
                            : `Our AI is currently reviewing the files in ${repo.name}. This may take a minute depending on the repository size.`
                        }
                    </p>
                </div>
            )}

            {results && !isAnalyzing && (
                <div className="mt-8">
                    {/* Tabs */}
                    <div className="flex overflow-x-auto pb-4 mb-6 border-b border-border hide-scrollbar">
                        <div className="flex gap-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                                        activeTab === tab.id 
                                        ? 'bg-primary text-primary-foreground shadow-md' 
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                    }`}
                                >
                                    {tab.label} ({results[tab.id]?.length || 0})
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="min-h-[400px]">
                        {renderSuggestions(activeTab)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalysisDashboard;
