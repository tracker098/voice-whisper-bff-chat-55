
import React from "react";
import { Layout } from "@/components/Layout";
import { JournalEntry } from "@/components/JournalEntry";

const Journal = () => {
  const [apiKey, setApiKey] = React.useState("");

  React.useEffect(() => {
    const savedKeys = localStorage.getItem("mindBFF_api_keys");
    if (savedKeys) {
      const keys = JSON.parse(savedKeys);
      setApiKey(keys.openai || "");
    }
  }, []);

  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-xl font-medium text-mentalPurple-700">Journal Your Thoughts</h2>
      </div>
      <JournalEntry apiKey={apiKey} />
    </Layout>
  );
};

export default Journal;
