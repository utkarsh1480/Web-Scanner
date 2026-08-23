import React, { useState } from 'react';
import { X, FolderGit2, FolderTree, Folder, ArrowRight } from 'lucide-react';

const ScanTypeModal = ({ repo, isOpen, onClose, onConfirm }) => {
  const [scanMode, setScanMode] = useState('full'); // 'full' | 'folder'
  const [targetFolder, setTargetFolder] = useState('src');
  const [customFolder, setCustomFolder] = useState('');

  if (!isOpen || !repo) return null;

  const handleConfirm = () => {
    if (scanMode === 'full') {
      onConfirm({ mode: 'full', targetFolder: null });
    } else {
      const selected = customFolder.trim() || targetFolder;
      onConfirm({ mode: 'folder', targetFolder: selected });
    }
  };

  const presetFolders = ['src', 'frontend', 'backend', 'components', 'pages', 'controllers', 'services', 'lib', 'app'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-200">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Configure Code Scan</span>
          <h2 className="text-2xl font-bold text-foreground mt-1">{repo.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose how you would like our AI engine to audit this repository.
          </p>
        </div>

        {/* Option Selection Cards */}
        <div className="space-y-3">

          {/* Option 1: Full Repo Scan */}
          <div
            onClick={() => setScanMode('full')}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
              scanMode === 'full'
                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                : 'border-border bg-card/40 hover:border-border/80'
            }`}
          >
            <div className={`p-3 rounded-lg ${scanMode === 'full' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Full Repository Scan</h3>
                {scanMode === 'full' && <span className="text-xs font-medium text-primary px-2 py-0.5 rounded-full bg-primary/10">Selected</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Scan all supported files across the entire codebase to detect overall performance, security, and SEO issues.
              </p>
            </div>
          </div>

          {/* Option 2: Folder-wise Scan */}
          <div
            onClick={() => setScanMode('folder')}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
              scanMode === 'folder'
                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                : 'border-border bg-card/40 hover:border-border/80'
            }`}
          >
            <div className={`p-3 rounded-lg ${scanMode === 'folder' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
              <FolderTree className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Folder-wise Scan</h3>
                {scanMode === 'folder' && <span className="text-xs font-medium text-primary px-2 py-0.5 rounded-full bg-primary/10">Selected</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Target a specific folder or sub-directory (e.g. <code className="text-foreground bg-secondary px-1 py-0.5 rounded">src</code>, <code className="text-foreground bg-secondary px-1 py-0.5 rounded">frontend</code>) for an isolated code report.
              </p>
            </div>
          </div>

        </div>

        {/* Folder Selection Controls (Visible only if scanMode === 'folder') */}
        {scanMode === 'folder' && (
          <div className="p-4 bg-secondary/30 rounded-xl border border-border/60 space-y-3 animate-in fade-in duration-200">
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider">
              Select or Enter Target Folder
            </label>

            {/* Quick preset chips */}
            <div className="flex flex-wrap gap-2">
              {presetFolders.map(folder => (
                <button
                  key={folder}
                  type="button"
                  onClick={() => { setTargetFolder(folder); setCustomFolder(''); }}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                    (targetFolder === folder && !customFolder)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-muted-foreground border-border hover:border-primary/50'
                  }`}
                >
                  <Folder className="w-3 h-3 inline mr-1" />
                  {folder}
                </button>
              ))}
            </div>

            {/* Custom input */}
            <div>
              <input
                type="text"
                placeholder="Or type path (e.g., frontend/src/components)"
                value={customFolder}
                onChange={e => setCustomFolder(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="btn-primary px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>Start {scanMode === 'folder' ? 'Folder' : 'Full'} Scan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ScanTypeModal;
