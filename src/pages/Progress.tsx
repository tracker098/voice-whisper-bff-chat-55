
import React from "react";
import { Layout } from "@/components/Layout";

const Progress = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h2 className="text-xl font-medium text-mentalPurple-700">Your Progress</h2>
      </div>
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
    </Layout>
  );
};

export default Progress;
