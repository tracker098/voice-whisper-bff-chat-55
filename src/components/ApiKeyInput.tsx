
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';

interface ApiKeyInputProps {
  onSaveKeys: (keys: { openai: string; elevenlabs: string }) => void;
  initialKeys?: { openai: string; elevenlabs: string };
}

export function ApiKeyInput({ onSaveKeys, initialKeys }: ApiKeyInputProps) {
  const [openaiKey, setOpenaiKey] = useState(initialKeys?.openai || '');
  const [elevenlabsKey, setElevenlabsKey] = useState(initialKeys?.elevenlabs || '');
  const [isOpen, setIsOpen] = useState(false);

  // If no keys are set, automatically open the dialog
  useEffect(() => {
    if (!initialKeys?.openai || !initialKeys?.elevenlabs) {
      setIsOpen(true);
    }
  }, [initialKeys]);

  const handleSave = () => {
    onSaveKeys({
      openai: openaiKey,
      elevenlabs: elevenlabsKey
    });
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm">
          API Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configure API Keys</DialogTitle>
          <DialogDescription>
            Your keys are stored locally on your device and are never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="openai-key" className="text-sm font-medium">
              OpenAI API Key
            </label>
            <Input
              id="openai-key"
              type="password"
              placeholder="sk-..."
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="mental-input"
            />
            <p className="text-xs text-gray-500">
              Used for the chat and journal analysis features.
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="elevenlabs-key" className="text-sm font-medium">
              ElevenLabs Secret Key
            </label>
            <Input
              id="elevenlabs-key"
              type="password"
              placeholder="Enter your secret key here"
              value={elevenlabsKey}
              onChange={(e) => setElevenlabsKey(e.target.value)}
              className="mental-input"
            />
            <p className="text-xs text-gray-500">
              Used for the Mental Health BFF voice companion (Agent ID: IpGxDXMq7Zdd28TdsFMg).
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave} className="mental-button">
            Save API Keys
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
