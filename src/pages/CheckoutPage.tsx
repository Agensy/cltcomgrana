import React from 'react';

const CheckoutPage: React.FC = () => {
  // URL fixa do checkout
  const checkoutUrl = 'https://pay.hotmart.com/K102191894H';

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-orange mb-4">
            Finalize sua Compra
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Você está a um passo de transformar sua carreira
          </p>
        </div>

        {/* Layout Principal: 75% Checkout + 25% Imagem */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Checkout - 75% */}
          <div className="w-full lg:w-3/4">
            <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border">
              <iframe
                src={checkoutUrl}
                className="w-full h-[900px] border-0"
                title="Checkout CLT com Grana"
                allow="payment; fullscreen"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-popups-to-escape-sandbox"
                loading="lazy"
              />
            </div>
          </div>

          {/* Bloco com Imagem - 25% */}
          <div className="w-full lg:w-1/4">
            <div className="bg-card rounded-2xl shadow-card border border-border p-6 sticky top-4">
              {/* Imagem */}
              <div className="mb-6">
                <img
                  src="/src/assets/guarantee-visual.jpg"
                  alt="Garantia de 7 dias"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              
              {/* Conteúdo adicional */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gradient-orange mb-3">
                  🛡️ Garantia Total
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  7 dias para testar sem riscos. Se não gostar, devolvemos 100% do seu dinheiro.
                </p>
                
                <div className="bg-primary/10 rounded-lg p-4 mb-4">
                  <p className="text-primary font-semibold text-sm">
                    ✅ Acesso imediato
                  </p>
                  <p className="text-primary font-semibold text-sm">
                    ✅ Suporte completo
                  </p>
                  <p className="text-primary font-semibold text-sm">
                    ✅ Certificado incluso
                  </p>
                </div>

                <div className="text-xs text-gray-400">
                  <p>🔒 Pagamento 100% seguro</p>
                  <p>💳 Cartão, PIX ou Boleto</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Processamento seguro pela Hotmart - Líder em produtos digitais
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;