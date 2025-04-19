
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useConversation } from '@11labs/react';

interface VoiceCompanionProps {
  apiKey: string;
}

export function VoiceCompanion({ apiKey }: VoiceCompanionProps) {
  const [isListening, setIsListening] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  // Note: In a production app, you would want to securely store/retrieve this key
  // For demo purposes, we're passing it as a prop
  
  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to voice agent");
      setError(null);
    },
    onDisconnect: () => {
      console.log("Disconnected from voice agent");
      setIsListening(false);
    },
    onMessage: (message) => {
      // The message structure depends on the specific implementation
      // Adjust according to actual message structure
      if (message && typeof message === 'object' && 'message' in message) {
        setLastMessage(message.message);
      }
    },
    onError: (err) => {
      console.error("Voice agent error:", err);
      setError("An error occurred connecting to the voice agent");
      setIsListening(false);
    }
  });

  const { status, isSpeaking } = conversation;

  const handleToggleListening = async () => {
    try {
      if (!isListening) {
        // Request microphone access
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Start conversation with ElevenLabs
        // Note: This is a simplified example, actual implementation might differ
        await conversation.startSession({ 
          agentId: "default" // Replace with your actual agent ID
          // Use origin instead of direct URL for ElevenLabs API
          // The API key would be handled through authorization parameter or server-side
        });
        
        setIsListening(true);
      } else {
        await conversation.endSession();
        setIsListening(false);
      }
    } catch (err) {
      console.error("Microphone access error:", err);
      setError("Please allow microphone access to use the voice companion");
    }
  };

  return (
    <div className="mental-card mb-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-mentalPurple-700 mb-2">
          Voice Companion
        </h2>
        <p className="text-gray-600">
          Talk with your AI companion. I'm here to listen and support you.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col items-center">
        <div className={`relative w-32 h-32 rounded-full flex items-center justify-center mb-4 ${isListening ? 'bg-mentalPurple-100' : 'bg-gray-100'}`}>
          <div className={`absolute inset-0 rounded-full ${isListening ? 'animate-pulse bg-mentalPurple-200 opacity-50' : ''}`}></div>
          <Button
            onClick={handleToggleListening}
            variant="ghost"
            size="icon"
            className={`w-24 h-24 rounded-full ${isListening ? 'bg-mentalPurple-500 text-white hover:bg-mentalPurple-600' : 'bg-white text-mentalPurple-500 hover:bg-gray-100'}`}
          >
            {isListening ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {isListening 
              ? (isSpeaking 
                ? "I'm speaking..." 
                : "I'm listening...") 
              : "Tap to start talking"
            }
          </p>
        </div>
      </div>

      {lastMessage && (
        <div className="mt-6 p-4 bg-mentalPurple-50 rounded-xl">
          <p className="text-gray-700">{lastMessage}</p>
        </div>
      )}
      
      <div className="mt-6 text-xs text-gray-400 text-center">
        <p>Powered by ElevenLabs Voice Technology</p>
      </div>
    </div>
  );
}
