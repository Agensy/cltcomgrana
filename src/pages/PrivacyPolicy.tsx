import { Link } from "react-router-dom";
import logo from "@/assets/logo-clt-com-grana.webp";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/" className="inline-block mb-8">
          <img src={logo} alt="CLT com Grana" className="w-40" />
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
        
        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introdução</h2>
            <p>
              A sua privacidade é importante para nós. Esta Política de Privacidade explica como o CLT com Grana coleta, usa, compartilha e protege as informações pessoais dos usuários de nossa plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Informações que Coletamos</h2>
            <p>
              Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Informações de Cadastro:</strong> Nome, e-mail, telefone e dados de pagamento</li>
              <li><strong>Informações de Uso:</strong> Dados sobre como você utiliza a plataforma, páginas visitadas e recursos acessados</li>
              <li><strong>Informações Técnicas:</strong> Endereço IP, tipo de navegador, sistema operacional e cookies</li>
              <li><strong>Informações de Comunicação:</strong> Registros de comunicações entre você e nossa equipe de suporte</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Como Usamos Suas Informações</h2>
            <p>
              Utilizamos as informações coletadas para:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Fornecer, operar e manter nossa plataforma</li>
              <li>Processar transações e enviar notificações relacionadas</li>
              <li>Melhorar, personalizar e expandir nossos serviços</li>
              <li>Entender e analisar como você usa nossa plataforma</li>
              <li>Desenvolver novos produtos, serviços e recursos</li>
              <li>Comunicar com você sobre atualizações, ofertas e promoções</li>
              <li>Enviar informações técnicas e de suporte</li>
              <li>Prevenir fraudes e garantir a segurança da plataforma</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cookies e Tecnologias Similares</h2>
            <p>
              Utilizamos cookies e tecnologias similares para coletar informações sobre sua navegação. Isso nos ajuda a:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Manter você conectado à sua conta</li>
              <li>Lembrar suas preferências e configurações</li>
              <li>Entender como você usa nossa plataforma</li>
              <li>Exibir anúncios relevantes através do Google Ads e Facebook Pixel</li>
            </ul>
            <p className="mt-2">
              Você pode configurar seu navegador para recusar cookies, mas isso pode afetar sua experiência na plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Compartilhamento de Informações</h2>
            <p>
              Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas nas seguintes situações:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Prestadores de Serviços:</strong> Com empresas que nos ajudam a operar a plataforma (processamento de pagamentos, hospedagem, análise de dados)</li>
              <li><strong>Requisitos Legais:</strong> Quando exigido por lei ou para proteger nossos direitos</li>
              <li><strong>Com Seu Consentimento:</strong> Quando você autorizar expressamente o compartilhamento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Remarketing e Publicidade</h2>
            <p>
              Utilizamos pixels de remarketing do Google e Facebook para:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Exibir anúncios relevantes para pessoas que visitaram nosso site</li>
              <li>Otimizar nossas campanhas publicitárias</li>
              <li>Medir a eficácia de nossos anúncios</li>
            </ul>
            <p className="mt-2">
              Estes serviços de terceiros podem coletar informações sobre suas visitas a este e outros sites. Você pode optar por não receber publicidade personalizada visitando as configurações de anúncios do Google e Facebook.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Retenção de Dados</h2>
            <p>
              Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Seus Direitos</h2>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Acessar suas informações pessoais que possuímos</li>
              <li>Corrigir informações incorretas ou incompletas</li>
              <li>Solicitar a exclusão de suas informações</li>
              <li>Opor-se ao processamento de suas informações</li>
              <li>Solicitar a portabilidade de seus dados</li>
              <li>Revogar seu consentimento a qualquer momento</li>
            </ul>
            <p className="mt-2">
              Para exercer esses direitos, entre em contato conosco através dos canais disponíveis na plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Menores de Idade</h2>
            <p>
              Nossos serviços não são destinados a menores de 18 anos. Não coletamos intencionalmente informações de crianças. Se descobrirmos que coletamos informações de um menor, tomaremos medidas para excluí-las.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Alterações a Esta Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política nesta página e atualizando a data de "Última atualização". Recomendamos que você revise esta política regularmente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contato</h2>
            <p>
              Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados pessoais, entre em contato conosco através dos canais de atendimento disponíveis na plataforma.
            </p>
          </section>

          <p className="text-sm italic mt-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="mt-12">
          <Link to="/" className="text-primary hover:underline">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
