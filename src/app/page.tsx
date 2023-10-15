import FeatureCard from "@/components/ui/home/AvailableService";
import EfficientLoad from "@/components/ui/home/EfficientLoad";
import HeroSection from "@/components/ui/home/Hero";
import Offer from "@/components/ui/home/Offer";
import UpcomingService from "@/components/ui/home/UpcomingService";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeatureCard />
      <UpcomingService />
      <EfficientLoad />
      <Offer/>
    </div>
  );
};

export default HomePage;
