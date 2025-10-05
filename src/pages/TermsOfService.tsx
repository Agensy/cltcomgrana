import { Link } from "react-router-dom";
import logo from "@/assets/logo-clt-com-grana.webp";

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/" className="inline-block mb-8">
          <img src={logo} alt="CLT com Grana" className="w-40" />
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
        
        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar o CLT com Grana, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Descrição do Serviço</h2>
            <p>
              O CLT com Grana é uma plataforma que oferece ferramentas de inteligência artificial para criação de sites profissionais, além de treinamento e suporte para venda destes sites. O acesso aos recursos da plataforma é fornecido mediante pagamento e aceitação destes termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cadastro e Conta</h2>
            <p>
              Para acessar determinados recursos da plataforma, você precisará criar uma conta. Você concorda em fornecer informações precisas, atuais e completas durante o processo de registro e em manter suas informações atualizadas. Você é responsável por manter a confidencialidade de sua senha e conta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Pagamento e Reembolso</h2>
            <p>
              Os valores de acesso à plataforma são os informados no momento da compra. Oferecemos uma garantia de 7 dias: se você não vender seu primeiro site dentro deste período, reembolsaremos 100% do valor pago, mediante solicitação e comprovação de que seguiu as orientações fornecidas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Uso Aceitável</h2>
            <p>
              Você concorda em usar a plataforma apenas para fins legais e de acordo com estes termos. É proibido:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Usar a plataforma de qualquer maneira que viole leis locais, estaduais, nacionais ou internacionais</li>
              <li>Compartilhar seu acesso com terceiros não autorizados</li>
              <li>Tentar obter acesso não autorizado a qualquer parte da plataforma</li>
              <li>Usar a plataforma para criar conteúdo ilegal, difamatório ou prejudicial</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo presente na plataforma, incluindo textos, gráficos, logos, ícones, imagens, clipes de áudio, downloads digitais e software, é de propriedade do CLT com Grana ou de seus fornecedores de conteúdo e é protegido por leis de direitos autorais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitação de Responsabilidade</h2>
            <p>
              O CLT com Grana não se responsabiliza por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou da incapacidade de usar a plataforma. Os resultados de vendas podem variar de acordo com o esforço e dedicação de cada usuário.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Modificações dos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação dos termos revisados na plataforma. Seu uso continuado da plataforma após tais alterações constituirá sua aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Rescisão</h2>
            <p>
              Podemos encerrar ou suspender seu acesso à plataforma imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Lei Aplicável</h2>
            <p>
              Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar conflitos de disposições legais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contato</h2>
            <p>
              Se você tiver dúvidas sobre estes Termos, entre em contato conosco através dos canais de atendimento disponíveis na plataforma.
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

export default TermsOfService;
