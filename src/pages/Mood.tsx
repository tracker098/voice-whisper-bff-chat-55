
import React from "react";
import { Layout } from "@/components/Layout";
import { MoodTracker } from "@/components/MoodTracker";

const Mood = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-xl font-medium text-mentalPurple-700">Track Your Mood</h2>
      </div>
      <MoodTracker />
    </Layout>
  );
};

export default Mood;
