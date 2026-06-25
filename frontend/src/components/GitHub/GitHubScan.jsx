import React, { useState } from 'react';
import RepositoryList from './RepositoryList';
import AnalysisDashboard from './AnalysisDashboard';
import { useLanguage } from '../../Context/LanguageContext';

const GitHubScan = () => {
    const { t } = useLanguage();
    const [selectedRepo, setSelectedRepo] = useState(null);

    return (
        <div className="container-custom py-12 min-h-[calc(100vh-160px)]">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center animate-in slide-in-from-bottom-4 duration-500">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                        GitHub Source Scanner
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Connect your GitHub account to let our AI perform a deep, file-level code review of your repositories for performance, SEO, accessibility, and security.
                    </p>
                </div>

                {selectedRepo ? (
                    <AnalysisDashboard 
                        repo={selectedRepo} 
                        onBack={() => setSelectedRepo(null)} 
                    />
                ) : (
                    <RepositoryList onSelectRepo={setSelectedRepo} />
                )}
            </div>
        </div>
    );
};

export default GitHubScan;
