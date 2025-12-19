import React, { useMemo } from 'react';
import { Difficulty, Language } from '../types';
import { TOPICS, getOperationsForTopic } from '../constants';
import { Feather, TrendingUp, Flame, LayoutList, ChevronDown, Shuffle, Hash, Code2 } from 'lucide-react';

interface SettingsBarProps {
  currentTopic: string;
  setTopic: (t: string) => void;
  subTopic: string | undefined;
  setSubTopic: (st: string | undefined) => void;
  setTopicSubTopic: (t: string, st: string | undefined) => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  loading: boolean;
}

export const SettingsBar: React.FC<SettingsBarProps> = ({
  currentTopic,
  setTopic,
  subTopic,
  setSubTopic,
  setTopicSubTopic,
  difficulty,
  setDifficulty,
  language,
  setLanguage,
  loading
}) => {

  const handleSubTopicChange = (t: string, st: string | undefined) => {
    setTopicSubTopic(t, st);
  };

  const handleTopicClick = (t: string) => {
    if (t !== currentTopic) {
      setTopic(t);
      setSubTopic(undefined);
    }
  };

  const getDifficultyIcon = (d: Difficulty) => {
    switch (d) {
      case Difficulty.EASY: return <Feather size={14} />;
      case Difficulty.MEDIUM: return <TrendingUp size={14} />;
      case Difficulty.HARD: return <Flame size={14} />;
    }
  };

  return (
    <div className="w-full max-w-6xl mb-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row items-center justify-between bg-mt-sub/5 rounded-lg px-6 py-3 gap-6 lg:gap-8 text-xs font-mono text-mt-sub select-none shadow-sm border border-mt-sub/5">

        {/* Left: Difficulty */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex gap-1 bg-mt-bg/50 rounded p-1">
            {Object.values(Difficulty).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                disabled={loading}
                className={`
                      px-3 py-1.5 rounded transition-all duration-200 outline-none flex items-center gap-2
                      ${difficulty === d
                    ? 'text-mt-main bg-mt-sub/10 font-bold'
                    : 'hover:text-mt-text hover:bg-mt-sub/5'}
                    `}
              >
                {getDifficultyIcon(d)}
                <span>{d}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-0.5 h-6 bg-mt-sub/10 rounded-full"></div>

        {/* Center: Topics */}
        <div className="flex-1 w-full lg:w-auto overflow-x-auto no-scrollbar mask-linear-fade flex items-center gap-2">
          <div className="opacity-50 px-2 hidden md:block">
            <LayoutList size={14} />
          </div>
          <div className="flex items-center justify-start lg:justify-center gap-1 md:gap-1 min-w-max px-2">
            {TOPICS.map(t => {
              const ops = getOperationsForTopic(t, language);
              const isActive = currentTopic === t;

              return (
                <div key={t} className="relative group/topic flex items-center">
                  <button
                    onClick={() => handleTopicClick(t)}
                    disabled={loading}
                    className={`
                      px-2.5 py-1 rounded-l transition-colors duration-200 outline-none whitespace-nowrap flex items-center gap-1
                      ${isActive
                        ? 'text-mt-main bg-mt-sub/5'
                        : 'hover:text-mt-text hover:bg-mt-sub/5'}
                    `}
                  >
                    {t === 'Binary Search Tree' ? 'BST' : t}
                  </button>

                  <div className={`
                    flex items-center px-1 py-1 rounded-r transition-colors duration-200 bg-mt-sub/5 border-l border-mt-sub/10
                    ${isActive ? 'text-mt-main' : 'text-mt-sub/40 group-hover/topic:text-mt-sub group-hover/topic:bg-mt-sub/10'}
                  `}>
                    <ChevronDown size={10} className="group-hover/topic:scale-110 transition-transform" />
                    <select
                      value={isActive ? (subTopic || "") : ""}
                      onChange={(e) => handleSubTopicChange(t, e.target.value || undefined)}
                      disabled={loading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
                    >
                      <option value="">Random</option>
                      {ops.map(op => (
                        <option key={op} value={op}>{op}</option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-0.5 h-6 bg-mt-sub/10 rounded-full"></div>

        {/* Right: Language */}
        <div className="flex items-center gap-4 flex-shrink-0 justify-end relative">
          {/* Language Dropdown */}
          <div className="relative flex items-center group cursor-pointer text-mt-sub hover:text-mt-text transition-colors gap-2 bg-mt-bg/30 px-3 py-1.5 rounded hover:bg-mt-sub/10">
            <Code2 size={12} />
            <span className="uppercase">{language}</span>
            <ChevronDown size={12} className="opacity-50" />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              disabled={loading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          </div>

          {/* Python Placeholder (Visual Only) */}
          <div className="hidden xl:block opacity-30 text-[10px] bg-mt-bg px-2 py-1 rounded border border-mt-sub/20 cursor-not-allowed" title="Coming Soon">
            Python (Soon)
          </div>
        </div>

      </div>
    </div>
  );
};