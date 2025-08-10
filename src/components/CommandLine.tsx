import React, { useState, useRef, useEffect, KeyboardEvent } from "react";

interface CommandLineProps {
  onCommand: (command: string) => Promise<void>;
  commandHistory: string[];
  isProcessing: boolean;
}

const CommandLine: React.FC<CommandLineProps> = ({
  onCommand,
  commandHistory,
  isProcessing,
}) => {
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current && !isProcessing) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        onCommand(input.trim());
        setInput("");
        setHistoryIndex(-1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple command completion
      const commands = [
        "help",
        "about",
        "skills",
        "projects",
        "experience",
        "resume",
        "socials",
        "ask",
        "joke",
        "inspire",
        "clear",
      ];
      const matches = commands.filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0] + " ");
      }
    }
  };

  return (
    <div className="flex items-center mt-4">
      <span className="text-green-400 mr-2 select-none">$</span>
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          className="bg-transparent border-none outline-none text-green-400 font-mono text-sm w-full caret-transparent"
          style={{ caretColor: "transparent" }}
          autoComplete="off"
          spellCheck="false"
        />
        <span
          className={`absolute top-0 left-0 pointer-events-none font-mono text-sm ${
            showCursor && !isProcessing ? "text-green-400" : "text-transparent"
          }`}
          style={{
            left: `${input.length * 0.6}em`,
            animation: showCursor ? "none" : "blink 1s infinite",
          }}
        >
          █
        </span>
      </div>
      {isProcessing && (
        <span className="text-yellow-400 ml-2 animate-pulse">
          Processing...
        </span>
      )}
    </div>
  );
};

export default CommandLine;
