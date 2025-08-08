import React, { useState, useEffect, useRef, useCallback } from 'react';
import { OutputLine as OutputLineType } from '../types';
import CommandLine from './CommandLine';
import OutputLine from './OutputLine';
import { commandProcessor } from '../utils/commandProcessor';

const Terminal: React.FC = () => {
  const [output, setOutput] = useState<OutputLineType[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [output, scrollToBottom]);

  useEffect(() => {
    // Load command history from localStorage
    const savedHistory = localStorage.getItem('terminal-history');
    if (savedHistory) {
      setCommandHistory(JSON.parse(savedHistory));
    }

    // Display welcome message
    const welcomeOutput: OutputLineType[] = [
      {
        id: 'welcome-1',
        content: '████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗',
        type: 'output',
        timestamp: new Date()
      },
      {
        id: 'welcome-2',
        content: '╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║',
        type: 'output',
        timestamp: new Date()
      },
      {
        id: 'welcome-3',
        content: '   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║',
        type: 'output',
        timestamp: new Date()
      },
      {
        id: 'welcome-4',
        content: '   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║',
        type: 'output',
        timestamp: new Date()
      },
      {
        id: 'welcome-5',
        content: '   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗',
        type: 'output',
        timestamp: new Date()
      },
      {
        id: 'welcome-6',
        content: '   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝',
        type: 'output',
        timestamp: new Date()
      },
      {
        id: 'welcome-7',
        content: '',
        type: 'output',
        timestamp: new Date()
      },
      {
        id: 'welcome-8',
        content: `Welcome to Sankalp's Terminal Portfolio v2.1.0`,
        type: 'output',
        timestamp: new Date()
      },
      {
        id: 'welcome-9',
        content: 'Type "help" to see available commands or "about" to learn more about me.',
        type: 'output',
        timestamp: new Date()
      },
      {
        id: 'welcome-10',
        content: 'Try "ask <question>" to chat with my AI assistant!',
        type: 'output',
        timestamp: new Date()
      },
      {
        id: 'welcome-11',
        content: '',
        type: 'output',
        timestamp: new Date()
      }
    ];

    setOutput(welcomeOutput);
  }, []);

  const handleCommand = async (commandText: string) => {
    if (!commandText.trim()) return;

    setIsProcessing(true);

    // Add command to output
    const commandOutput: OutputLineType = {
      id: `cmd-${Date.now()}`,
      content: `$ ${commandText}`,
      type: 'command',
      timestamp: new Date()
    };

    setOutput(prev => [...prev, commandOutput]);

    // Update command history
    const updatedHistory = [...commandHistory, commandText];
    setCommandHistory(updatedHistory);
    localStorage.setItem('terminal-history', JSON.stringify(updatedHistory.slice(-50)));

    try {
      // Process command
      const result = await commandProcessor.processCommand(commandText);
      
      const responseOutput: OutputLineType = {
        id: `res-${Date.now()}`,
        content: result.content,
        type: result.type,
        timestamp: new Date()
      };

      setOutput(prev => [...prev, responseOutput]);
    } catch (error) {
      const errorOutput: OutputLineType = {
        id: `err-${Date.now()}`,
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        type: 'error',
        timestamp: new Date()
      };

      setOutput(prev => [...prev, errorOutput]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setOutput([]);
  };

  return (
    <div 
      ref={terminalRef}
      className="min-h-screen bg-black text-green-400 font-mono text-sm overflow-hidden"
      onClick={() => {
        // Focus on command input when terminal is clicked
        const commandInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (commandInput) {
          commandInput.focus();
        }
      }}
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 text-gray-300 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="ml-4 text-sm">sankalp@portfolio:~$</span>
        </div>
        <div className="text-xs text-gray-500">Terminal v2.1.0</div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-[calc(100vh-60px)] overflow-y-auto">
        {/* Output */}
        <div className="space-y-1">
          {output.map((line) => (
            <OutputLine key={line.id} line={line} onClear={handleClear} />
          ))}
        </div>

        {/* Command Input */}
        <CommandLine
          onCommand={handleCommand}
          commandHistory={commandHistory}
          isProcessing={isProcessing}
        />

        <div ref={outputEndRef} />
      </div>
    </div>
  );
};

export default Terminal;