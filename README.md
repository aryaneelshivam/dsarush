# DSArush ⚡

![DSArush](https://img.shields.io/badge/dsarush.com-live-e2b714?style=for-the-badge&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

> Master Data Structures & Algorithms with speed and precision.

**DSArush** is a [Monkeytype](https://monkeytype.com/)-inspired speed-typing practice tool designed specifically for developers to build muscle memory around DSA patterns and syntax. Try it live at **[dsarush.com](https://dsarush.com)**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **DSA Snippet Library** | Arrays, Linked Lists, BST, Stacks, Queues, Graphs, Heaps, Sorting, Hash Maps, and more |
| 🌐 **Multi-Language** | Practice in **C++**, **Java**, or **Python** |
| 🎮 **Two Game Modes** | Classic **Typing** mode and **Jumbled** mode (reorder shuffled code blocks) |
| 📊 **Real-time Analytics** | Live WPM, Accuracy, Combo & Time tracking with detailed end-of-session stats |
| ⚡ **Difficulty Levels** | Easy, Medium, and Hard snippets to match your skill level |
| 🎨 **Multiple Themes** | Monodark, Carbon, Nord, Midnight, Serika Dark |
| 🔊 **Sound Engine** | Satisfying keypress audio with toggleable sound effects |
| 📖 **Code Explanations** | Line-by-line explanations for in-depth understanding |
| 📈 **Session History** | Track your progress over time with persistent local storage |
| ⌨️ **Keyboard-Centric** | Distraction-free, keyboard-first interface with smart indent support |

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Drag & Drop:** [@dnd-kit](https://dndkit.com/) (for Jumbled mode)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)

---

## 📂 Project Structure

```text
dsarush/
├── components/
│   ├── TypingArea.tsx       # Core typing engine with real-time feedback
│   ├── JumbledArea.tsx      # Drag-and-drop code block reordering mode
│   ├── TypingStats.tsx      # End-of-session results & history panel
│   ├── SettingsBar.tsx      # Topic/difficulty/language/mode controls
│   └── CodeExplainer.tsx    # Line-by-line code explanation viewer
├── services/
│   ├── geminiService.ts     # Snippet fetching & generation logic
│   ├── storageService.ts    # localStorage session persistence
│   └── soundEngine.ts       # Audio feedback system
├── utils/
│   └── syntaxHighlighter.ts # Token-based syntax highlighting engine
├── constants.ts             # Full curated DSA snippet library
├── types.ts                 # TypeScript interfaces and enums
├── App.tsx                  # Main application shell
├── index.tsx                # React entry point
└── index.html               # App template, Tailwind config & SEO meta
```

---

## ⚙️ Setup & Installation

```bash
# 1. Clone the repository
git clone https://github.com/aryaneelshivam/dsarush.git
cd dsarush

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎮 How to Use

1. **Pick a Topic** — select from the sidebar (Arrays, Graphs, BST, etc.)
2. **Choose a Mode** — `Typing` to transcribe code or `Jumbled` to reorder shuffled blocks
3. **Select Difficulty & Language** — Easy / Medium / Hard in C++, Java, or Python
4. **Start Typing** — real-time highlighting shows correct (gold) vs. error (red) characters
5. **Press `Esc`** at any time to load a new snippet
6. **Review Stats** — see WPM, accuracy, and compare with your session history

---

## 🧩 Extending the Snippet Library

You can add new snippets by appending to the `DEFAULT_SNIPPETS` array in `constants.ts`:

```typescript
{
  id: 'unique-id',
  topic: 'Graph',
  title: 'BFS Traversal',
  difficulty: Difficulty.MEDIUM,
  language: 'cpp',
  code: `// Your code here`,
  explanations: [
    { line: 1, text: "Start BFS from source node" }
  ]
}
```

---

## 🎨 Design Inspiration

DSArush's minimalistic aesthetic and "type-what-you-see" core loop are heavily inspired by [Monkeytype](https://monkeytype.com/).

---

*Made with ☕️ by [Aryaneel Shivam](https://www.linkedin.com/in/aryaneelshivam/)*
