import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaIndustry, FaUsers, FaRecycle, FaTrophy } from "react-icons/fa";
import { company } from "../data/content";

const Counter = ({ value, suffix, icon, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 1500;
      const stepTime = Math.abs(Math.floor(duration / end));

      const timer = setInterval(() => {
        start += 1;
        setCount(start);

        if (start === end) {
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center p-4 sm:p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
    >
      <div className="text-3xl sm:text-5xl text-cyan-400 mb-3 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>

      <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
        {count}
        {suffix}
      </div>

      <div className="text-gray-300 mt-2 font-medium text-sm sm:text-base">
        {label}
      </div>
    </motion.div>
  );
};

const Numbers = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#001C30] via-[#001C30] to-[#0A4A6E]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <Counter
            value={company.employees}
            suffix="+"
            icon={<FaIndustry />}
            label="Funcionários"
          />

          <Counter
            value={company.clients}
            suffix="+"
            icon={<FaUsers />}
            label="Clientes ativos"
          />

          <Counter
            value={company.recycledMonthly}
            suffix=" t/mês"
            icon={<FaRecycle />}
            label="Reciclagem"
          />

          <Counter
            value={new Date().getFullYear() - company.founded}
            suffix=" anos"
            icon={<FaTrophy />}
            label="Experiência"
          />
        </div>
      </div>
    </section>
  );
};

export default Numbers;
