
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';

interface JournalEntryProps {
  apiKey: string;
  onSave?: (entry: string, summary: string) => void;
}

export function JournalEntry({ apiKey, onSave }: JournalEntryProps) {
  const [entry, setEntry] = useState('');
  const [summary, setSummary] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const analyzeEntry = async () => {
    if (!entry.trim() || isAnalyzing) return;
    
    setIsAnalyzing(true);
    setSummary('');
    
    try {
      // Call OpenAI API to analyze journal entry
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a supportive, empathetic AI assistant specializing in mental health. Analyze the journal entry and provide a brief, insightful summary (max 3 sentences) highlighting key emotions, patterns, and offering gentle perspective. Be warm and supportive.'
            },
            {
              role: 'user',
              content: `My journal entry: ${entry}`
            }
          ],
          max_tokens: 150
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze journal entry');
      }

      const data = await response.json();
      const analyzedSummary = data.choices[0]?.message?.content || "Couldn't generate a summary. Please try again.";
      
      setSummary(analyzedSummary);
    } catch (error) {
      console.error('Error analyzing journal entry:', error);
      setSummary("I couldn't analyze your entry right now. Please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveEntry = () => {
    setIsSaving(true);
    
    // In a real app, you would save to a database
    // For this demo, we'll just simulate saving
    setTimeout(() => {
      if (onSave) {
        onSave(entry, summary);
      }
      
      // Clear the form
      setEntry('');
      setSummary('');
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="mental-card animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-mentalPurple-700 mb-2">
          Journal Your Thoughts
        </h2>
        <p className="text-gray-600">
          Write freely. I'll help you understand your emotions.
        </p>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="journal-entry" className="text-sm font-medium text-gray-700">
            Today's Entry
          </label>
          <span className="text-sm text-gray-500 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date().toLocaleDateString()}
          </span>
        </div>
        <Textarea
          id="journal-entry"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="How are you feeling today? What's on your mind?"
          className="mental-input h-40 resize-none"
        />
      </div>

      <div className="flex justify-end mb-6">
        <Button
          onClick={analyzeEntry}
          disabled={!entry.trim() || isAnalyzing}
          variant="outline"
          className="border-mentalPurple-300 text-mentalPurple-700 hover:bg-mentalPurple-50"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze My Feelings"}
        </Button>
      </div>

      {summary && (
        <div className="mb-6 p-4 bg-mentalPeach-100 rounded-xl animate-fade-in">
          <h3 className="font-medium text-mentalPurple-700 mb-2">AI Insights</h3>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={saveEntry}
          disabled={!entry.trim() || isSaving}
          className="mental-button"
        >
          {isSaving ? "Saving..." : "Save Journal Entry"}
        </Button>
      </div>
    </div>
  );
}
