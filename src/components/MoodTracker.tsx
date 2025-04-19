
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Mood {
  emoji: string;
  label: string;
  color: string;
}

const moods: Mood[] = [
  { emoji: '😢', label: 'Sad', color: 'bg-blue-100 border-blue-300 text-blue-700' },
  { emoji: '😔', label: 'Down', color: 'bg-indigo-100 border-indigo-300 text-indigo-700' },
  { emoji: '😐', label: 'Neutral', color: 'bg-gray-100 border-gray-300 text-gray-700' },
  { emoji: '🙂', label: 'Good', color: 'bg-mentalPurple-100 border-mentalPurple-300 text-mentalPurple-700' },
  { emoji: '😁', label: 'Great', color: 'bg-mentalPeach-100 border-mentalPeach-300 text-mentalPeach-700' },
];

// For the weekly chart
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock data for weekly mood visualization
  // In a real app, this would come from a database
  const [weeklyMoods] = useState([
    { day: 'Mon', moodIndex: 3 }, // Good
    { day: 'Tue', moodIndex: 4 }, // Great
    { day: 'Wed', moodIndex: 1 }, // Down
    { day: 'Thu', moodIndex: 3 }, // Good
    { day: 'Fri', moodIndex: 2 }, // Neutral
    { day: 'Sat', moodIndex: null }, // Not recorded yet
    { day: 'Sun', moodIndex: null }, // Not recorded yet
  ]);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    
    // In a real app, you would save to a database
    // For this demo, we'll just simulate saving
    setTimeout(() => {
      // Update the UI to show successful save
      setIsSubmitting(false);
      setSelectedMood(null);
      
      // In a real app, you would update the weekly moods data
    }, 1000);
  };

  return (
    <div className="mental-card animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-mentalPurple-700 mb-2">
          Track Your Mood
        </h2>
        <p className="text-gray-600">
          How are you feeling today?
        </p>
      </div>
      
      <div className="flex justify-between mb-8">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => handleMoodSelect(mood)}
            className={cn(
              "flex flex-col items-center p-3 rounded-lg border-2 transition-all hover-scale",
              selectedMood?.label === mood.label
                ? `${mood.color} border-opacity-100`
                : "border-gray-200 bg-white border-opacity-50"
            )}
          >
            <span className="text-3xl mb-2">{mood.emoji}</span>
            <span className="text-xs font-medium">{mood.label}</span>
          </button>
        ))}
      </div>
      
      <div className="flex justify-center mb-8">
        <Button
          onClick={handleSubmit}
          disabled={!selectedMood || isSubmitting}
          className="mental-button"
        >
          {isSubmitting ? "Saving..." : "Save Today's Mood"}
        </Button>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium text-mentalPurple-700 mb-4 text-center">
          Your Week So Far
        </h3>
        
        <div className="flex justify-between h-32 items-end">
          {weeklyMoods.map((day, index) => (
            <div key={day.day} className="flex flex-col items-center">
              {day.moodIndex !== null ? (
                <div 
                  className={cn(
                    "w-8 rounded-t-lg transition-all",
                    moods[day.moodIndex].color,
                    `h-${(day.moodIndex + 1) * 5}`,
                    "h-" + ((day.moodIndex + 1) * 6).toString()
                  )}
                  style={{ height: `${(day.moodIndex + 1) * 20}%` }}
                >
                  <div className="flex justify-center -mt-8">
                    <span className="text-xl">{moods[day.moodIndex].emoji}</span>
                  </div>
                </div>
              ) : (
                <div className="w-8 h-6 rounded-t-lg bg-gray-100"></div>
              )}
              <span className="text-xs mt-2 text-gray-600">{day.day}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        <p>Tracking your mood helps build self-awareness</p>
      </div>
    </div>
  );
}
