import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

const RecordNote: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="w-full max-w-6xl mx-auto border-y border-border py-16 flex flex-col items-center justify-center gap-10 min-h-[400px]">
      {/* Microphone Button */}
      <button
        onClick={toggleRecording}
        className={`
          relative z-10 p-10 rounded-full border-4 
          transition-all duration-300 ease-in-out transform
          hover:scale-110 hover:shadow-xl
          ${
            isRecording
              ? "bg-red-50 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
              : "bg-primary-bg border-primary-text text-primary-text hover:border-blue-400 hover:text-blue-500"
          }
        `}
        aria-label="Toggle recording"
      >
        <FaMicrophone size={64} />
      </button>

      {/* Recording Animation (Sound Wave) */}
      <div
        className={`h-12 flex items-center justify-center gap-2 transition-opacity duration-300 ${
          isRecording ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-2 bg-primary-text rounded-full animate-sound-wave"></div>
        <div className="w-2 bg-primary-text rounded-full animate-sound-wave animation-delay-100"></div>
        <div className="w-2 bg-primary-text rounded-full animate-sound-wave animation-delay-200"></div>
        <div className="w-2 bg-primary-text rounded-full animate-sound-wave animation-delay-300"></div>
        <div className="w-2 bg-primary-text rounded-full animate-sound-wave animation-delay-400"></div>
        <div className="w-2 bg-primary-text rounded-full animate-sound-wave animation-delay-200"></div>
        <div className="w-2 bg-primary-text rounded-full animate-sound-wave animation-delay-100"></div>
        <div className="w-2 bg-primary-text rounded-full animate-sound-wave"></div>
      </div>

      {/* Status Text */}
      <p
        className={`text-lg font-medium transition-colors duration-300 ${
          isRecording ? "text-red-500 animate-pulse" : "text-secondary-text"
        }`}
      >
        {isRecording ? "Recording..." : "Click microphone to start"}
      </p>
    </div>
  );
};

export default RecordNote;
