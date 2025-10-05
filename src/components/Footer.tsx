import logo from "@/assets/logo-clt-com-grana.webp";

const Footer = () => {
  return (
    <footer className="relative bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-6">
          <img src={logo} alt="CLT com Grana" className="w-40" />
          
          <div className="max-w-4xl text-sm text-muted-foreground leading-relaxed">
            <p>
              ESTE SITE NÃO É do FACEBOOK: Este site não faz parte do site do Facebook ou do Facebook Inc. Além disso, este site NÃO é endossado pelo Facebook de nenhuma maneira. FACEBOOK é uma marca comercial independente da FACEBOOK, Inc.. Usamos pixels / cookies de remarketing do Google neste site para nos comunicarmos novamente com as pessoas que visitam nosso site e garantir que possamos alcançá-las no futuro com mensagens e informações relevantes. O Google mostra nossos anúncios em sites de terceiros na Internet para ajudar a comunicar nossa mensagem e alcançar as pessoas certas que mostraram interesse em nossas informações no passado.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
