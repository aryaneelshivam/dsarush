import React, { useState, useEffect, useRef, useCallback, useLayoutEffect, useMemo } from 'react';
import { Snippet, TestStats } from '../types';
import { generateSyntaxMap } from '../utils/syntaxHighlighting';
import { MousePointerClick, Zap, Flame } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

interface TypingAreaProps {
  snippet: Snippet;
  onComplete: (stats: TestStats) => void;
  focused: boolean;
}

export const TypingArea: React.FC<TypingAreaProps> = ({ snippet, onComplete, focused }) => {
  const [userInput, setUserInput] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState<number>(0);

  // Combo State
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [comboShake, setComboShake] = useState<boolean>(false);
  const [errorShake, setErrorShake] = useState<boolean>(false);

  // Refs for tracking logic
  const lastKeyTime = useRef<number>(Date.now());
  const isLinePerfect = useRef<boolean>(true);
  const HESITATION_THRESHOLD = 2000; // 2 seconds to reset combo

  // Calculate syntax highlighting map once per snippet
  const syntaxMap = useMemo(() => generateSyntaxMap(snippet.code), [snippet.code]);

  // Refs for scrolling and cursor positioning
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement | null>(null);

  // State for the smooth floating cursor
  const [caretStyle, setCaretStyle] = useState<{ top: number; left: number; height: number, opacity: number }>({
    top: 0,
    left: 0,
    height: 40,
    opacity: 0
  });

  // Reset state when snippet changes
  useEffect(() => {
    setUserInput('');
    setStartTime(null);
    setErrors(0);
    setCombo(0);
    setMaxCombo(0);
    setMultiplier(1.0);
    lastKeyTime.current = Date.now();
    isLinePerfect.current = true;
    setCaretStyle(prev => ({ ...prev, opacity: 0 }));
  }, [snippet]);

  // Handle Cursor Position & Smooth Scroll
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    let target = activeCharRef.current;

    if (target) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const charRect = target.getBoundingClientRect();

      const top = charRect.top - containerRect.top + containerRef.current.scrollTop;
      const left = charRect.left - containerRect.left + containerRef.current.scrollLeft;

      setCaretStyle({
        top: top,
        left: left,
        height: charRect.height || 40, // Fallback increased
        opacity: 1
      });

      const relativeTop = charRect.top - containerRect.top;
      const relativeBottom = charRect.bottom - containerRect.top;

      if (relativeTop < 50 || relativeBottom > containerRect.height - 50) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [userInput, snippet]);

  const breakCombo = useCallback(() => {
    if (combo > 0) {
      setCombo(0);
      setMultiplier(1.0);
      setComboShake(true);
      setTimeout(() => setComboShake(false), 300);
    }
    isLinePerfect.current = false;
  }, [combo]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.metaKey || (e.ctrlKey && !e.altKey)) return;

    soundEngine.init();
    const targetCode = snippet.code;

    if (userInput.length >= targetCode.length && e.key !== 'Backspace') return;

    const now = Date.now();

    if (!startTime) {
      setStartTime(now);
      lastKeyTime.current = now;
    } else {
      // Check Hesitation
      if (now - lastKeyTime.current > HESITATION_THRESHOLD) {
        breakCombo();
      }
      lastKeyTime.current = now;
    }

    if (e.key === 'Backspace') {
      setUserInput(prev => prev.slice(0, -1));
      soundEngine.playClick('correct');
      // Backspace breaks the flow
      breakCombo();
    } else if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Tab') {
      let charToAdd = e.key;
      let charsToAppend = '';
      let isLineComplete = false;

      // Auto-Tab / Auto-Indent on Enter
      if (e.key === 'Enter') {
        const nextIndex = userInput.length;
        if (targetCode[nextIndex] === '\n') {
          charsToAppend = '\n';
          let i = nextIndex + 1;
          while (i < targetCode.length && targetCode[i] === ' ') {
            charsToAppend += ' ';
            i++;
          }
          // Removed direct state update here to avoid double update
          isLineComplete = true;
        } else {
          charToAdd = '\n';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const nextIndex = userInput.length;
        const remainingCode = targetCode.slice(nextIndex);
        let spaceCount = 0;
        while (spaceCount < remainingCode.length && remainingCode[spaceCount] === ' ') {
          spaceCount++;
        }
        if (spaceCount > 0) {
          const spacesToInsert = spaceCount >= 4 ? 4 : spaceCount;
          charToAdd = ' '.repeat(spacesToInsert);
        } else {
          charToAdd = '  ';
        }
      }

      // Check correctness
      let isCorrect = false;

      if (charsToAppend) {
        // Special case for Enter auto-indent: it matches multiple chars
        const nextIndex = userInput.length;
        const expectedStr = targetCode.slice(nextIndex, nextIndex + charsToAppend.length);
        if (charsToAppend === expectedStr) {
          isCorrect = true;
        }
      } else {
        const nextIndex = userInput.length;
        const expectedChar = targetCode.slice(nextIndex, nextIndex + charToAdd.length);
        isCorrect = charToAdd === expectedChar;
      }

      if (!isCorrect) {
        setErrors(prev => prev + 1);
        soundEngine.playClick('error');
        breakCombo();
        setErrorShake(true);
        setTimeout(() => setErrorShake(false), 200);
      } else {
        // Correct Input
        soundEngine.playClick('correct');

        setCombo(prev => {
          const newCombo = prev + 1;
          if (newCombo > maxCombo) setMaxCombo(newCombo);
          return newCombo;
        });

        // Handle "Perfect Line" Multiplier
        // If we hit Enter (or auto-indented newline) and the line was perfect
        if (isLineComplete || charToAdd === '\n') {
          if (isLinePerfect.current) {
            setMultiplier(prev => Math.min(prev + 0.5, 8.0)); // Cap at 8x
            soundEngine.playClick('combo');
          } else {
            // Line finished but wasn't perfect, reset perfect status for NEXT line
          }
          // Reset line dirty flag for the NEW line
          isLinePerfect.current = true;
        }
      }

      if (charsToAppend) {
        setUserInput(prev => prev + charsToAppend);
      } else {
        setUserInput(prev => prev + charToAdd);
      }
    }
  }, [userInput, snippet, startTime, breakCombo, maxCombo]);

  useEffect(() => {
    if (!focused) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, focused]);

  useEffect(() => {
    if (userInput.length === snippet.code.length && startTime) {
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 1000;
      const wpm = (snippet.code.length / 5) / (timeElapsed / 60);
      const accuracy = Math.max(0, 100 - ((errors / snippet.code.length) * 100));

      setTimeout(() => {
        onComplete({
          wpm,
          accuracy,
          timeElapsed: Math.round(timeElapsed),
          errors,
          totalChars: snippet.code.length,
          maxCombo: Math.max(combo, maxCombo) // Ensure current combo is captured
        });
      }, 200);
    }
  }, [userInput, snippet, startTime, errors, onComplete, combo, maxCombo]);

  // Character Rendering
  const renderCharacters = () => {
    const chars = snippet.code.split('');
    const displayChars = [...chars, ''];

    return displayChars.map((char, i) => {
      const isUserIndex = i === userInput.length;

      let className = "relative inline whitespace-pre transition-colors duration-150 ";

      if (i < userInput.length) {
        // History
        const userChar = userInput[i];
        const expected = chars[i];
        if (userChar === expected) {
          // Apply syntax color if correct
          className += syntaxMap[i];
        } else {
          className += "text-mt-error underline decoration-mt-error/50";
        }
      } else {
        // Future - Grayscale mode
        className += "text-mt-sub/40";
      }

      if (char === '\n') {
        return (
          <span
            key={i}
            ref={isUserIndex ? activeCharRef : null}
            className={`${className}`}
          >
            {'\n'}
          </span>
        );
      }

      return (
        <span
          key={i}
          ref={isUserIndex ? activeCharRef : null}
          className={className}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className={`w-full max-w-6xl relative group outline-none ${errorShake ? 'animate-shake' : ''}`} tabIndex={0}>
      {/* Focus Overlay */}
      {!focused && (
        <div className="absolute inset-0 z-50 backdrop-blur-fix flex items-center justify-center bg-mt-bg/50 transition-opacity duration-300 rounded-lg">
          <div className="flex items-center gap-2 text-mt-text bg-mt-bg p-4 rounded-lg shadow-lg border border-mt-sub/20">
            <MousePointerClick size={20} />
            <span>Click to focus</span>
          </div>
        </div>
      )}

      {/* Combo Meter HUD */}
      {focused && startTime && (
        <div className={`absolute top-0 right-0 z-30 flex flex-col items-end pointer-events-none transition-transform duration-100 pr-6 pt-4 ${comboShake ? 'translate-x-1 text-mt-error' : ''}`}>
          <div className={`flex items-center gap-2 text-4xl font-bold transition-all duration-300 ${combo > 10 ? 'text-mt-main scale-110' : 'text-mt-sub/50'}`}>
            {combo > 5 && <Zap size={28} className={`${combo > 20 ? 'animate-pulse text-mt-main' : ''}`} fill={combo > 20 ? "currentColor" : "none"} />}
            <span>{combo}</span>
          </div>
          <div className={`flex items-center gap-1 text-sm font-mono mt-1 transition-colors duration-300 ${multiplier > 1 ? 'text-mt-func' : 'text-mt-sub/30'}`}>
            <Flame size={12} className={`${multiplier > 4 ? 'animate-bounce' : ''}`} />
            <span>{multiplier.toFixed(1)}x Stream</span>
          </div>
        </div>
      )}

      {/* Top/Bottom Fade */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-mt-bg to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-mt-bg to-transparent z-10 pointer-events-none"></div>

      <div
        ref={containerRef}
        className="font-mono text-3xl md:text-4xl leading-relaxed whitespace-pre overflow-auto relative min-h-[300px] max-h-[60vh] select-none pl-8 pr-4 py-12 border-l border-mt-sub/5 scroll-smooth no-scrollbar"
        style={{ tabSize: 4, MozTabSize: 4 } as React.CSSProperties}
      >
        {/* Floating Smooth Caret */}
        <div
          className="absolute bg-mt-caret w-0.5 rounded-full pointer-events-none z-20"
          style={{
            top: caretStyle.top,
            left: caretStyle.left,
            height: caretStyle.height,
            opacity: focused ? caretStyle.opacity : 0,
            transition: 'top 0.1s ease-out, left 0.1s ease-out, height 0.1s ease-out'
          }}
        >
          <div className={`absolute -top-1 -left-0.5 w-1.5 h-[110%] bg-mt-caret/20 blur-sm rounded-full ${!startTime && 'animate-pulse'}`}></div>
        </div>

        {renderCharacters()}
      </div>

      {!startTime && userInput.length === 0 && focused && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-mt-main opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none flex items-center gap-2">
          <span className="text-sm tracking-widest uppercase text-mt-sub">Start typing...</span>
        </div>
      )}
    </div>
  );
};