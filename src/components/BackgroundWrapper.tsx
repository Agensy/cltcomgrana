import { ReactNode } from "react";
import mainBg from "@/assets/main-background.webp";

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper = ({ children }: BackgroundWrapperProps) => {
  return (
    <div className="relative">
      {/* Unified Background */}
      <div className="absolute inset-0">
        <img 
          src={mainBg} 
          alt="" 
          className="w-full h-full object-cover opacity-30"
        />
        {/* Overlay for smooth transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80" />
      </div>
      
      {/* Content with spacing */}
      <div className="relative space-y-8 md:space-y-[75px]">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;
