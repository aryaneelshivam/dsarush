import React, { useMemo, useState } from 'react';
import { Snippet } from '../types';
import { generateSyntaxMap } from '../utils/syntaxHighlighting';
import { BookOpen, ChevronDown } from 'lucide-react';

interface CodeExplainerProps {
  snippet: Snippet;
}

export const CodeExplainer: React.FC<CodeExplainerProps> = ({ snippet }) => {
  const [expandedLines, setExpandedLines] = useState<Record<number, boolean>>({});
  const syntaxMap = useMemo(() => generateSyntaxMap(snippet.code), [snippet.code]);
  
  // Create a map of line number (1-based) to Explanation object
  const explanationMap = useMemo(() => {
    if (!snippet.explanations) return {};
    return snippet.explanations.reduce((acc, exp) => {
      acc[exp.line] = exp.text;
      return acc;
    }, {} as Record<number, string>);
  }, [snippet.explanations]);

  // Split code and syntax map into lines
  const lines = snippet.code.split('\n');
  
  // We need to slice the flat syntax map into lines to render them correctly
  let syntaxIndex = 0;
  const syntaxLines = lines.map(line => {
    const lineLen = line.length;
    // Get colors for this line. Note: syntaxMap includes newlines, so we consume +1 for \n
    const lineColors = syntaxMap.slice(syntaxIndex, syntaxIndex + lineLen);
    syntaxIndex += lineLen + 1; // +1 for the newline
    return lineColors;
  });

  const toggleLine = (lineNum: number) => {
    setExpandedLines(prev => ({
      ...prev,
      [lineNum]: !prev[lineNum]
    }));
  };

  return (
    <div className="w-full max-w-6xl mt-8 animate-fade-in text-left">
      <h3 className="text-mt-main text-lg mb-4 font-bold flex items-center gap-2">
        <BookOpen size={20} />
        <span>Code Breakdown</span>
      </h3>
      <div className="font-mono text-lg md:text-xl bg-mt-bg border-l border-mt-sub/10 pl-4 py-4 rounded-r-lg">
        {lines.map((lineContent, idx) => {
          const lineNum = idx + 1;
          const hasExplanation = !!explanationMap[lineNum];
          const isExpanded = expandedLines[lineNum];
          const lineColors = syntaxLines[idx];

          return (
            <div key={idx} className="relative group">
              <div className="flex items-start hover:bg-mt-sub/5 transition-colors rounded-r px-2 -ml-2 py-0.5">
                {/* Line Number */}
                <span className="text-mt-sub/30 text-xs w-8 pt-1.5 select-none">{lineNum}</span>
                
                {/* Code Line */}
                <div className="flex-1 whitespace-pre break-all">
                  {lineContent.split('').map((char, charIdx) => (
                    <span key={charIdx} className={lineColors[charIdx] || 'text-mt-text'}>
                      {char}
                    </span>
                  ))}
                </div>

                {/* Explanation Toggle */}
                {hasExplanation && (
                  <button 
                    onClick={() => toggleLine(lineNum)}
                    className="ml-4 p-1 rounded hover:bg-mt-sub/20 text-mt-main transition-all opacity-70 hover:opacity-100"
                    title="Explain this line"
                  >
                    <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </button>
                )}
              </div>

              {/* Expanded Explanation */}
              {hasExplanation && isExpanded && (
                <div className="ml-10 my-2 p-3 bg-mt-sub/10 rounded-md border-l-2 border-mt-main text-mt-text/90 text-sm font-sans leading-relaxed animate-fade-in">
                  {explanationMap[lineNum]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};