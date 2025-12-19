import React, { useState, useEffect } from 'react';
import { Snippet, TestStats } from '../types';
import { CodeExplainer } from './CodeExplainer';
import { CheckCircle, Clock, Type, AlertTriangle, ArrowRight, Loader2, Zap, Share2, Copy, Check, Twitter } from 'lucide-react';

interface TypingStatsProps {
  stats: TestStats;
  snippet: Snippet;
  onRestart: () => void;
}

export const TypingStats: React.FC<TypingStatsProps> = ({ stats, snippet, onRestart }) => {
  const [stage, setStage] = useState<'compiling' | 'result'>('compiling');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Satisfying delay for "compilation"
    const timer = setTimeout(() => {
      setStage('result');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (stage === 'compiling') {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-6xl py-32 animate-fade-in">
        <div className="flex flex-col items-center gap-6">
           <div className="relative w-16 h-16 flex items-center justify-center">
             <Loader2 size={48} className="text-mt-main animate-spin" />
           </div>
           <div className="font-mono text-mt-sub text-lg animate-pulse">
             Compiling Code...
           </div>
        </div>
      </div>
    );
  }

  const generateShareText = () => {
      return `DSArush ⚡\n${snippet.topic}: ${snippet.title || 'Practice'}\n\nWPM: ${Math.round(stats.wpm)}\nAcc: ${Math.round(stats.accuracy)}%\nMax Combo: ${stats.maxCombo} ⚡\n\n#DSArush #DSA #Coding`;
  };

  const handleCopy = async () => {
    try {
        await navigator.clipboard.writeText(generateShareText());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        console.error('Failed to copy', err);
    }
  };

  const handleTweet = () => {
    const text = generateShareText();
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in space-y-8 w-full max-w-6xl pb-12">
      
      {/* Result Header */}
      <div className="flex flex-col items-center justify-center space-y-8 py-8 w-full">
        
        <div className="flex flex-col items-center animate-slide-up gap-4">
            <CheckCircle size={64} className="text-mt-func mb-2" strokeWidth={1.5} />
            
            <div className="text-4xl md:text-5xl font-bold tracking-tight text-mt-func">
                Compilation Successful
            </div>
            
            <div className="text-mt-sub text-sm flex items-center gap-2">
                {stats.errors === 0 ? (
                    <span>Perfect execution. 0 typos.</span>
                ) : (
                    <span className="flex items-center gap-2">
                        <AlertTriangle size={14} className="text-mt-main" />
                        {stats.errors} typo{stats.errors > 1 ? 's' : ''} fixed during coding.
                    </span>
                )}
            </div>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-20 text-mt-sub mt-4 bg-mt-bg border-y border-mt-sub/10 py-8 px-12 w-full max-w-4xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col items-center group">
                <div className="flex items-center gap-2 text-xs font-bold text-mt-sub/50 uppercase tracking-widest mb-2 group-hover:text-mt-main transition-colors">
                    <Clock size={14} />
                    <span>Time</span>
                </div>
                <span className="text-4xl text-mt-text font-mono">{stats.timeElapsed}<span className="text-lg text-mt-sub/50 ml-1">s</span></span>
            </div>
            <div className="flex flex-col items-center group">
                <div className="flex items-center gap-2 text-xs font-bold text-mt-sub/50 uppercase tracking-widest mb-2 group-hover:text-mt-main transition-colors">
                    <Type size={14} />
                    <span>Chars</span>
                </div>
                <span className="text-4xl text-mt-text font-mono">{stats.totalChars}</span>
            </div>
            {/* Max Combo Stat */}
            <div className="flex flex-col items-center group">
                <div className="flex items-center gap-2 text-xs font-bold text-mt-sub/50 uppercase tracking-widest mb-2 group-hover:text-mt-main transition-colors">
                    <Zap size={14} />
                    <span>Max Combo</span>
                </div>
                <span className="text-4xl text-mt-main font-mono">{stats.maxCombo}</span>
            </div>
            <div className="flex flex-col items-center group">
                <div className="flex items-center gap-2 text-xs font-bold text-mt-sub/50 uppercase tracking-widest mb-2 group-hover:text-mt-main transition-colors">
                    <AlertTriangle size={14} />
                    <span>Errors</span>
                </div>
                <span className={`text-4xl font-mono ${stats.errors > 0 ? 'text-mt-error' : 'text-mt-text'}`}>{stats.errors}</span>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 animate-slide-up items-center" style={{ animationDelay: '0.2s' }}>
            <button 
                onClick={onRestart}
                className="px-8 py-3 bg-mt-sub/10 hover:bg-mt-text hover:text-mt-bg text-mt-text transition-all duration-200 rounded-lg font-mono text-lg flex items-center gap-3 group"
            >
                <span>Next Problem</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex gap-2">
                <button 
                    onClick={handleTweet}
                    className="p-3 bg-mt-sub/5 hover:bg-[#1DA1F2] hover:text-white text-mt-sub transition-all duration-200 rounded-lg group"
                    title="Share on Twitter"
                >
                    <Twitter size={20} />
                </button>
                <button 
                    onClick={handleCopy}
                    className="p-3 bg-mt-sub/5 hover:bg-mt-func hover:text-mt-bg text-mt-sub transition-all duration-200 rounded-lg group relative"
                    title="Copy Stats"
                >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                    {copied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-mt-func text-mt-bg px-2 py-1 rounded whitespace-nowrap">
                            Copied!
                        </span>
                    )}
                </button>
            </div>
        </div>
      </div>

      {/* Code Review (Always visible) */}
      <div className="w-full border-t border-mt-sub/10 pt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
         <CodeExplainer snippet={snippet} />
      </div>
    </div>
  );
};