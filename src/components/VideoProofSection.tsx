import React, { useState, useRef, useCallback } from 'react';
import { CheckCircle, Zap } from 'lucide-react';

const VideoProofSection: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // URLs de fallback para o vídeo
  const videoUrls = [
    `https://player-vz-1e7e0b7e-27c.tv.pandavideo.com.br/embed/?v=8bb01fda-4f87-487d-b6ff-0dfc5ce36d55&autoplay=1&controls=1&muted=0&loop=0`,
    `https://player-vz-1e7e0b7e-27c.tv.pandavideo.com.br/embed/?v=8bb01fda-4f87-487d-b6ff-0dfc5ce36d55&autoplay=1&controls=1`,
    `https://b-vz-1e7e0b7e-27c.tv.pandavideo.com.br/8bb01fda-4f87-487d-b6ff-0dfc5ce36d55/playlist.m3u8`,
    `https://player-vz-1e7e0b7e-27c.tv.pandavideo.com.br/embed/?v=8bb01fda-4f87-487d-b6ff-0dfc5ce36d55`
  ];

  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    setHasError(false);
  }, []);

  const handleIframeError = useCallback(() => {
    console.error('Erro ao carregar iframe do vídeo');
    if (retryCount < videoUrls.length - 1) {
      // Tentar próxima URL automaticamente
      setTimeout(() => {
        handleRetry();
      }, 1000);
    } else {
      setHasError(true);
    }
  }, [retryCount, videoUrls.length, handleRetry]);

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

          {/* Video Container */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative bg-gradient-to-r from-primary/30 to-primary/10 p-1 rounded-2xl shadow-2xl">
              <div className="bg-black rounded-xl overflow-hidden">
                <div className="aspect-video relative">
                  {hasError ? (
                    /* Error State */
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Erro ao carregar vídeo</h3>
                        <div className="text-sm text-zinc-400 mb-2">
                          Tentativa {retryCount + 1} de {videoUrls.length}
                        </div>
                        <p className="text-zinc-400 text-sm mb-4">Houve um problema ao carregar o vídeo. Tente novamente.</p>
                        <button
                           onClick={handleRetry}
                           disabled={retryCount >= videoUrls.length - 1}
                           className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                             retryCount >= videoUrls.length - 1
                               ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                               : 'bg-gradient-to-r from-primary to-primary/80 text-white hover:shadow-lg'
                           }`}
                         >
                           {retryCount >= videoUrls.length - 1 ? 'Todas as tentativas esgotadas' : 'Tentar Novamente'}
                         </button>
                        {retryCount >= videoUrls.length - 1 && (
                          <div className="mt-4 text-xs text-zinc-500">
                            Recarregue a página para tentar novamente
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Video Player - Direto sem placeholder */
                    <div className="absolute inset-0">
                      <iframe
                         ref={iframeRef}
                         id="panda-video-player"
                         src={`https://player-vz-1e7e0b7e-27c.tv.pandavideo.com.br/embed/?v=8bb01fda-4f87-487d-b6ff-0dfc5ce36d55&autoplay=true&muted=false&controls=true&responsive=true&t=${Date.now()}`}
                         title="Vídeo demonstrativo"
                         style={{
                           border: 'none',
                           position: 'absolute',
                           top: 0,
                           left: 0,
                           width: '100%',
                           height: '100%',
                           backgroundColor: '#000000'
                         }}
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                         allowFullScreen
                         onLoad={() => {
                           console.log('Vídeo carregado com sucesso');
                         }}
                         onError={(e) => {
                           console.error('Erro ao carregar iframe do vídeo:', e);
                           setHasError(true);
                         }}
                       />
                    </div>
                  )}
                </div>
              </div>
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