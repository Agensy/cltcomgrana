import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const LeadForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

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

    // Success message
    toast({
      title: "Sucesso!",
      description: "Seus dados foram enviados. Em breve entraremos em contato!",
    });

    // Reset form
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <section id="lead-form" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-8 py-20 max-w-xl">
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12 shadow-glow-green">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Preencha o formulário abaixo
          </h2>
          <p className="text-center text-muted-foreground">
            Garanta seu acesso exclusivo ao FURION
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nome Completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Thiago Finch"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="h-12 bg-input/50 border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Seu melhor e-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="h-12 bg-input/50 border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Seu WhatsApp
              </Label>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-input/50 border border-border rounded-lg px-3 h-12">
                  <span className="text-xl">🇧🇷</span>
                  <span className="text-sm font-medium">+55</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 9 9999-0123"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="flex-1 h-12 bg-input/50 border-border focus:border-primary transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="w-full uppercase font-bold text-base"
            >
              COMPRAR ACESSO EXCLUSIVO AO FURION
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
