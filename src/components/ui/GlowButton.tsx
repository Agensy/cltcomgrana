import { ButtonHTMLAttributes, forwardRef } from "react";
import "./glow-button.css";
interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(({
  children,
  onClick,
  className = "",
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`glow-button relative px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-[0_0_20px_rgba(203,123,66,0.3)] hover:shadow-[0_0_30px_rgba(203,123,66,0.5)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});
GlowButton.displayName = "GlowButton";
export default GlowButton;