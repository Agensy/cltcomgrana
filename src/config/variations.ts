export interface VariationConfig {
  id: string;
  project: 'A' | 'B';
  slug: string;
  pricing: {
    originalPrice: string;
    installmentPrice: string;
    installmentCount: number;
    cashPrice: string;
    discountPercentage: string;
    bonusValue: string;
  };
  checkout: {
    title: string;
    description: string;
    checkoutUrl: string;
    utmParams: {
      utm_source: string;
      utm_medium: string;
      utm_campaign: string;
      utm_content: string;
    };
  };
}

export const variationsConfig: Record<string, VariationConfig> = {
  // Projeto A - Oficial
  'a-lp1': {
    id: 'a-lp1',
    project: 'A',
    slug: 'lp1',
    pricing: {
      originalPrice: 'R$ 2.799',
      installmentPrice: 'R$ 9,45',
      installmentCount: 12,
      cashPrice: 'R$ 97',
      discountPercentage: '82%',
      bonusValue: 'R$ 1.802'
    },
    checkout: {
      title: 'Só mais um passo pra liberar seu acesso completo.',
      description: 'Preencha seus dados pra seguir direto pro checkout.',
      checkoutUrl: 'https://payment.ticto.app/O6C811AB5',
      utmParams: {
        utm_source: 'landing',
        utm_medium: 'organic',
        utm_campaign: 'projeto-a-lp1',
        utm_content: 'final-offer'
      }
    }
  },
  'a-lp2': {
    id: 'a-lp2',
    project: 'A',
    slug: 'lp2',
    pricing: {
      originalPrice: 'R$ 2.999',
      installmentPrice: 'R$ 10,90',
      installmentCount: 12,
      cashPrice: 'R$ 119',
      discountPercentage: '80%',
      bonusValue: 'R$ 1.950'
    },
    checkout: {
      title: 'Finalize sua compra agora!',
      description: 'Complete seus dados para garantir sua vaga.',
      checkoutUrl: 'https://payment.ticto.app/O6C811AB5',
      utmParams: {
        utm_source: 'landing',
        utm_medium: 'organic',
        utm_campaign: 'projeto-a-lp2',
        utm_content: 'final-offer'
      }
    }
  },
  'a-lp3': {
    id: 'a-lp3',
    project: 'A',
    slug: 'lp3',
    pricing: {
      originalPrice: 'R$ 3.199',
      installmentPrice: 'R$ 12,45',
      installmentCount: 12,
      cashPrice: 'R$ 139',
      discountPercentage: '78%',
      bonusValue: 'R$ 2.100'
    },
    checkout: {
      title: 'Última etapa para seu sucesso!',
      description: 'Preencha os dados e garanta sua transformação.',
      checkoutUrl: 'https://payment.ticto.app/O6C811AB5',
      utmParams: {
        utm_source: 'landing',
        utm_medium: 'organic',
        utm_campaign: 'projeto-a-lp3',
        utm_content: 'final-offer'
      }
    }
  },

  // Projeto B - Afiliação
  'b-lp1': {
    id: 'b-lp1',
    project: 'B',
    slug: 'lp1',
    pricing: {
      originalPrice: 'R$ 2.799',
      installmentPrice: 'R$ 9,45',
      installmentCount: 12,
      cashPrice: 'R$ 97',
      discountPercentage: '85%',
      bonusValue: 'R$ 1.802'
    },
    checkout: {
      title: 'Só mais um passo pra liberar seu acesso completo.',
      description: 'Preencha seus dados pra seguir direto pro checkout.',
      checkoutUrl: 'https://pay.hotmart.com/K102191894H?off=nbmg2y2r&bid=1759848815162',
      utmParams: {
        utm_source: 'afiliado',
        utm_medium: 'referral',
        utm_campaign: 'projeto-b-lp1',
        utm_content: 'final-offer'
      }
    }
  },
  'b-lp2': {
    id: 'b-lp2',
    project: 'B',
    slug: 'lp2',
    pricing: {
      originalPrice: 'R$ 2.999',
      installmentPrice: 'R$ 14,32',
      installmentCount: 12,
      cashPrice: 'R$ 147',
      discountPercentage: '83%',
      bonusValue: 'R$ 1.950'
    },
    checkout: {
      title: 'Finalize sua compra agora!',
      description: 'Complete seus dados para garantir sua vaga.',
      checkoutUrl: 'https://pay.hotmart.com/K102191894H?off=ymii42y8&bid=1759848870539',
      utmParams: {
        utm_source: 'afiliado',
        utm_medium: 'referral',
        utm_campaign: 'projeto-b-lp2',
        utm_content: 'final-offer'
      }
    }
  },
  'b-lp3': {
    id: 'b-lp3',
    project: 'B',
    slug: 'lp3',
    pricing: {
      originalPrice: 'R$ 3.199',
      installmentPrice: 'R$ 19,19',
      installmentCount: 12,
      cashPrice: 'R$ 197',
      discountPercentage: '81%',
      bonusValue: 'R$ 2.100'
    },
    checkout: {
      title: 'Última etapa para seu sucesso!',
      description: 'Preencha os dados e garanta sua transformação.',
      checkoutUrl: 'https://pay.hotmart.com/K102191894H?off=m3dbdocw&bid=1759848853756',
      utmParams: {
        utm_source: 'afiliado',
        utm_medium: 'referral',
        utm_campaign: 'projeto-b-lp3',
        utm_content: 'final-offer'
      }
    }
  }
};

export const getVariationConfig = (project: string, slug: string): VariationConfig | null => {
  const key = `${project}-${slug}`;
  return variationsConfig[key] || null;
};