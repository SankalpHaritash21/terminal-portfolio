import React, { useState, useEffect } from "react";

interface BootLoaderProps {
  onBootComplete: () => void;
}

const BootLoader: React.FC<BootLoaderProps> = ({ onBootComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState("");

  const bootSteps = [
    "BIOS Version 2.1.0",
    "CPU: Intel Core i7-12700K @ 3.60GHz",
    "Memory Test: 32768MB OK",
    "Initializing Portfolio System...",
    "Loading AI Assistant...",
    "Mounting Terminal Interface...",
    "Boot Complete!",
  ];

  useEffect(() => {
    // Animate dots
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 2000);

    // Progress through boot steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < bootSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 150);

    // Complete boot after 1 second
    const bootTimer = setTimeout(() => {
      onBootComplete();
    }, 1000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(stepInterval);
      clearTimeout(bootTimer);
    };
  }, [onBootComplete]);

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono flex flex-col justify-center items-start p-8 z-50">
      {/* BIOS Header */}
      <div className="w-full max-w-4xl">
        <div className="border-b border-green-400 pb-2 mb-4">
          <h1 className="text-xl font-bold">PORTFOLIO BIOS v2.1.0</h1>
          <p className="text-sm text-green-300">
            Copyright (C) 2025 JupiterCodes Systems Inc.
          </p>
        </div>

        {/* ASCII Art */}
        <div className="mb-6 text-xs leading-tight">
          <pre className="text-green-300">
            {`    ____             __  ____      ___    
   / __ \\____  _____/ /_/ __/___  / (_)___
  / /_/ / __ \\/ ___/ __/ /_/ __ \\/ / / __ \\
 / ____/ /_/ / /  / /_/ __/ /_/ / / / /_/ /
/_/    \\____/_/   \\__/_/  \\____/_/_/\\____/ 
                                          `}
          </pre>
        </div>

        {/* Boot Steps */}
        <div className="space-y-1 text-sm">
          {bootSteps.slice(0, currentStep + 1).map((step, index) => (
            <div key={index} className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>{step}</span>
              {index === currentStep && index < bootSteps.length - 1 && (
                <span className="ml-2 text-yellow-400">{dots}</span>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 w-full">
          <div className="flex items-center text-sm mb-2">
            <span>Loading</span>
            <span className="ml-2 text-yellow-400">{dots}</span>
          </div>
          <div className="w-full bg-gray-800 h-2 border border-green-400">
            <div
              className="bg-green-400 h-full transition-all duration-150 ease-out"
              style={{
                width: `${((currentStep + 1) / bootSteps.length) * 100}%`,
              }}
            />
          </div>
          <div className="text-xs text-green-300 mt-1">
            {Math.round(((currentStep + 1) / bootSteps.length) * 100)}% Complete
          </div>
        </div>

        {/* System Info */}
        <div className="mt-8 text-xs text-green-300 space-y-1">
          <div>
            System Ready: {currentStep >= bootSteps.length - 1 ? "YES" : "NO"}
          </div>
          <div>AI Assistant: {currentStep >= 4 ? "ONLINE" : "OFFLINE"}</div>
          <div>Terminal: {currentStep >= 5 ? "READY" : "LOADING"}</div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-8 right-8 text-xs text-green-300">
          <div className="flex justify-between">
            <span>Press any key to continue...</span>
            <span>Portfolio OS v2.1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootLoader;
