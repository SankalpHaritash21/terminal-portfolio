import React from "react";
import { useState } from "react";
import Terminal from "./components/Terminal";
import BootLoader from "./components/BootLoader";

function App() {
  const [isBooting, setIsBooting] = useState(true);

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  return (
    <div className="min-h-screen bg-black">
      {isBooting ? (
        <BootLoader onBootComplete={handleBootComplete} />
      ) : (
        <Terminal />
      )}
    </div>
  );
}

export default App;
