# DSArush ⚡

Master Data Structures and Algorithms with speed and precision. **DSArush** is a Monkeytype-inspired speed-typing practice tool specifically designed for developers to internalize DSA patterns and syntax. Try it live at [dsarush.vercel.app](https://dsarush.vercel.app).

![DSArush Hero](index.html) <!-- Placeholder for a real screenshot if available -->

## 🚀 Overview

DSArush helps you build muscle memory for common algorithmic patterns across multiple programming languages. Whether you're preparing for technical interviews or just want to sharpen your coding speed, DSArush provides a curated library of snippets to practice.

## ✨ Key Features

-   **🎯 DSA Master Library:** Wide range of topics including Arrays, Linked Lists, BST, Stacks, Queues, Graphs, and Sorting algorithms.
-   **🌐 Multi-Language Support:** Practice in **C++**, **Java**, or **Python**.
-   **📊 Real-time Analytics:** Track your WPM (Words Per Minute), Accuracy, Time Elapsed, and Max Combo.
-   **⚡ Difficulty Levels:** Choose from Easy, Medium, and Hard snippets to match your skill level.
-   **🎹 Developer-Focused UI:** Minimalistic, keyboard-centric interface with syntax highlighting and automatic indentation support.
-   **📖 Contextual Explanations:** Many snippets include line-by-line explanations to help you understand the *why* behind the *how*.

## 🛠️ Tech Stack

-   **Framework:** [React 19](https://react.dev/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Icons:** [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```text
dsarush/
├── src/
│   ├── components/       # UI Components (TypingArea, SettingsBar, etc.)
│   ├── services/         # Logic for snippet generation (Gemini integration ready)
│   ├── constants.ts      # Static snippet library and topic list
│   ├── types.ts          # TypeScript interfaces/enums
│   ├── utils/            # Helper functions (Syntax highlighting, etc.)
│   └── App.tsx           # Main application shell
├── index.tsx             # Entry point
└── index.html            # App template and Tailwind configuration
```

## ⚙️ Setup & Installation

Follow these steps to run DSArush locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aryaneelshivam/dsarush.git
    cd dsarush
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Navigate to `http://localhost:5173`.

## 🛠️ Customization

### Adding New Snippets
You can easily extend the snippet library by modifying `src/constants.ts`. Add a new object to the `DEFAULT_SNIPPETS` array:

```typescript
{
  id: 'unique-id',
  topic: 'Array',
  title: 'My Custom Pattern',
  difficulty: Difficulty.MEDIUM,
  language: 'cpp',
  code: `// Your code here`,
  explanations: [
    { line: 1, text: "Wait, what's this?" }
  ]
}
```

## 🎨 Design Inspiration

DSArush's minimalistic aesthetic and "type-what-you-see" core loop are heavily inspired by [Monkeytype](https://monkeytype.com/).

---
*Made with ☕️ by [Aryaneel Shivam](https://www.linkedin.com/in/aryaneelshivam/)*
