import { ButtonHTMLAttributes, forwardRef, useEffect, useState } from "react";
import "./glow-button.css";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ children, onClick, className = "", ...props }, ref) => {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const update = () => setReducedMotion(mq.matches);
      update();
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }, []);

    return (
      <div className={`glowbox glowbox-active ${className}`}>
        {!reducedMotion && (
          <div className="glowbox-animations">
            <div className="glowbox-glow"></div>
            <div className="glowbox-stars-masker">
              <div className="glowbox-stars"></div>
            </div>
          </div>
        )}

        <div className="glowbox-borders-masker">
          <div className="glowbox-borders"></div>
        </div>

        <button type="button" onClick={onClick} ref={ref} {...props}>
          <div className="btn-cta-box">
            <div className="btn-cta">{children}</div>
            <img
              src="https://zeph.com.br/wp-content/uploads/2023/12/seta-2.svg"
              className="arrow-icon"
              alt=""
              aria-hidden="true"
            />
          </div>
        </button>
      </div>
    );
  }
);

GlowButton.displayName = "GlowButton";

export default GlowButton;
