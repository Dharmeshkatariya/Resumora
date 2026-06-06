import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import AuthSim from "./components/AuthSim";
import Dashboard from "./components/Dashboard";
import PremiumUpsellModal from "./components/PremiumUpsellModal";

export default function App() {
  const [currentView, setCurrentView] = useState<"marketing" | "auth" | "dashboard">("marketing");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleLaunchAppClick = () => {
    // If already authenticated, redirect straight to dashboard
    if (userEmail) {
      setCurrentView("dashboard");
    } else {
      setCurrentView("auth");
    }
  };

  const handleAuthSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setUserEmail(null);
    setCurrentView("marketing");
  };

  const handlePaymentSuccess = () => {
    setIsPremium(true);
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#09090E] text-white overflow-hidden selection:bg-[#00FFB2] selection:text-black font-sans">
      
      {/* Dynamic route rendering simulation */}
      {currentView === "marketing" && (
        <LandingPage 
          onStartBuilding={handleLaunchAppClick} 
          onOpenAuth={handleLaunchAppClick} 
        />
      )}

      {currentView === "auth" && (
        <AuthSim 
          onBack={() => setCurrentView("marketing")} 
          onAuthSuccess={handleAuthSuccess} 
        />
      )}

      {currentView === "dashboard" && (
        <Dashboard 
          userEmail={userEmail || "anonymous@company.com"} 
          onLogout={handleLogout}
          onPremiumTrigger={() => setShowPremiumModal(true)}
        />
      )}

      {/* Floating global Elite workspace upgrade modal */}
      <PremiumUpsellModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSuccessPay={handlePaymentSuccess}
      />

    </div>
  );
}
