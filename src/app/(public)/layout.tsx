import Footer from "@/components/ui/Footer/Footer";
import PublicHeader from "@/components/ui/PublicHeader/PublicHeader";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PublicHeader />
      <div className="min-h-[calc(100vh-64px)]">{children}</div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
