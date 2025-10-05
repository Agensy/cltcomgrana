import { Check } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import heroBackground from "@/assets/hero-background.webp";
import logo from "@/assets/logo-clt-com-grana.webp";
import { motion } from "framer-motion";

const HeroSectionB = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70" 
        style={{ backgroundImage: `url(${heroBackground})` }} 
      />

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl mb-6 leading-tight font-bold lg:text-6xl"
            >
              Ganhe até <span className="text-gradient-orange-glow">R$2.000</span> criando sites com I.A — mesmo sem saber programar
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xl md:text-2xl mb-8 text-zinc-300"
            >
              Comece do zero, sem investir em anúncios, sem equipe, e com um método testado por mais de 1.000 alunos.
            </motion.p>

            <motion.ul 
              className="space-y-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {[
                "Sites prontos em minutos com ferramenta de I.A exclusiva",
                "Trabalhe de casa no seu tempo, sem depender de ninguém",
                "Primeiro pagamento em até 7 dias — ou seu dinheiro de volta"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                >
                  <Check className="w-5 h-5 icon-gradient-orange flex-shrink-0" />
                  <span className="text-zinc-300">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="space-y-4"
            >
              <GlowButton onClick={scrollToForm} className="w-full md:w-auto min-w-[400px]">
                QUERO COMEÇAR AGORA E FATURAR COM SITES
              </GlowButton>
              <p className="text-sm text-zinc-400">
                Vagas limitadas – próxima turma fecha em 72h
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-8 inline-block"
            >
              <div className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-full">
                <p className="text-sm text-zinc-300">
                  "Consegui meu primeiro cliente em 6 dias, sem saber nada de tecnologia." — <span className="text-gradient-orange-glow font-semibold">Aluno João M.</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionB;
