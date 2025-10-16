import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const [userData, setUserData] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  useEffect(() => {
    // Capturar dados da URL
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');

    if (name || email || phone) {
      setUserData({ name: name || '', email: email || '', phone: phone || '' });
    }
  }, []);

  // Construir URL do checkout com dados do usuário
  const buildCheckoutUrl = () => {
    const baseUrl = 'https://pay.hotmart.com/K102191894H?checkoutMode=10';
    const params = new URLSearchParams();
    
    if (userData.name) {
      params.append('name', userData.name);
    }
    if (userData.email) {
      params.append('email', userData.email);
    }
    if (userData.phone) {
      params.append('phone', userData.phone);
    }
    
    return params.toString() ? `${baseUrl}&${params.toString()}` : baseUrl;
  };

  // Não precisamos mais do redirecionamento automático para iframe

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-orange mb-4">
            Finalize sua Compra
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Você está a um passo de transformar sua carreira
          </p>
        </div>

        {/* Dados do usuário se disponíveis */}
        {(userData.name || userData.email || userData.phone) && (
          <div className="mb-6 p-4 bg-card rounded-lg border border-primary/20 max-w-2xl mx-auto">
            <p className="text-sm text-primary font-medium mb-2 text-center">
              Olá {userData.name ? userData.name : 'futuro aluno'}! 👋
            </p>
            <div className="text-xs text-gray-400 space-y-1 text-center">
              {userData.email && <p>📧 {userData.email}</p>}
              {userData.phone && <p>📱 {userData.phone}</p>}
            </div>
          </div>
        )}

        {/* Checkout da Hotmart Embarcado */}
         <div className="bg-card rounded-2xl shadow-card overflow-hidden mx-auto max-w-6xl border border-border">
           <iframe
             src={buildCheckoutUrl()}
             className="w-full h-[900px] border-0"
             title="Checkout CLT com Grana"
             allow="payment; fullscreen"
             sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-popups-to-escape-sandbox"
             loading="lazy"
           />
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