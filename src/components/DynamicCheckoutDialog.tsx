import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { VariationConfig } from "@/config/variations";
import LeadsService from "@/services/leadsService";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface DynamicCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: VariationConfig;
}

const DynamicCheckoutDialog = ({ open, onOpenChange, config }: DynamicCheckoutDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    // Capture lead using LeadsService
    const lead = LeadsService.captureLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      project: config.project,
      variation: config.id,
      originalPrice: config.pricing.originalPrice,
      installmentPrice: config.pricing.installmentPrice,
      installmentCount: config.pricing.installmentCount,
      cashPrice: config.pricing.cashPrice,
      discountPercentage: config.pricing.discountPercentage,
      bonusValue: config.pricing.bonusValue,
      popupType: 'checkout',
      popupTrigger: 'Final Offer Button Click'
    });

    // Store data in localStorage for checkout
    const checkoutData = {
      ...formData,
      leadId: lead.id,
      variation: config.id,
      project: config.project,
      slug: config.slug,
      utmParams: config.checkout.utmParams
    };
    
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    // Success message
    toast({
      title: "Redirecionando...",
      description: "Seus dados foram salvos. Abrindo o checkout em nova aba!",
    });

    // Monta URL do checkout (Hotmart/Ticto) com UTMs e dados do usuário
    const baseUrl = config?.checkout?.checkoutUrl || 'https://pay.hotmart.com/K102191894H';
    let finalUrl = baseUrl;
    try {
      const url = new URL(baseUrl);
      const utm = checkoutData.utmParams || config?.checkout?.utmParams;
      if (utm) {
        Object.entries(utm).forEach(([k, v]) => {
          if (v) url.searchParams.set(k, String(v));
        });
      }
      if (formData.name) url.searchParams.set('name', formData.name);
      if (formData.email) url.searchParams.set('email', formData.email);
      if (formData.phone) url.searchParams.set('phone', formData.phone);
      finalUrl = url.toString();
    } catch {
      finalUrl = baseUrl;
    }

    // Abre em nova aba (gesto do usuário) e fecha o popup; fallback se bloqueado
    const newTab = window.open(finalUrl, '_blank', 'noopener,noreferrer');
    onOpenChange(false);
    if (!newTab) {
      // Fallback para checkout interno quando bloqueado
      const fallback = `/b/checkout?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}`;
      // Pequeno atraso para dar tempo ao envio do webhook iniciar
      setTimeout(() => {
        window.location.href = fallback;
      }, 200);
    } else {
      newTab.focus();
    }
  };

  // Form shared UI
  const Form = (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="space-y-2">
        <Label htmlFor="dialog-name" className="text-sm font-medium text-muted-foreground">
          Nome Completo
        </Label>
        <Input
          id="dialog-name"
          name="name"
          type="text"
          placeholder="Seu nome completo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          autoComplete="name"
          autoCapitalize="words"
          enterKeyHint="next"
          required
          {...(!isMobile ? { autoFocus: true } : {})}
          className="h-12 bg-input/50 border-border focus:border-primary transition-colors"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dialog-email" className="text-sm font-medium text-muted-foreground">
          Seu melhor e-mail
        </Label>
        <Input
          id="dialog-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCorrect="off"
          spellCheck={false}
          placeholder="exemplo@gmail.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          enterKeyHint="next"
          required
          className="h-12 bg-input/50 border-border focus:border-primary transition-colors"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dialog-phone" className="text-sm font-medium text-muted-foreground">
          Seu WhatsApp
        </Label>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-input/50 border border-border rounded-lg px-3 h-12">
            <span className="text-xl">🇧🇷</span>
            <span className="text-sm font-medium">+55</span>
          </div>
          <Input
            id="dialog-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 9 9999-0123"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            enterKeyHint="go"
            required
            className="flex-1 h-12 bg-input/50 border-border focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="utmify-initiate-checkout w-full uppercase font-bold text-base"
        >
          IR PARA O CHECKOUT AGORA
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Você será redirecionado para a última etapa.<br />
          Seus dados já vão preenchidos lá.
        </p>
      </div>
    </form>
  );

  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] max-h-[85vh] rounded-t-xl bg-card/95 backdrop-blur-xl border-border overflow-y-auto pb-[env(safe-area-inset-bottom)]">
        <SheetHeader className="space-y-3">
          <SheetTitle className="text-xl font-bold text-center">
            {config.checkout.title}
          </SheetTitle>
          <SheetDescription className="text-center text-muted-foreground">
            {config.checkout.description}
          </SheetDescription>
        </SheetHeader>
        {Form}
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] max-h-[85vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-center">
            {config.checkout.title}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {config.checkout.description}
          </DialogDescription>
        </DialogHeader>
        {Form}
      </DialogContent>
    </Dialog>
  );
};

export default DynamicCheckoutDialog;