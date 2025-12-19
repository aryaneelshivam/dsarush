import React, { useState, useEffect } from 'react';
import { Snippet, TestStats, SessionHistory } from '../types';
import { CodeExplainer } from './CodeExplainer';
import { CheckCircle, Clock, Type, AlertTriangle, ArrowRight, Loader2, Zap, Share2, Copy, Check, Twitter, History, BarChart3, TrendingUp as TrendingIcon } from 'lucide-react';

interface TypingStatsProps {
  stats: TestStats;
  snippet: Snippet;
  onRestart: () => void;
  history: SessionHistory;
}

export const TypingStats: React.FC<TypingStatsProps> = ({ stats, snippet, onRestart, history }) => {
  const [stage, setStage] = useState<'compiling' | 'result'>('compiling');
  const [copied, setCopied] = useState(false);

  const isPersonalBest = history.length > 0 && stats.wpm >= Math.max(...history.map(s => s.wpm));
  const isHighAccuracy = stats.accuracy >= 98;

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
    const codeLines = snippet.code.split('\n');
    const preview = codeLines.slice(0, 3)
      .map(line => line.length > 40 ? line.substring(0, 37) + '...' : line)
      .join('\n') + (codeLines.length > 3 ? '\n...' : '');

    // Create a beautiful Carbon snapshot link
    const carbonUrl = `https://carbon.now.sh/?code=${encodeURIComponent(snippet.code)}&l=${snippet.language === 'cpp' ? 'cpp' : snippet.language}&t=dracula&wc=true&fm=Fira%20Code&ds=true&sh=true`;

    return `DSArush ⚡\n${snippet.topic}: ${snippet.title || 'Practice'}\n\nWPM: ${Math.round(stats.wpm)}\nAcc: ${Math.round(stats.accuracy)}%\nMax Combo: ${stats.maxCombo} ⚡\n\nCode Preview:\n${preview}\n\nFull Snapshot: ${carbonUrl}\n\n#DSArush #DSA #Coding`;
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
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-mt-sub mt-4 bg-mt-bg border-y border-mt-sub/10 py-8 px-6 md:px-12 w-full max-w-4xl animate-slide-up" style={{ animationDelay: '0.1s' }}>

          {/* WPM */}
          <div className="flex flex-col items-center group min-w-[100px]">
            <div className="flex items-center gap-2 text-xs font-bold text-mt-sub/50 uppercase tracking-widest mb-2 group-hover:text-mt-main transition-colors">
              <TrendingIcon size={14} />
              <span>WPM</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-4xl font-mono ${isPersonalBest ? 'text-mt-main' : 'text-mt-text'}`}>
                {Math.round(stats.wpm)}
              </span>
              {isPersonalBest && (
                <span className="text-[9px] bg-mt-main/10 text-mt-main px-1.5 py-0.5 rounded font-bold mt-1 animate-pulse">
                  NEW BEST
                </span>
              )}
            </div>
          </div>

          {/* Accuracy */}
          <div className="flex flex-col items-center group min-w-[100px]">
            <div className="flex items-center gap-2 text-xs font-bold text-mt-sub/50 uppercase tracking-widest mb-2 group-hover:text-mt-func transition-colors">
              <CheckCircle size={14} />
              <span>Accuracy</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={`text-4xl font-mono ${isHighAccuracy ? 'text-mt-func' : 'text-mt-text'}`}>
                {Math.round(stats.accuracy)}%
              </span>
              {isHighAccuracy && (
                <span className="text-[9px] bg-mt-func/10 text-mt-func px-1.5 py-0.5 rounded font-bold mt-1">
                  PRECISE
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center group min-w-[100px]">
            <div className="flex items-center gap-2 text-xs font-bold text-mt-sub/50 uppercase tracking-widest mb-2 group-hover:text-mt-main transition-colors">
              <Clock size={14} />
              <span>Time</span>
            </div>
            <span className="text-4xl text-mt-text font-mono">{stats.timeElapsed}<span className="text-lg text-mt-sub/50 ml-1">s</span></span>
          </div>

          <div className="flex flex-col items-center group min-w-[100px]">
            <div className="flex items-center gap-2 text-xs font-bold text-mt-sub/50 uppercase tracking-widest mb-2 group-hover:text-mt-main transition-colors">
              <Zap size={14} />
              <span>Max Combo</span>
            </div>
            <span className="text-4xl text-mt-main font-mono">{stats.maxCombo}</span>
          </div>

          <div className="flex flex-col items-center group min-w-[100px]">
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

      {/* Persistence & History (Recent Attempts) */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.25s' }}>
        {/* All-time Summary Card */}
        <div className="bg-mt-sub/5 rounded-xl p-6 border border-mt-sub/10 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-mt-sub font-bold text-xs uppercase tracking-wider">
            <BarChart3 size={14} className="text-mt-main" />
            <span>Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-mt-sub/50 text-[10px] uppercase">Avg WPM</div>
              <div className="text-xl font-mono text-mt-text">
                {history.length > 0 ? Math.round(history.reduce((a, b) => a + b.wpm, 0) / history.length) : '-'}
              </div>
            </div>
            <div>
              <div className="text-mt-sub/50 text-[10px] uppercase">Best WPM</div>
              <div className="text-xl font-mono text-mt-func">
                {history.length > 0 ? Math.round(Math.max(...history.map(s => s.wpm))) : '-'}
              </div>
            </div>
            <div>
              <div className="text-mt-sub/50 text-[10px] uppercase">Avg Acc</div>
              <div className="text-xl font-mono text-mt-text">
                {history.length > 0 ? Math.round(history.reduce((a, b) => a + b.accuracy, 0) / history.length) : '-'}%
              </div>
            </div>
            <div>
              <div className="text-mt-sub/50 text-[10px] uppercase">Sessions</div>
              <div className="text-xl font-mono text-mt-text">{history.length}</div>
            </div>
          </div>
        </div>

        {/* Recent Attempts List */}
        <div className="md:col-span-2 bg-mt-sub/5 rounded-xl p-6 border border-mt-sub/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-mt-sub font-bold text-xs uppercase tracking-wider">
              <History size={14} className="text-mt-main" />
              <span>Recent Activity</span>
            </div>
            <div className="text-[10px] text-mt-sub/30 font-mono">Last {Math.min(history.length, 5)} attempts</div>
          </div>

          <div className="flex flex-col gap-2">
            {history.length > 0 ? (
              history.slice(0, 5).map((session, idx) => (
                <div key={session.id} className="flex items-center justify-between py-2 border-b border-mt-sub/5 last:border-0 hover:bg-mt-sub/5 px-2 rounded transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-mt-sub/20 group-hover:bg-mt-main transition-colors"></div>
                    <div className="flex flex-col">
                      <span className="text-sm text-mt-text font-medium truncate max-w-[150px] md:max-w-xs">{session.title}</span>
                      <span className="text-[10px] text-mt-sub/40 uppercase">{session.topic} • {session.language}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-mono text-mt-text leading-none">{Math.round(session.wpm)}</span>
                      <span className="text-[9px] text-mt-sub/40 uppercase leading-none mt-1">wpm</span>
                    </div>
                    <div className="flex flex-col items-end w-12">
                      <span className="text-sm font-mono text-mt-text leading-none">{Math.round(session.accuracy)}%</span>
                      <span className="text-[9px] text-mt-sub/40 uppercase leading-none mt-1">acc</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-mt-sub/30 gap-2">
                <History size={24} strokeWidth={1} />
                <span className="text-xs">No history yet</span>
              </div>
            )}
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