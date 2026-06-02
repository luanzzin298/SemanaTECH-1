import { motion, useSpring, useTransform } from 'framer-motion'
import {
  FaArrowRight,
  FaPlay,
  FaChevronDown,
  FaRecycle,
  FaTrophy,
  FaClock,
} from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const sectionRef = useRef(null)

  // Scroll automático para o topo da seção quando a página carregar
  useEffect(() => {
    // Força o scroll para o topo da seção Hero
    setTimeout(() => {
      if (sectionRef.current) {
        const offset = 80 // Compensação para o header fixo
        const elementPosition = sectionRef.current.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }, [])

  // ============================================
  // 🔧 CONFIGURAÇÕES DAS IMAGENS
  // ============================================

  // IMAGEM DE FUNDO
  const BACKGROUND_IMAGE_URL =
    'https://static.blocks-cms.com/h2bplasticos/upload/slide/6d7e083fa5224d66bd26394de530be51.png'

  // IMAGEM DA LOGO
  const LOGO_IMAGE_URL =
    'https://h2bplasticos.com.br/_next/image?url=%2Fimagens%2Flogo-h2b-removebg-preview.png&w=1080&q=75'

  // TEXTO
  const IMAGE_CAPTION = "Onde tecnologia e sustentabilidade se encontram."

  // ============================================

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const parallaxX = useSpring(
    useTransform(() => mousePosition.x * 20),
    { damping: 30, stiffness: 200 }
  )

  const parallaxY = useSpring(
    useTransform(() => mousePosition.y * 20),
    { damping: 30, stiffness: 200 }
  )

  // Partículas
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.1,
  }))

  // Estatísticas
  const stats = [
    { icon: FaRecycle, value: '50+', label: 'Toneladas recicladas/mês' },
    { icon: FaTrophy, value: '12+', label: 'Anos de experiência' },
    { icon: FaClock, value: '24/7', label: 'Suporte técnico' },
  ]

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src={BACKGROUND_IMAGE_URL}
          alt="Fábrica H2B Plásticos"
          className="w-full h-full object-cover"
        />
        {/* Overlay escuro AZUL */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001C30]/90 via-[#0A4A6E]/80 to-[#001C30]/90" />
      </div>

      {/* Overlay industrial */}
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.03&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

      {/* Partículas */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-300/30"
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
            ease: 'easeInOut',
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
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
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
              {['Soluções', 'em', 'Plásticos', 'com'].map((word, i) => (
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
              A H2B Plásticos transforma resinas em embalagens de alto desempenho para os setores alimentício,
              construção, logística e agrícola. Com tecnologia de ponta e compromisso com a economia circular,
              entregamos soluções personalizadas que unem durabilidade, segurança e inovação.
            </motion.p>

            {/* Botões - CORRIGIDOS COM LINKS */}
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
                Solicitar Orçamento
                <FaArrowRight />
              </Link>

              <Link
                to="/produtos"
                className="border-2 border-cyan-300 hover:bg-cyan-300/20 text-white px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300"
              >
                Catálogo de Produtos
                <FaPlay className="text-sm" />
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

          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="hidden lg:flex justify-center items-center ml-24 xl:ml-60"
          >
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-cyan-300/30 shadow-2xl max-w-md w-full overflow-hidden">
              
              {/* brilho */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-300/10 to-transparent pointer-events-none" />

              {/* logo */}
              <div className="flex justify-center relative z-10">
                <img
                  src={LOGO_IMAGE_URL}
                  alt="Logo H2B"
                  className="w-80 h-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      'https://placehold.co/400x200/0A4A6E/cyan?text=H2B'
                  }}
                />
              </div>

              {/* linha */}
              <div className="w-20 h-[2px] bg-cyan-300 mx-auto my-6 rounded-full" />

              {/* texto */}
              <p className="text-center text-white text-lg font-semibold tracking-wide relative z-10">
                {IMAGE_CAPTION}
              </p>

              {/* efeitos */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-300/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero