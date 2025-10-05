import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import storyBg from "@/assets/story-background.webp";
const StorySection = () => {
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  return <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={storyBg} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      
    </section>;
};
export default StorySection;