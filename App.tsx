import React, { useState, useEffect, useCallback } from 'react';
import { generateSnippet } from './services/geminiService';
import { TypingArea } from './components/TypingArea';
import { JumbledArea } from './components/JumbledArea';
import { TypingStats } from './components/TypingStats';
import { SettingsBar } from './components/SettingsBar';
import { Snippet, TestStats, Difficulty, Language, SessionHistory, Session, GameMode } from './types';
import { DEFAULT_SNIPPETS } from './constants';
import { Terminal, Github, Keyboard, Command, Loader2, Info, X } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react";
import { storageService } from './services/storageService';

const App: React.FC = () => {
  const [currentSnippet, setCurrentSnippet] = useState<Snippet>(DEFAULT_SNIPPETS[0]);
  const [stats, setStats] = useState<TestStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [topic, setTopic] = useState<string>('Linked List');
  const [subTopic, setSubTopic] = useState<string | undefined>(undefined);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [language, setLanguage] = useState<Language>('cpp');
  const [mode, setMode] = useState<GameMode>('typing');

  const [history, setHistory] = useState<SessionHistory>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState<boolean>(false);

  const fetchNewSnippet = useCallback(async (selectedTopic: string, selectedSubTopic: string | undefined, selectedDiff: Difficulty, selectedLang: Language) => {
    setLoading(true);
    setStats(null);
    setErrorMsg(null);
    try {
      const snippet = await generateSnippet(selectedTopic, selectedDiff, selectedLang, selectedSubTopic);
      setCurrentSnippet(snippet);
    } catch (err) {
      console.error(err);
      setErrorMsg("Error loading snippet. Please try again.");
      // Fallback
      setCurrentSnippet(DEFAULT_SNIPPETS[0]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchNewSnippet(topic, subTopic, difficulty, language);
    setHistory(storageService.getHistory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Global keydown handler for restarts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        fetchNewSnippet(topic, subTopic, difficulty, language);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [fetchNewSnippet, topic, subTopic, difficulty, language]);

  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic);
    setSubTopic(undefined); // Reset subtopic
    fetchNewSnippet(newTopic, undefined, difficulty, language);
  };

  const handleSubTopicChange = (newSubTopic: string | undefined) => {
    setSubTopic(newSubTopic);
    fetchNewSnippet(topic, newSubTopic, difficulty, language);
  };

  const handleTopicSubTopicChange = (newTopic: string, newSubTopic: string | undefined) => {
    setTopic(newTopic);
    setSubTopic(newSubTopic);
    fetchNewSnippet(newTopic, newSubTopic, difficulty, language);
  };

  const handleDifficultyChange = (newDiff: Difficulty) => {
    setDifficulty(newDiff);
    fetchNewSnippet(topic, subTopic, newDiff, language);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    // Reset subtopic because operations might slightly differ or availability differs
    setSubTopic(undefined);
    fetchNewSnippet(topic, undefined, difficulty, newLang);
  };

  const handleTestComplete = (results: TestStats) => {
    setStats(results);

    const session: Session = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      snippetId: currentSnippet.id,
      topic: currentSnippet.topic,
      title: currentSnippet.title || currentSnippet.topic,
      wpm: results.wpm,
      accuracy: results.accuracy,
      maxCombo: results.maxCombo,
      language: currentSnippet.language
    };

    const newHistory = storageService.saveSession(session);
    setHistory(newHistory);
  };

  const restart = () => {
    fetchNewSnippet(topic, subTopic, difficulty, language);
  };

  return (
    <div className="min-h-screen w-full bg-mt-bg text-mt-text flex flex-col items-center p-4 md:p-10 pt-4 md:pt-8 overflow-x-hidden font-mono selection:bg-mt-main selection:text-mt-bg">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-end mb-6">
        <div className="flex items-center gap-4">
          <div className="p-1">
            <img src="/rushlogo.png" alt="DSArush Logo" className="w-12 h-12 object-contain" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-mt-text leading-none">DSArush</h1>
            <p className="text-mt-sub text-sm mt-1 flex items-center gap-2">
              <span>master dsa patterns</span>
            </p>
          </div>
        </div>

        <div className="text-mt-sub text-sm hidden md:flex items-center gap-2 opacity-70">
          {loading ? (
            <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> loading...</span>
          ) : (
            <span className="flex items-center gap-2"><Command size={14} /> esc to restart</span>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1 flex flex-col items-center justify-center min-h-[400px]">
        {errorMsg && (
          <div className="mb-4 text-mt-error text-sm flex items-center gap-2">
            <span className="font-bold">Error:</span> {errorMsg}
          </div>
        )}

        {!stats ? (
          <>
            <SettingsBar
              currentTopic={topic}
              setTopic={handleTopicChange}
              subTopic={subTopic}
              setSubTopic={handleSubTopicChange}
              setTopicSubTopic={handleTopicSubTopicChange}
              difficulty={difficulty}
              setDifficulty={handleDifficultyChange}
              language={language}
              setLanguage={handleLanguageChange}
              mode={mode}
              setMode={setMode}
              loading={loading}
            />

            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-mt-sub animate-pulse">
                <div className="w-12 h-12 flex items-center justify-center mb-4 text-mt-main">
                  <Loader2 size={48} className="animate-spin" />
                </div>
                <span>fetching {subTopic ? subTopic.toLowerCase() : topic.toLowerCase()} snippet...</span>
              </div>
            ) : (
              <>
                <div className="w-full max-w-6xl mb-2 text-mt-sub/50 text-xs text-right flex items-center justify-end gap-2">
                  <span className="font-bold">{currentSnippet.title ? currentSnippet.title : currentSnippet.topic}</span>
                  <span className="w-1 h-1 bg-mt-sub/30 rounded-full"></span>
                  <span>{currentSnippet.language}</span>
                </div>
                {mode === 'typing' ? (
                  <TypingArea
                    snippet={currentSnippet}
                    onComplete={handleTestComplete}
                    focused={!loading && !stats}
                  />
                ) : (
                  <JumbledArea
                    snippet={currentSnippet}
                    onComplete={handleTestComplete}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <TypingStats stats={stats} snippet={currentSnippet} onRestart={restart} history={history} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-mt-sub text-xs">
        <div className="flex gap-6 flex-1">
          <span className="flex items-center gap-1.5 cursor-help hover:text-mt-text transition-colors">
            <Command size={12} />
            <span>esc - restart</span>
          </span>
          <span className="flex items-center gap-1.5 cursor-help hover:text-mt-text transition-colors">
            <Keyboard size={12} />
            <span>tab - indent</span>
          </span>
        </div>

        <div className="flex-1 flex justify-center order-first md:order-none">
          <span className="opacity-50">
            Made with ☕️ by <a href="https://www.linkedin.com/in/aryaneelshivam/" target="_blank" rel="noopener noreferrer" className="hover:text-mt-text underline underline-offset-4 decoration-mt-sub/30 transition-colors">Aryaneel Shivam</a>
          </span>
        </div>

        <div className="flex gap-4 items-center flex-1 justify-end">
          <button onClick={() => setShowAbout(true)} className="hover:text-mt-text flex items-center gap-1.5 transition-colors">
            <Info size={14} />
            <span>about</span>
          </button>
          <a href="https://github.com/aryaneelshivam/dsarush" target="_blank" rel="noopener noreferrer" className="hover:text-mt-text flex items-center gap-1.5 transition-colors">
            <Github size={14} />
            <span>github</span>
          </a>
        </div>
      </footer>
      <Analytics />

      {/* About Modal */}
      {showAbout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-fix"
          onClick={() => setShowAbout(false)}
        >
          <div
            className="relative bg-mt-bg border border-mt-sub/20 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-mt-text"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 text-mt-sub hover:text-mt-text transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <img src="/rushlogo.png" alt="DSArush Logo" className="w-10 h-10 object-contain" />
              <div>
                <h2 className="text-xl font-bold text-mt-text">DSArush</h2>
                <p className="text-mt-sub text-xs">master dsa patterns through typing</p>
              </div>
            </div>

            <p className="text-mt-sub text-sm leading-relaxed mb-5">
              DSArush is a <span className="text-mt-text">MonkeyType-inspired</span> typing tutor built for developers who want to internalize Data Structures & Algorithms patterns in <span className="text-mt-text">C++</span>, <span className="text-mt-text">Java</span>, and <span className="text-mt-text">Python</span>.
            </p>

            <div className="border-t border-mt-sub/15 pt-4 mb-5">
              <p className="text-mt-sub/60 text-xs uppercase tracking-widest mb-3">built with</p>
              <div className="flex flex-wrap gap-2">
                {['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md bg-mt-sub/10 text-mt-sub text-xs">{tech}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-mt-sub/60">
              <a
                href="https://www.linkedin.com/in/aryaneelshivam/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-mt-text transition-colors underline underline-offset-4 decoration-mt-sub/30"
              >
                Made by Aryaneel Shivam
              </a>
              <a
                href="https://github.com/aryaneelshivam/dsarush"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-mt-text transition-colors flex items-center gap-1"
              >
                <Github size={12} /> source code
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;