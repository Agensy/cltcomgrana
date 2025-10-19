import { Mail, Users, MessageCircle, Instagram, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackgroundWrapper from "@/components/BackgroundWrapper";

const ThankYouA = () => {
  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full">
          {/* Header com confete visual */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary via-orange-500 to-yellow-500 mb-6 shadow-2xl shadow-primary/50">
              <CheckCircle className="w-14 h-14 text-white" strokeWidth={3} />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary via-orange-500 to-yellow-500 bg-clip-text text-transparent leading-tight">
              PARABÉNS! 🎉
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 font-semibold">
              Sua jornada no CLT com Grana começa agora!
            </p>
          </div>

          {/* Card principal */}
          <div className="bg-card/95 backdrop-blur-xl border-2 border-primary/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">
              Próximos Passos Essenciais
            </h2>

            {/* Steps */}
            <div className="space-y-6 mb-10">
              {/* Step 1 */}
              <div className="flex gap-4 items-start p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 hover:border-primary/40 transition-all hover:scale-[1.02]">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shadow-lg">
                  <Mail className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <div className="mb-3">
                    <span className="text-sm font-black text-primary tracking-wider">#PASSO 1</span>
                    <h3 className="text-xl font-bold text-foreground mt-1">
                      Verifique seu Email
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Enviamos um email com todos os detalhes do seu acesso ao curso. Confira sua caixa de entrada e também o spam!
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 hover:border-primary/40 transition-all hover:scale-[1.02]">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <div className="mb-3">
                    <span className="text-sm font-black text-primary tracking-wider">#PASSO 2</span>
                    <h3 className="text-xl font-bold text-foreground mt-1">
                      Entre na Comunidade
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Junte-se à Comunidade Criador de Sites com IA para receber avisos importantes e atualizações exclusivas!
                  </p>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto font-bold"
                    onClick={() => window.open('https://chat.whatsapp.com/sua-comunidade', '_blank')}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    ENTRAR NA COMUNIDADE
                  </Button>
                </div>
              </div>
            </div>

            {/* Seção de Suporte Destacada */}
            <div className="bg-gradient-to-br from-primary/20 via-orange-500/10 to-yellow-500/10 border-2 border-primary/30 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Canais Oficiais de Suporte
                </h3>
                <p className="text-muted-foreground">
                  Estamos aqui para ajudar você em cada passo
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Email */}
                <a
                  href="mailto:suporte@cltcomgrana.com.br"
                  className="flex flex-col items-center gap-3 p-6 bg-card/80 backdrop-blur rounded-xl hover:bg-card transition-all hover:scale-105 border border-border hover:border-primary/50"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground mb-1">Email</p>
                    <p className="text-xs text-muted-foreground">suporte@cltcomgrana.com.br</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/5511959175948"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 bg-card/80 backdrop-blur rounded-xl hover:bg-card transition-all hover:scale-105 border border-border hover:border-primary/50"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground mb-1">WhatsApp</p>
                    <p className="text-xs text-muted-foreground">Suporte Direto</p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/cltcomgrana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-6 bg-card/80 backdrop-blur rounded-xl hover:bg-card transition-all hover:scale-105 border border-border hover:border-primary/50"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-foreground mb-1">Instagram</p>
                    <p className="text-xs text-muted-foreground">@cltcomgrana</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Footer message */}
            <div className="text-center mt-8 pt-8 border-t border-border">
              <p className="text-muted-foreground">
                Estamos empolgados para ter você conosco! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default ThankYouA;
