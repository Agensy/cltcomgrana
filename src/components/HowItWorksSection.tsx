import { Lightbulb, Zap, DollarSign, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const HowItWorksSection = () => {
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  const steps = [{
    icon: Lightbulb,
    step: "01",
    title: "Aprenda o método",
    description: "Acesse o curso completo com aulas práticas e diretas. Sem enrolação, só o que você precisa para começar."
  }, {
    icon: Zap,
    step: "02",
    title: "Use a ferramenta de I.A",
    description: "Nossa ferramenta exclusiva cria prompts perfeitos e gera sites profissionais em minutos. Você só precisa seguir o passo a passo."
  }, {
    icon: DollarSign,
    step: "03",
    title: "Venda e fature",
    description: "Siga o método para conseguir clientes, entregue sites profissionais e receba de R$ 500 a R$ 2.000 por projeto."
  }];
  return <section className="relative overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      
    </section>;
};
export default HowItWorksSection;