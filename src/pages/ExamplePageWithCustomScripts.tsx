import React from 'react';
import PageSpecificScripts from '@/components/PageSpecificScripts';
import { useLazyScripts } from '@/hooks/use-lazy-scripts';

const ExamplePageWithCustomScripts: React.FC = () => {
  const { heroLoaded } = useLazyScripts();

  return (
    <div className="min-h-screen">
      {/* Scripts específicos desta página */}
      <PageSpecificScripts 
        page="checkout"
        project="B"
        variation="lp2"
        shouldLoad={heroLoaded}
      />
      
      <main>
        <h1>Página de Checkout - Projeto B LP2</h1>
        <p>Esta página carrega scripts específicos baseados nos parâmetros.</p>
        
        {/* Conteúdo da página */}
      </main>
    </div>
  );
};

export default ExamplePageWithCustomScripts;