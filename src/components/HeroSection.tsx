import { Check } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import heroBackground from "@/assets/hero-background.webp";
import logo from "@/assets/logo-clt-com-grana.webp";
import { motion } from "framer-motion";
const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{
      backgroundImage: `url(${heroBackground})`
    }} />

      <div className="container relative z-10 mx-auto px-8 py-20">
        <div className="w-full lg:w-[60%]">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img src={logo} alt="CLT com Grana" className="w-56" />
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Crie e venda sites<br />
              profissionais com <span className="text-gradient-orange-glow">I.A em<br />
              minutos</span> mesmo sem<br />
              experiência e sem<br />
              investimento
            </motion.h1>

            <motion.ul 
              className="space-y-1 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {["Ferramenta exclusiva de I.A", "Agentes de vendas", "Sites prontos em minutos", "Crie sem experiência", "Venda de R$ 500 a R$ 2.000 por projeto"].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center gap-3 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-zinc-400">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p 
              className="mb-8 text-lg text-zinc-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              Seu primeiro site vendido em 07 dias ou seu dinheiro de volta.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <GlowButton onClick={scrollToForm}>
                GARANTIR MINHA VAGA AGORA
              </GlowButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default HeroSection;