import { ReactNode } from "react";
import mainBg from "@/assets/main-background.webp";

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper = ({ children }: BackgroundWrapperProps) => {
  return (
    <div className="relative">
      {/* Unified Background - Ultra optimized */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="w-full h-full bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${mainBg})`
          }}
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;
