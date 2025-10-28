import { Mail, Users, MessageCircle, Instagram, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { useUtmifyPixel } from "@/hooks/use-utmify-pixel";
import { useFacebookPixel } from "@/hooks/use-facebook-pixel";
import { useLazyScripts } from "@/hooks/use-lazy-scripts";

const ThankYouB = () => {
  // Detecta quando a página foi carregada
  const { heroLoaded } = useLazyScripts();
  
  // Carrega os scripts após o carregamento inicial
  useUtmifyPixel(heroLoaded);
  // Força o carregamento do Facebook Pixel independente do heroLoaded
  useFacebookPixel(true);

  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full space-y-8">
          {/* Hero Section */}
          <header className="text-center space-y-6 animate-fade-in">
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 blur-xl opacity-30 animate-pulse"></div>
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/25 ring-4 ring-emerald-500/20">
                <CheckCircle className="w-12 h-12 text-white drop-shadow-lg" strokeWidth={2.5} />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-700 bg-clip-text text-transparent leading-tight tracking-tight">
                PARABÉNS!
              </h1>
              <div className="flex items-center justify-center gap-2 text-2xl">
                <Sparkles className="w-6 h-6 text-emerald-500 animate-pulse" />
                <span className="text-emerald-600 font-semibold">Bem-vindo ao CLT com Grana</span>
                <Sparkles className="w-6 h-6 text-emerald-500 animate-pulse" />
              </div>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Sua jornada para dominar o mercado CLT começa agora. Siga os próximos passos para garantir o máximo aproveitamento.
              </p>
            </div>
          </header>

          {/* Main Content Card */}
          <main className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl shadow-emerald-500/5 ring-1 ring-emerald-500/10">
            <div className="space-y-10">
              {/* Section Title */}
              <div className="text-center space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Próximos Passos Essenciais
                </h2>
                <p className="text-muted-foreground">
                  Complete estas etapas para começar sua transformação profissional
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="group relative overflow-hidden rounded-2xl border border-emerald-200/50 bg-white/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-emerald-300/60 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1">
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow duration-300">
                          <Mail className="w-8 h-8 text-white" strokeWidth={2} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          1
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full mb-2">
                          PRIMEIRO PASSO
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                          Verifique seu Email
                        </h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Enviamos todas as informações de acesso ao seu email. Verifique sua caixa de entrada e também a pasta de spam para não perder nenhum detalhe importante.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="group relative overflow-hidden rounded-2xl border border-emerald-200/50 bg-white/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-emerald-300/60 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1">
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow duration-300">
                          <Users className="w-8 h-8 text-white" strokeWidth={2} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          2
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full mb-2">
                          SEGUNDO PASSO
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                          Entre na Comunidade Exclusiva
                        </h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Junte-se à nossa comunidade VIP para receber atualizações em primeira mão, networking com outros profissionais e suporte direto da nossa equipe.
                      </p>
                      <Button 
                        size="lg" 
                        className="group/btn bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white border-0 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-0.5"
                        onClick={() => window.open('https://chat.whatsapp.com/HjJi3LGvqx63EulE9KVNMS', '_blank')}
                      >
                        <Users className="w-5 h-5 mr-2" />
                        Entrar na Comunidade
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Section */}
              <section className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    Canais Oficiais de Suporte
                  </h3>
                  <p className="text-muted-foreground">
                    Nossa equipe está sempre disponível para ajudar você
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Email Support */}
                  <a
                    href="mailto:suporte@cltcomgrana.com.br"
                    className="group flex flex-col items-center gap-4 p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-emerald-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow">
                      <Mail className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="font-semibold text-foreground group-hover:text-emerald-700 transition-colors">Email</p>
                      <p className="text-sm text-muted-foreground">suporte@cltcomgrana.com.br</p>
                    </div>
                  </a>

                  {/* WhatsApp Support */}
                  <a
                    href="https://wa.me/5511959175948"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-4 p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-emerald-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow">
                      <MessageCircle className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="font-semibold text-foreground group-hover:text-emerald-700 transition-colors">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">Suporte Direto</p>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/cltcomgrana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-4 p-6 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-emerald-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow">
                      <Instagram className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="font-semibold text-foreground group-hover:text-emerald-700 transition-colors">Instagram</p>
                      <p className="text-sm text-muted-foreground">@cltcomgrana</p>
                    </div>
                  </a>
                </div>
              </section>

              {/* Footer Message */}
              <footer className="text-center pt-8 border-t border-border/50">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <span>Estamos empolgados para ter você conosco nesta jornada!</span>
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                </div>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default ThankYouB;
