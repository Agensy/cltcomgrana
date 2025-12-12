export interface VariationConfig {
  id: string;
  project: 'A' | 'B' | 'C';
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
      checkoutUrl: 'https://pay.hotmart.com/K102191894H?checkoutMode=10',
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
      originalPrice: 'R$ 499',
      installmentPrice: 'R$ 9,45',
      installmentCount: 12,
      cashPrice: 'R$ 97',
      discountPercentage: '85%',
      bonusValue: 'R$ 1.802'
    },
    checkout: {
      // Opcionalmente, podemos manter títulos iguais à LP1
      title: 'Só mais um passo pra liberar seu acesso completo.',
      description: 'Preencha seus dados pra seguir direto pro checkout.',
      checkoutUrl: 'https://pay.hotmart.com/K102191894H?checkoutMode=10',
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
  },

  // Projeto C
  'c-lp': {
    id: 'c-lp',
    project: 'C',
    slug: 'lp',
    pricing: {
      originalPrice: 'R$ 529,99',
      installmentPrice: 'R$ 19,19',
      installmentCount: 12,
      cashPrice: 'R$ 197',
      discountPercentage: '63%',
      bonusValue: 'R$ 2.100'
    },
    checkout: {
      // Opcionalmente, podemos manter títulos iguais à LP1
      title: 'Só mais um passo pra liberar seu acesso completo.',
      description: 'Preencha seus dados pra seguir direto pro checkout.',
      checkoutUrl: 'https://pay.hotmart.com/K102191894H?checkoutMode=10',
      utmParams: {
        utm_source: 'afiliado',
        utm_medium: 'referral',
        utm_campaign: 'projeto-c-lp',
        utm_content: 'final-offer'
      }
    }
  },

  'c-fabiano': {
    id: 'c-fabiano',
    project: 'C',
    slug: 'fabiano',
    pricing: {
      originalPrice: 'R$ 529,99',
      installmentPrice: 'R$ 19,19',
      installmentCount: 12,
      cashPrice: 'R$ 197',
      discountPercentage: '63%',
      bonusValue: 'R$ 2.100'
    },
    checkout: {
      title: 'Só mais um passo pra liberar seu acesso completo.',
      description: 'Preencha seus dados pra seguir direto pro checkout.',
      checkoutUrl: 'https://go.hotmart.com/S103227535P?ap=b57c',
      utmParams: {
        utm_source: 'afiliado',
        utm_medium: 'referral',
        utm_campaign: 'projeto-c-fabiano',
        utm_content: 'final-offer'
      }
    }
  },

  'c-antonio': {
    id: 'c-antonio',
    project: 'C',
    slug: 'antonio',
    pricing: {
      originalPrice: 'R$ 529,99',
      installmentPrice: 'R$ 19,19',
      installmentCount: 12,
      cashPrice: 'R$ 197',
      discountPercentage: '63%',
      bonusValue: 'R$ 2.100'
    },
    checkout: {
      title: 'Só mais um passo pra liberar seu acesso completo.',
      description: 'Preencha seus dados pra seguir direto pro checkout.',
      checkoutUrl: 'https://go.hotmart.com/G103365579V?ap=b57c',
      utmParams: {
        utm_source: 'afiliado',
        utm_medium: 'referral',
        utm_campaign: 'projeto-c-antonio',
        utm_content: 'final-offer'
      }
    }
  },

  'c-ricardo': {
    id: 'c-ricardo',
    project: 'C',
    slug: 'ricardo',
    pricing: {
      originalPrice: 'R$ 529,99',
      installmentPrice: 'R$ 19,19',
      installmentCount: 12,
      cashPrice: 'R$ 197',
      discountPercentage: '63%',
      bonusValue: 'R$ 2.100'
    },
    checkout: {
      title: 'Só mais um passo pra liberar seu acesso completo.',
      description: 'Preencha seus dados pra seguir direto pro checkout.',
      checkoutUrl: 'https://go.hotmart.com/Q103317034P?ap=b57c',
      utmParams: {
        utm_source: 'afiliado',
        utm_medium: 'referral',
        utm_campaign: 'projeto-c-ricardo',
        utm_content: 'final-offer'
      }
    }
  }
};

export const getVariationConfig = (project: string, slug: string): VariationConfig | null => {
  const key = `${project}-${slug}`;
  return variationsConfig[key] || null;
};
