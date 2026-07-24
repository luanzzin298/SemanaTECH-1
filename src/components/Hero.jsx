import { motion, useSpring, useTransform } from "framer-motion";
import {
  FaArrowRight,
  FaPlay,
  FaChevronDown,
  FaRecycle,
  FaTrophy,
  FaClock,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [logoMousePosition, setLogoMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const logoContainerRef = useRef(null);
  const logoRef = useRef(null);

  // Scroll automático para o topo da seção quando a página carregar
  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        const offset = 80;
        const elementPosition = sectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  }, []);

  // Configurações das imagens
  const BACKGROUND_IMAGE_URL =
    "https://static.blocks-cms.com/h2bplasticos/upload/slide/6d7e083fa5224d66bd26394de530be51.png";

  const LOGO_IMAGE_URL =
    "https://h2bplasticos.com.br/_next/image?url=%2Fimagens%2Flogo-h2b-removebg-preview.png&w=1080&q=75";

  const IMAGE_CAPTION = "Onde tecnologia e sustentabilidade se encontram.";

  // Mouse parallax effect para o texto
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Efeito de brilho do mouse na logo
  useEffect(() => {
    const handleLogoMouseMove = (e) => {
      if (logoContainerRef.current) {
        const rect = logoContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setLogoMousePosition({ x, y });
      }
    };

    const logoContainer = logoContainerRef.current;
    if (logoContainer) {
      logoContainer.addEventListener("mousemove", handleLogoMouseMove);
      logoContainer.addEventListener("mouseleave", () => {
        setLogoMousePosition({ x: 50, y: 50 });
      });
    }

    return () => {
      if (logoContainer) {
        logoContainer.removeEventListener("mousemove", handleLogoMouseMove);
        logoContainer.removeEventListener("mouseleave", () => {
          setLogoMousePosition({ x: 50, y: 50 });
        });
      }
    };
  }, []);

  const parallaxX = useSpring(
    useTransform(() => mousePosition.x * 20),
    { damping: 30, stiffness: 200 },
  );

  const parallaxY = useSpring(
    useTransform(() => mousePosition.y * 20),
    { damping: 30, stiffness: 200 },
  );

  // Partículas - MAIS VISÍVEIS (opacidade e cor aumentadas)
  const particles = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2, // Tamanho um pouco maior
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.3, // Mais visíveis (0.3-0.8)
  }));

  // Estatísticas
  const stats = [
    { icon: FaRecycle, value: "50+", label: "Toneladas recicladas/mês" },
    { icon: FaTrophy, value: "12+", label: "Anos de experiência" },
    { icon: FaClock, value: "24/7", label: "Suporte técnico" },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* BACKGROUND - Mesma cor da página About */}
      <div className="absolute inset-0 z-0">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="Fábrica H2B Plásticos"
          className="w-full h-full object-cover"
        />
        {/* Gradiente escuro azulado - MESMO ESTILO da página About */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001C30] via-[#001C30] to-[#0A4A6E] opacity-95" />
      </div>

      {/* Overlay industrial suave */}
      <div className='absolute inset-0 opacity-15 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)]' />

      {/* Partículas - MAIS VISÍVEIS (cor e opacidade aumentadas) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-300/50" // Aumentado de /30 para /50
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -40, 0, 40, 0],
            x: [0, 30, 0, -30, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* CONTEÚDO */}
      <div className="container mx-auto px-6 relative z-10 text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* TEXTO */}
          <motion.div
            ref={containerRef}
            style={{ x: parallaxX, y: parallaxY }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-block bg-white/10 backdrop-blur-sm text-cyan-300 px-4 py-1 rounded-full text-sm font-semibold border border-cyan-300/30">
                Projeto Educacional | Luan e Kauã
              </span>
            </motion.div>

            {/* Título */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.04, delayChildren: 0.2 },
                },
              }}
            >
              {["Soluções", "em", "Plásticos", "com"].map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                className="text-cyan-300 inline-block"
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  visible: { opacity: 1, scale: 1, transition: { delay: 0.6 } },
                }}
              >
                Inovação
              </motion.span>
              <motion.span
                className="inline-block mx-2"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.7 } },
                }}
              >
                e
              </motion.span>
              <motion.span
                className="text-cyan-300 inline-block"
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  visible: { opacity: 1, scale: 1, transition: { delay: 0.8 } },
                }}
              >
                Sustentabilidade
              </motion.span>
            </motion.h1>

            {/* Descrição */}
            <motion.p
              className="text-base md:text-lg text-gray-200 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              A H2B Plásticos transforma resinas em embalagens de alto
              desempenho para os setores alimentício, construção, logística e
              agrícola. Com tecnologia de ponta e compromisso com a economia
              circular, entregamos soluções personalizadas que unem
              durabilidade, segurança e inovação.
            </motion.p>

            {/* Botões */}
            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <Link
                to="/contato"
                className="bg-cyan-300 hover:bg-cyan-200 text-[#001C30] font-semibold px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg"
              >
                Solicitar Atendimento
                <FaArrowRight />
              </Link>

              <Link
                to="/produtos"
                className="border-2 border-cyan-300 hover:bg-cyan-300/20 text-white px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300"
              >
                Catálogo de Produtos
              </Link>
            </motion.div>

            {/* Estatísticas */}
            <motion.div
              className="flex flex-wrap gap-6 pt-8 border-t border-cyan-300/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <stat.icon className="text-cyan-300 text-2xl" />
                  <div>
                    <p className="font-bold text-xl">{stat.value}</p>
                    <p className="text-xs text-gray-300">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* LOGO COM EFEITO DE BRILHO DO MOUSE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="hidden md:flex justify-center items-center md:ml-0 lg:ml-24 xl:ml-60"
          >
            <div
              ref={logoContainerRef}
              className="relative group cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              {/* Efeito de brilho externo */}
              <div className="absolute -inset-4 bg-cyan-300/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Card principal */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-cyan-300/30 shadow-2xl max-w-md w-full overflow-hidden">
                {/* Gradiente animado de fundo */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-300/5 to-transparent"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* EFEITO DE BRILHO DO MOUSE - RADIAL GRADIENTE SEGUINDO O CURSOR */}
                <motion.div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${logoMousePosition.x}% ${logoMousePosition.y}%, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.1) 30%, rgba(6, 182, 212, 0) 70%)`,
                  }}
                  animate={{
                    opacity: logoMousePosition.x !== 50 ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.1 }}
                />

                {/* EFEITO DE REFLEXO ESPECULAR */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at ${logoMousePosition.x}% ${logoMousePosition.y}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 50%)`,
                  }}
                  transition={{ duration: 0.1 }}
                />

                {/* Linha decorativa superior */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

                {/* Logo com efeito 3D seguindo o mouse */}
                <motion.div
                  ref={logoRef}
                  className="flex justify-center relative z-10"
                  animate={{
                    rotateX: (logoMousePosition.y - 50) * -0.2,
                    rotateY: (logoMousePosition.x - 50) * 0.2,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={LOGO_IMAGE_URL}
                    alt="Logo H2B"
                    className="w-80 h-auto object-contain transition-all duration-500 group-hover:scale-105 drop-shadow-2xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/400x200/0A4A6E/cyan?text=H2B";
                    }}
                  />
                </motion.div>

                {/* Linha divisória */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-cyan-300/20"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <div className="w-12 h-[2px] bg-cyan-300/50 rounded-full"></div>
                  </div>
                </div>

                {/* Texto */}
                <motion.p
                  className="text-center text-white text-lg font-semibold tracking-wide relative z-10"
                  animate={{
                    textShadow:
                      logoMousePosition.x !== 50
                        ? `0 0 10px rgba(6, 182, 212, 0.5)`
                        : `0 0 0px rgba(6, 182, 212, 0)`,
                  }}
                >
                  {IMAGE_CAPTION}
                </motion.p>

                {/* Círculos decorativos */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-300/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-300/5 rounded-full blur-3xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      ></motion.div>
    </section>
  );
};

export default Hero;
