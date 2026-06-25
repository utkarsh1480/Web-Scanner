import React from 'react';
import { Lock, Globe, GitBranch, Clock } from 'lucide-react';

const RepositoryCard = ({ repo, onSelect }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    return (
        <div 
            onClick={() => onSelect(repo)}
            className="flex flex-col p-5 border border-border bg-card/50 rounded-xl hover:border-primary/50 hover:bg-card/80 cursor-pointer transition-all duration-300"
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {repo.private ? <Lock className="w-4 h-4 text-muted-foreground" /> : <Globe className="w-4 h-4 text-muted-foreground" />}
                    <h3 className="font-semibold text-lg text-primary truncate max-w-[200px]">{repo.name}</h3>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                    {repo.private ? 'Private' : 'Public'}
                </span>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                {repo.description || "No description provided."}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                <div className="flex items-center gap-1">
                    <GitBranch className="w-3 h-3" />
                    {repo.default_branch}
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Updated {formatDate(repo.updated_at)}
                </div>
            </div>
        </div>
    );
};

export default RepositoryCard;
