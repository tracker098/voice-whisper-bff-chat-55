
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useConversation } from '@11labs/react';
import { useToast } from '@/hooks/use-toast';

interface VoiceCompanionProps {
  apiKey: string;
}

export function VoiceCompanion({ apiKey }: VoiceCompanionProps) {
  const [isListening, setIsListening] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to voice agent");
      setError(null);
      toast({
        title: "Connected",
        description: "Voice companion is now active",
      });
    },
    onDisconnect: () => {
      console.log("Disconnected from voice agent");
      setIsListening(false);
      toast({
        title: "Disconnected",
        description: "Voice companion session ended",
      });
    },
    onMessage: (message) => {
      console.log("Received message:", message);
      if (message && typeof message === 'object') {
        if ('message' in message) {
          setLastMessage(message.message as string);
        } else if ('text' in message) {
          setLastMessage(message.text as string);
        } else if ('transcript' in message) {
          // Handle transcript messages (what the user said)
          console.log("User transcript:", message.transcript);
        }
      }
    },
    onError: (err) => {
      console.error("Voice agent error:", err);
      setError("An error occurred connecting to the voice agent");
      setIsListening(false);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Could not connect to voice service",
      });
    }
  });

  const { status, isSpeaking } = conversation;

  useEffect(() => {
    // If API key changes and we're listening, restart the session
    if (apiKey && isListening) {
      handleToggleListening();
    }
  }, [apiKey]);

  const handleToggleListening = async () => {
    try {
      if (!apiKey) {
        setError("Please set your ElevenLabs API key in settings");
        toast({
          variant: "destructive",
          title: "Missing API Key",
          description: "ElevenLabs API key is required for voice features",
        });
        return;
      }

      if (!isListening) {
        // Request microphone access
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        console.log("Starting conversation with ElevenLabs");
        
        // Initialize session with key from props
        await conversation.startSession({ 
          agentId: "default",
          apiKey: apiKey,
          connectionConfig: {
            // To avoid CORS issues, use ElevenLabs API directly
            wsUrl: "wss://api.elevenlabs.io/v1/convai/websocket",
          }
        });
        
        setIsListening(true);
      } else {
        console.log("Ending conversation");
        await conversation.endSession();
        setIsListening(false);
      }
    } catch (err) {
      console.error("Microphone/connection error:", err);
      
      if (err instanceof Error) {
        setError(`Error: ${err.message}`);
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: err.message,
        });
      } else {
        setError("Please allow microphone access to use the voice companion");
        toast({
          variant: "destructive",
          title: "Microphone Access",
          description: "Please allow microphone access to use voice features",
        });
      }
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
          <p className="text-xs text-gray-400 mt-1">
            {status === "connected" ? "Connected" : "Disconnected"}
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
