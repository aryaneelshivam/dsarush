import React, { useState, useEffect, useCallback } from 'react';
import { generateSnippet } from './services/geminiService';
import { TypingArea } from './components/TypingArea';
import { TypingStats } from './components/TypingStats';
import { SettingsBar } from './components/SettingsBar';
import { Snippet, TestStats, Difficulty, Language } from './types';
import { DEFAULT_SNIPPETS } from './constants';
import { Terminal, Github, Keyboard, Command, Loader2 } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react";

const App: React.FC = () => {
  const [currentSnippet, setCurrentSnippet] = useState<Snippet>(DEFAULT_SNIPPETS[0]);
  const [stats, setStats] = useState<TestStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [topic, setTopic] = useState<string>('Linked List');
  const [subTopic, setSubTopic] = useState<string | undefined>(undefined);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [language, setLanguage] = useState<Language>('cpp');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
  };

  const restart = () => {
    fetchNewSnippet(topic, subTopic, difficulty, language);
  };

  return (
    <div className="min-h-screen w-full bg-mt-bg text-mt-text flex flex-col items-center p-4 md:p-10 pt-4 md:pt-8 overflow-x-hidden font-mono selection:bg-mt-main selection:text-mt-bg">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-end mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-mt-text text-mt-bg p-2 rounded-lg">
            <Terminal size={32} />
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
                <TypingArea
                  snippet={currentSnippet}
                  onComplete={handleTestComplete}
                  focused={!loading && !stats}
                />
              </>
            )}
          </>
        ) : (
          <TypingStats stats={stats} snippet={currentSnippet} onRestart={restart} />
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
          <a href="#" className="hover:text-mt-text flex items-center gap-1.5 transition-colors">
            <Github size={14} />
            <span>github</span>
          </a>
        </div>
      </footer>
      <Analytics />
    </div>
  );
};

export default App;