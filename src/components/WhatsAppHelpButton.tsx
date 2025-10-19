import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5511959175948";

const WhatsAppHelpButton: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
      >
        <Button
          variant="secondary"
          size="lg"
          className="shadow-glow-green px-4 py-3"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Dúvidas? Fale no WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </Button>
      </a>
      <span className="mt-2 text-xs text-muted-foreground text-right bg-card/70 backdrop-blur rounded-md px-2 py-1 border border-border">
        Se tiver qualquer dúvida, fale com a gente!
      </span>
    </div>
  );
};

export default WhatsAppHelpButton;