import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5511959175948";

const WhatsAppHelpButton: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
      <div className="px-3 py-2 rounded-md bg-card/80 backdrop-blur border border-border text-foreground text-sm shadow-sm">
        Dúvidas? Fale no WhatsApp
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
        title="Fale conosco no WhatsApp"
      >
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-glow-green"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </a>
    </div>
  );
};

export default WhatsAppHelpButton;