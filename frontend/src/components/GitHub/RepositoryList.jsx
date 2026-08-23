import React, { useState, useEffect } from 'react';
import { getGitHubRepositories, checkGitHubAuth, logoutGitHub } from '../../services/api';
import RepositoryCard from './RepositoryCard';
import GitHubLogin from './GitHubLogin';
import LoadingSpinner from '../LoadingSpinner';
import ScanTypeModal from './ScanTypeModal';
import { Search } from 'lucide-react';

const RepositoryList = ({ onSelectRepo }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalRepo, setModalRepo] = useState(null);

    useEffect(() => {
        const checkAuthAndFetchRepos = async () => {
            setIsLoading(true);
            const isAuth = await checkGitHubAuth();
            setIsAuthenticated(isAuth);
            
            if (isAuth) {
                try {
                    const fetchedRepos = await getGitHubRepositories();
                    setRepos(fetchedRepos);
                    setFilteredRepos(fetchedRepos);
                } catch (err) {
                    setError('Failed to fetch repositories. Your session may have expired.');
                    setIsAuthenticated(false);
                }
            }
            setIsLoading(false);
        };

        checkAuthAndFetchRepos();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            setFilteredRepos(repos.filter(r => 
                r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()))
            ));
        } else {
            setFilteredRepos(repos);
        }
    }, [searchQuery, repos]);

    const handleLogout = async () => {
        try {
            await logoutGitHub();
            setIsAuthenticated(false);
            setRepos([]);
            setFilteredRepos([]);
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const handleConfirmScan = (scanConfig) => {
        if (modalRepo) {
            onSelectRepo(modalRepo, scanConfig);
            setModalRepo(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <GitHubLogin />;
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Your Repositories</h2>
                    <p className="text-muted-foreground">Click any repository to launch a full or folder-wise AI code audit.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                            placeholder="Search repositories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 border border-destructive/20 rounded-lg transition-colors whitespace-nowrap"
                    >
                        Disconnect
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                    {error}
                </div>
            )}

            {filteredRepos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRepos.map(repo => (
                        <RepositoryCard 
                            key={repo.id} 
                            repo={repo} 
                            onSelect={(selected) => setModalRepo(selected)} 
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border border-dashed border-border rounded-xl text-muted-foreground">
                    {searchQuery ? 'No repositories match your search.' : 'No repositories found.'}
                </div>
            )}

            {/* Scan Type Selection Modal */}
            <ScanTypeModal
                repo={modalRepo}
                isOpen={!!modalRepo}
                onClose={() => setModalRepo(null)}
                onConfirm={handleConfirmScan}
            />
        </div>
    );
};

export default RepositoryList;
