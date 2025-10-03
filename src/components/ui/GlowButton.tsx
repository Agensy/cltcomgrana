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
  return;
});
GlowButton.displayName = "GlowButton";
export default GlowButton;