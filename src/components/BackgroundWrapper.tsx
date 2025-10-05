import { ReactNode } from "react";
import mainBg from "@/assets/main-background.webp";

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper = ({ children }: BackgroundWrapperProps) => {
  return (
    <div className="relative">
      {/* Unified Background - Optimized for scroll performance */}
      <div className="absolute inset-0 will-change-auto">
        <div 
          className="w-full h-full bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${mainBg})`,
            backgroundAttachment: 'fixed'
          }}
        />
        {/* Simplified overlay */}
        <div className="absolute inset-0 bg-background/60" />
      </div>
      
      {/* Content with spacing */}
      <div className="relative space-y-8 md:space-y-[75px]">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;
