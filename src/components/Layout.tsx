
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Activity, Brain, Calendar, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const getActiveTab = () => {
    switch (currentPath) {
      case "/journal":
        return "journal";
      case "/mood":
        return "mood";
      case "/progress":
        return "progress";
      default:
        return "talk";
    }
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen bg-gradient-to-br from-mentalPurple-50 to-mentalBlue-50">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-mentalPurple-700">
              <span className="text-mentalPurple-500">mind</span>BFF
            </h1>
            <Button variant="ghost" className="rounded-full">
              <Brain className="h-5 w-5 mr-2 text-mentalPurple-500" />
              <span className="font-medium">Settings</span>
            </Button>
          </div>
        </header>
        
        <main className="mb-20">{children}</main>
        
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-3xl p-4 z-10">
          <div className="flex justify-around max-w-5xl mx-auto">
            <NavButton
              icon={<MessageCircle />}
              label="Talk"
              active={activeTab === "talk"}
              onClick={() => navigate("/")}
            />
            <NavButton
              icon={<Brain />}
              label="Journal"
              active={activeTab === "journal"}
              onClick={() => navigate("/journal")}
            />
            <NavButton
              icon={<Activity />}
              label="Mood"
              active={activeTab === "mood"}
              onClick={() => navigate("/mood")}
            />
            <NavButton
              icon={<Calendar />}
              label="Progress"
              active={activeTab === "progress"}
              onClick={() => navigate("/progress")}
            />
          </div>
        </nav>
      </div>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavButton({ icon, label, active, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-xl transition-all",
        active
          ? "text-mentalPurple-500 bg-mentalPurple-100"
          : "text-gray-500 hover:bg-gray-100"
      )}
    >
      <div className="text-current">{icon}</div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );
}
