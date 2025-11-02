import React from 'react';
import { CheckCircle, Zap } from 'lucide-react';

const VideoProofSection: React.FC = () => {

  return (
    <section className="relative py-8 md:py-[75px] bg-background">
      {/* Grid Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(203,123,66,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(203,123,66,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)'
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <div className="animate-fade-in text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Trecho da Aula
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-orange">Veja Como É Simples</span>
              <br />
              <span className="text-white">Na Prática</span>
            </h2>
            

          </div>
          
          {/* Subheadline */}
          <div className="text-center mb-12">
            <p className="text-xl text-zinc-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Veja a <span className="text-gradient-orange-glow font-semibold">exata estrutura</span> que me permitiu criar um site profissional completo em minutos, 
              sem conhecimento técnico e sem complicação - <span className="text-gradient-orange-glow font-semibold">o mesmo sistema que você vai dominar no treinamento</span>
            </p>
          </div>

          {/* Video Container (embed simples Panda, sem formatações) */}
          <div className="max-w-4xl mx-auto mb-12">
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                id="panda-19e01d8d-e7d3-4a75-89b5-a22a53f24d1c"
                src="https://player-vz-1e7e0b7e-27c.tv.pandavideo.com.br/embed/?v=19e01d8d-e7d3-4a75-89b5-a22a53f24d1c"
                style={{ border: 'none', position: 'absolute', top: 0, left: 0 }}
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                allowFullScreen={true}
                width="100%"
                height="100%"
              />
            </div>
          </div>

          {/* 4 Step Process as Badges */}
          <div className="mb-12 max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-white mb-8">
              Em apenas <span className="text-gradient-orange-glow">4 passos simples:</span>
            </h3>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                 <div className="inline-flex items-center gap-2 bg-gradient-to-r from-zinc-700/30 to-zinc-600/20 text-zinc-300 px-4 py-3 rounded-full text-sm font-medium border border-zinc-600/30 hover:border-zinc-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(113,113,122,0.2)] animate-fade-in">
                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-xs font-bold text-white">1</span>
                   <span className="text-zinc-300 font-semibold">Você acessa o criador de sites com I.A</span>
                 </div>
                 
                 <div className="inline-flex items-center gap-2 bg-gradient-to-r from-zinc-700/30 to-zinc-600/20 text-zinc-300 px-4 py-3 rounded-full text-sm font-medium border border-zinc-600/30 hover:border-zinc-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(113,113,122,0.2)] animate-fade-in">
                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-xs font-bold text-white">2</span>
                   <span className="text-zinc-300 font-semibold">Você gera o prompt perfeito com o contexto certo</span>
                 </div>
                 
                 <div className="inline-flex items-center gap-2 bg-gradient-to-r from-zinc-700/30 to-zinc-600/20 text-zinc-300 px-4 py-3 rounded-full text-sm font-medium border border-zinc-600/30 hover:border-zinc-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(113,113,122,0.2)] animate-fade-in">
                   <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-xs font-bold text-white">3</span>
                   <span className="text-zinc-300 font-semibold">Você cola no codificador de I.A</span>
                 </div>
                 
                 <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-green-400/10 text-green-400 px-4 py-3 rounded-full text-sm font-medium border border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] animate-fade-in">
                   <CheckCircle className="w-5 h-5 text-green-400" />
                   <span className="text-green-400 font-bold">E PRONTO! Seu site nasce em minutos.</span>
                 </div>
               </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoProofSection;