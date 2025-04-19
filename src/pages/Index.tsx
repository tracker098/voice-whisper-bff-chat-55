
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { VoiceCompanion } from "@/components/VoiceCompanion";
import { MemoryChat } from "@/components/MemoryChat";
import { JournalEntry } from "@/components/JournalEntry";
import { MoodTracker } from "@/components/MoodTracker";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Brain, Activity, Calendar } from "lucide-react";

interface ApiKeys {
  openai: string;
  elevenlabs: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("talk");
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    openai: "",
    elevenlabs: ""
  });

  // Load API keys from localStorage on mount
  useEffect(() => {
    try {
      const savedKeys = localStorage.getItem("mindBFF_api_keys");
      if (savedKeys) {
        setApiKeys(JSON.parse(savedKeys));
      }
    } catch (error) {
      console.error("Error loading API keys:", error);
    }
  }, []);

  // Save API keys to localStorage
  const handleSaveKeys = (keys: ApiKeys) => {
    setApiKeys(keys);
    localStorage.setItem("mindBFF_api_keys", JSON.stringify(keys));
  };

  // A quirky, randomly selected positive affirmation that changes daily
  const getQuirkyAffirmation = () => {
    const affirmations = [
      "Your brain is a beautiful galaxy of potential - and you're the astronaut!",
      "Like a potato, you might be dirty on the outside but golden when opened up.",
      "If life throws lemons, remember you can make... a lemon battery for science!",
      "Your mind is like a garden where intrusive thoughts are just weeds - pull 'em out!",
      "You're not a mess, you're a complex algorithm processing in real-time.",
      "Your feelings are valid, even the one where you want to hug your pillow forever.",
      "Remember: Even the mightiest oak was once a little nut that held its ground.",
      "Your anxiety is just excitement in disguise - you're a thrilling adventure!",
      "When you feel lost, remember that all explorers felt the same before great discoveries!",
      "Mental health days are like system updates - sometimes you need to restart.",
      "You're not overthinking, you're just beta-testing multiple life scenarios.",
      "Bad days are just plot twists in your character development arc."
    ];
    
    // Get a seed based on the day so it changes daily but remains consistent within the day
    const today = new Date().toDateString();
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
      seed += today.charCodeAt(i);
    }
    
    return affirmations[seed % affirmations.length];
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-medium text-mentalPurple-700">
          Welcome to your mind sanctuary
        </h2>
        <ApiKeyInput onSaveKeys={handleSaveKeys} initialKeys={apiKeys} />
      </div>

      <div className="mental-card p-4 mb-8 bg-gradient-to-r from-mentalPurple-100 to-mentalBlue-100">
        <p className="italic text-mentalPurple-700 text-center">
          "{getQuirkyAffirmation()}"
        </p>
      </div>

      <Tabs defaultValue="talk" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="talk" className="flex flex-col items-center py-3 gap-1">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">Talk</span>
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex flex-col items-center py-3 gap-1">
            <Brain className="h-5 w-5" />
            <span className="text-xs">Journal</span>
          </TabsTrigger>
          <TabsTrigger value="mood" className="flex flex-col items-center py-3 gap-1">
            <Activity className="h-5 w-5" />
            <span className="text-xs">Mood</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex flex-col items-center py-3 gap-1">
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Progress</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="talk" className="animate-fade-in">
          <div className="grid grid-cols-1 gap-6">
            <VoiceCompanion apiKey={apiKeys.elevenlabs} />
            <MemoryChat apiKey={apiKeys.openai} />
          </div>
        </TabsContent>

        <TabsContent value="journal" className="animate-fade-in">
          <JournalEntry apiKey={apiKeys.openai} />
        </TabsContent>

        <TabsContent value="mood" className="animate-fade-in">
          <MoodTracker />
        </TabsContent>

        <TabsContent value="progress" className="animate-fade-in">
          <div className="mental-card text-center py-12">
            <h3 className="text-xl font-bold text-mentalPurple-700 mb-4">
              Your Progress Report
            </h3>
            <p className="text-gray-600 mb-8">
              Track your mental health journey and see your progress over time.
            </p>
            <div className="bg-mentalPurple-100 p-6 rounded-xl max-w-md mx-auto">
              <p className="text-mentalPurple-700">
                Keep using mindBFF daily to unlock your personalized reports and insights!
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Index;
