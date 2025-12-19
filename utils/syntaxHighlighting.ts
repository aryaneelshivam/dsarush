// Regex Tokenizer for C++ and Java Syntax Highlighting
export const generateSyntaxMap = (code: string): string[] => {
  const map = new Array(code.length).fill('text-mt-text'); // Default color

  const applyColor = (regex: RegExp, colorClass: string) => {
    let match;
    // Reset lastIndex for global regex
    regex.lastIndex = 0;
    while ((match = regex.exec(code)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      for (let i = start; i < end; i++) {
        map[i] = colorClass;
      }
    }
  };

  // Keywords (C++ and Java combined)
  const keywords = /\b(int|void|char|bool|boolean|byte|short|long|float|double|unsigned|signed|struct|class|interface|enum|if|else|while|do|for|return|break|continue|switch|case|default|goto|try|catch|throw|throws|finally|new|delete|public|private|protected|static|final|const|volatile|virtual|abstract|native|synchronized|transient|friend|this|super|sizeof|true|false|null|nullptr|auto|namespace|package|import|using|template|typename|extends|implements)\b/g;
  applyColor(keywords, 'text-mt-kwd');

  // Types (Common STL, Java Collections, & Data Structures)
  const types = /\b(Node|TreeNode|ListNode|TrieNode|vector|string|String|map|set|unordered_map|unordered_set|queue|stack|deque|priority_queue|pair|list|List|ArrayList|LinkedList|HashMap|HashSet|System|Integer|Character|Boolean)\b/g;
  applyColor(types, 'text-mt-type');

  // Numbers
  const numbers = /\b\d+(\.\d+)?\b/g;
  applyColor(numbers, 'text-mt-val');

  // Functions (Identifier followed by '(')
  const functions = /\b[a-zA-Z_]\w*(?=\()/g;
  applyColor(functions, 'text-mt-func');

  // Strings (Double quotes)
  const strings = /"([^"\\]*(\\.[^"\\]*)*)"/g;
  applyColor(strings, 'text-mt-str');

  // Comments (Single line)
  const comments = /\/\/.*/g;
  applyColor(comments, 'text-mt-sub italic');

  return map;
};