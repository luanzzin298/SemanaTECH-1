import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCookie,
  FaCookieBite,
  FaDatabase,
  FaChartLine,
  FaUserCheck,
  FaAd,
  FaChrome,
  FaFirefox,
  FaSafari,
  FaEdge,
  FaShieldAlt,
  FaRegClock,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

const PoliticaCookies = () => {
  const [activeSection, setActiveSection] = useState("o-que-sao");
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const { scrollYProgress } = useScroll();
  const sectionRef = useRef(null);

  // Efeito de mouse para gradiente dinâmico
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll para o topo
  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        const offset = 70;
        const elementPosition = sectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }, 100);
  }, []);

  // Smooth scroll para seções
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  // Detectar seção ativa durante o scroll
  useEffect(() => {
    const sections = [
      "o-que-sao",
      "como-usamos",
      "tipos",
      "gerenciamento",
      "configuracoes",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Animações
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const tiposCookies = [
    {
      icon: FaDatabase,
      title: "Cookies Essenciais",
      description: "Necessários para o funcionamento básico do site",
      example: "Autenticação, segurança, carrinho de compras",
    },
    {
      icon: FaChartLine,
      title: "Cookies de Desempenho",
      description:
        "Nos ajudam a entender como os visitantes interagem com o site",
      example: "Páginas mais visitadas, tempo de navegação",
    },
    {
      icon: FaUserCheck,
      title: "Cookies Funcionais",
      description: "Lembram suas preferências para melhorar sua experiência",
      example: "Idioma, tema, preferências de exibição",
    },
    {
      icon: FaAd,
      title: "Cookies de Publicidade",
      description: "Usados para entregar anúncios relevantes",
      example: "Anúncios personalizados, campanhas",
    },
  ];

  const navegadores = [
    {
      icon: FaChrome,
      name: "Google Chrome",
      path: "Configurações → Privacidade e segurança → Cookies",
    },
    {
      icon: FaFirefox,
      name: "Mozilla Firefox",
      path: "Opções → Privacidade e segurança → Cookies",
    },
    {
      icon: FaSafari,
      name: "Safari",
      path: "Preferências → Privacidade → Cookies",
    },
    {
      icon: FaEdge,
      name: "Microsoft Edge",
      path: "Configurações → Privacidade → Cookies",
    },
  ];

  const beneficios = [
    {
      icon: FaShieldAlt,
      title: "Segurança",
      description: "Cookies essenciais protegem sua sessão",
    },
    {
      icon: FaRegClock,
      title: "Eficiência",
      description: "Carregamento mais rápido do site",
    },
    {
      icon: FaUserCheck,
      title: "Personalização",
      description: "Experiência adaptada às suas preferências",
    },
    {
      icon: FaCheckCircle,
      title: "Transparência",
      description: "Controle total sobre seus dados",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="pt-24 pb-20 overflow-hidden relative min-h-screen bg-gradient-to-br from-[#001C30] via-[#001C30] to-[#0A4A6E]"
    >
      {/* Fundo com gradiente dinâmico seguindo o mouse */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0) 60%)`,
          }}
        />
      </div>

      {/* Padrão industrial de fundo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-3xl" />
      </div>

      {/* Barra de progresso de scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="relative mb-12">
            {/* Badge de última atualização */}
            <div className="absolute top-0 right-0 bg-cyan-500/20 backdrop-blur-sm text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full border border-cyan-400/30">
              📅 Atualizado: {new Date().toLocaleDateString("pt-BR")}
            </div>

            {/* Botão voltar */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-all duration-300 group"
            >
              <div className="bg-cyan-500/20 backdrop-blur-sm p-2 rounded-full group-hover:bg-cyan-500/30 transition-colors border border-cyan-400/30">
                <FaArrowLeft className="text-sm" />
              </div>
              <span className="font-medium">Voltar para o início</span>
            </Link>

            {/* Hero Section */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur-xl opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-full shadow-lg">
                    <FaCookie className="text-4xl text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                variants={fadeUp}
              >
                <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                  Política de
                </span>{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Cookies
                </span>
              </motion.h1>

              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-6 rounded-full"
                variants={fadeUp}
              />

              <motion.p
                className="text-gray-300 text-lg max-w-2xl mx-auto"
                variants={fadeUp}
              >
                Entenda como utilizamos cookies para melhorar sua experiência em
                nosso site
              </motion.p>
            </div>

            {/* Menu de navegação rápida */}
            <div className="sticky top-20 z-40 bg-white/5 backdrop-blur-md rounded-2xl shadow-sm border border-white/10 p-2 mb-12">
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: "o-que-sao", label: "O que são?" },
                  { id: "como-usamos", label: "Como usamos" },
                  { id: "tipos", label: "Tipos" },
                  { id: "gerenciamento", label: "Gerenciamento" },
                  { id: "configuracoes", label: "Configurações" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                          : "text-gray-300 hover:bg-white/10"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards de benefícios */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {beneficios.map((beneficio, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-md border border-white/10 hover:border-cyan-400/50 hover:shadow-cyan-500/20 transition-all duration-300 group"
              >
                <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <beneficio.icon className="text-cyan-400 text-xl" />
                </div>
                <h3 className="font-bold text-white mb-2">{beneficio.title}</h3>
                <p className="text-gray-300 text-xs">{beneficio.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Seção: O que são Cookies */}
          <motion.section
            id="o-que-sao"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="scroll-mt-24 mb-8"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-md border border-white/10 hover:border-cyan-400/50 hover:shadow-cyan-500/20 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <FaCookieBite className="text-cyan-400 text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    O que são Cookies?
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Cookies são pequenos arquivos de texto que os sites que você
                    visita colocam no seu computador. Eles são amplamente
                    utilizados para fazer os sites funcionarem ou funcionarem de
                    forma mais eficiente, bem como para fornecer informações aos
                    proprietários do site.
                  </p>
                  <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-300">
                      💡 <strong className="text-cyan-400">Importante:</strong>{" "}
                      Os cookies não contêm vírus e não podem acessar seus
                      arquivos pessoais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Seção: Como Usamos Cookies */}
          <motion.section
            id="como-usamos"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="scroll-mt-24 mb-8"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-md border border-white/10 hover:border-cyan-400/50 hover:shadow-cyan-500/20 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <FaChartLine className="text-cyan-400" />
                Como Utilizamos Cookies
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Utilizamos cookies de diferentes tipos para melhorar sua
                experiência, personalizar conteúdo e anúncios, fornecer recursos
                de mídia social e analisar nosso tráfego.
              </p>
            </div>
          </motion.section>

          {/* Seção: Tipos de Cookies */}
          <motion.section
            id="tipos"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="scroll-mt-24 mb-8"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-md border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Tipos de Cookies que Utilizamos
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {tiposCookies.map((tipo, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 rounded-xl p-5 transition-all duration-300 hover:border-cyan-400/50 border border-transparent"
                  >
                    <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                      <tipo.icon className="text-cyan-400 text-lg" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{tipo.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      {tipo.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      Exemplo: {tipo.example}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Seção: Gerenciamento de Cookies */}
          <motion.section
            id="gerenciamento"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="scroll-mt-24 mb-8"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-cyan-400" />
                Gerenciamento de Cookies
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Você pode controlar e/ou excluir cookies como desejar. A maioria
                dos navegadores permite que você:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-cyan-400">✓</span> Veja quais cookies
                  estão ativos
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-cyan-400">✓</span> Bloqueie cookies de
                  terceiros
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-cyan-400">✓</span> Exclua todos os
                  cookies ao fechar o navegador
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-cyan-400">✓</span> Receba alertas quando
                  novos cookies forem criados
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Seção: Configurações por Navegador */}
          <motion.section
            id="configuracoes"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="scroll-mt-24 mb-8"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-md border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Configurações por Navegador
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {navegadores.map((nav, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    className="bg-white/5 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 hover:border-cyan-400/50 border border-transparent"
                  >
                    <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <nav.icon className="text-cyan-400 text-xl" />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-2">
                      {nav.name}
                    </h3>
                    <p className="text-gray-400 text-xs">{nav.path}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Banner de ajuda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-2xl p-6 border border-cyan-400/30"
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl">
                <FaInfoCircle className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-300 mb-2">
                  Precisa de ajuda sobre Cookies?
                </h3>
                <p className="text-gray-300 text-sm">
                  Se tiver dúvidas sobre nossa Política de Cookies, entre em
                  contato conosco pelo e-mail:{" "}
                  <strong className="text-cyan-300">
                    contato@h2bplasticos.com.br
                  </strong>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Footer da página */}
          <div className="text-center pt-8 mt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} H2B Plásticos - Todos os direitos
              reservados
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link
                to="/politica-privacidade"
                className="text-xs text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Política de Privacidade
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                to="/termos-uso"
                className="text-xs text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Termos de Uso
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                to="/codigo-etica"
                className="text-xs text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Código de Ética
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PoliticaCookies;
