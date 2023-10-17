import Footer from "@/components/ui/Footer/Footer";
import PublicHeader from "@/components/ui/PublicHeader/PublicHeader";
import FeatureCard from "@/components/ui/home/AvailableService";
import EfficientLoad from "@/components/ui/home/EfficientLoad";
import HeroSection from "@/components/ui/home/Hero";
import Offer from "@/components/ui/home/Offer";
import Review from "@/components/ui/home/Review";
import UpcomingService from "@/components/ui/home/UpcomingService";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <PublicHeader />
      <HeroSection />
      <FeatureCard />
      <UpcomingService />
      <EfficientLoad />
      <Offer />
      <Review />
      <Footer />
    </div>
  );
};

export default HomePage;
