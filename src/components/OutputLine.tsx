import React, { useEffect, useState } from 'react';
import { OutputLine as OutputLineType } from '../types';

interface OutputLineProps {
  line: OutputLineType;
  onClear?: () => void;
}

const OutputLine: React.FC<OutputLineProps> = ({ line, onClear }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (line.type === 'ai' && typeof line.content === 'string') {
      // Typing effect for AI responses
      let i = 0;
      const text = line.content;
      setShowCursor(true);
      
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          setShowCursor(false);
          clearInterval(timer);
        }
      }, 20);

      return () => clearInterval(timer);
    } else {
      setDisplayText(typeof line.content === 'string' ? line.content : '');
      setShowCursor(false);
    }
  }, [line.content, line.type]);

  const getLineColor = () => {
    switch (line.type) {
      case 'command':
        return 'text-cyan-300';
      case 'error':
        return 'text-red-400';
      case 'ai':
        return 'text-yellow-300';
      default:
        return 'text-green-400';
    }
  };

  const handleSpecialCommand = (content: string) => {
    if (content === 'CLEAR_COMMAND' && onClear) {
      onClear();
      return true;
    }
    return false;
  };

  // Handle special commands
  if (typeof line.content === 'string' && handleSpecialCommand(line.content)) {
    return null;
  }

  return (
    <div className={`${getLineColor()} whitespace-pre-wrap break-words leading-relaxed`}>
      {line.type === 'ai' && typeof line.content === 'string' ? (
        <>
          {displayText}
          {showCursor && <span className="animate-pulse">█</span>}
        </>
      ) : (
        line.content
      )}
    </div>
  );
};

export default OutputLine;