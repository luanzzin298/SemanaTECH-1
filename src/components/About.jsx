import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import {
  FaRecycle, FaIndustry, FaLeaf, FaTrophy,
  FaChartLine, FaUsers, FaCheckCircle, FaMapMarkerAlt,
  FaWater, FaBoxOpen, FaRocket, FaTint
} from 'react-icons/fa'
import { company } from '../data/content'

// ============================================
// DADOS ESTÁTICOS
// ============================================
const STATS_DATA = [
  { icon: FaIndustry, value: company.employees, label: 'Funcionários', suffix: '+' },
  { icon: FaUsers, value: company.clients, label: 'Clientes ativos', suffix: '+' },
  { icon: FaRecycle, value: company.recycledMonthly, label: 'Toneladas recicladas/mês', suffix: 't' },
  { icon: FaTrophy, value: new Date().getFullYear() - company.founded, label: 'Anos de experiência', suffix: '+' },
]

const VALUES_DATA = [
  {
    icon: FaLeaf,
    title: 'Compromisso Ambiental',
    description: 'Mais de 50 toneladas de plástico reciclado por mês, reduzindo resíduos e emitindo menos CO₂.',
    color: 'from-cyan-400 to-blue-600'
  },
  {
    icon: FaChartLine,
    title: 'Inovação Contínua',
    description: 'Laboratório próprio e parcerias com universidades para desenvolver novas resinas e processos.',
    color: 'from-blue-400 to-cyan-600'
  },
  {
    icon: FaUsers,
    title: 'Relacionamento Transparente',
    description: 'Atendimento próximo, consultoria técnica e soluções sob medida para cada cliente.',
    color: 'from-cyan-500 to-blue-700'
  },
]

const PRODUCT_SPECIALTIES_DATA = [
  {
    icon: FaWater,
    title: 'Garrafões de Água Mineral',
    description: 'Produção de garrafões de alta resistência e durabilidade para o setor de água mineral.',
    highlight: 'Referência nacional'
  },
  {
    icon: FaBoxOpen,
    title: 'Tampas para Garrafões',
    description: 'Tampas com vedação perfeita e segurança para garrafões e produtos lácteos.',
    highlight: 'Alta qualidade'
  },
  {
    icon: FaIndustry,
    title: 'Embalagens Plásticas',
    description: 'Soluções personalizadas para os mais diversos segmentos industriais.',
    highlight: 'Sob medida'
  }
]

const TIMELINE_DATA = [
  { year: '2014', label: 'Fundação da H2B em Muriaé-MG', achieved: true },
  { year: '2016', label: 'Início da produção de garrafões', achieved: true },
  { year: '2018', label: 'Expansão para tampas e lácteos', achieved: true },
  { year: '2020', label: 'Certificação ISO 9001', achieved: true },
  { year: '2023', label: 'Reconhecimento nacional', achieved: true },
  { year: '2026', label: 'Meta de expansão e inovação', achieved: false },
]

// ============================================
// COMPONENTE DO GALÃO DE ÁGUA COM GOTAS CAINDO
// ============================================
const WaterGalloon = React.memo(() => {
  const [waterDrops, setWaterDrops] = useState([])
  const dropIdRef = useRef(0)

  // Criar uma nova gota caindo do galão
  const createDrop = useCallback(() => {
    const id = dropIdRef.current++
    // Posições onde as gotas podem cair (gargalo do galão)
    const positions = [45, 48, 50, 52, 55]
    const randomX = positions[Math.floor(Math.random() * positions.length)]
    const size = Math.random() * 6 + 4 // Tamanho entre 4-10px
    
    setWaterDrops(prev => [...prev, { 
      id, 
      x: randomX, 
      size, 
      delay: 0 
    }])
    
    // Remover a gota após 3 segundos
    setTimeout(() => {
      setWaterDrops(prev => prev.filter(d => d.id !== id))
    }, 3000)
  }, [])

  // Efeito de gotejamento contínuo
  useEffect(() => {
    const interval = setInterval(() => {
      // Gotas caem em intervalos aleatórios
      if (Math.random() > 0.6) {
        createDrop()
      }
    }, 400) // A cada 0.4 segundos pode cair uma gota
    
    return () => clearInterval(interval)
  }, [createDrop])

  return (
    <div className="relative flex justify-center items-center">
      {/* Container do Galão */}
      <div className="relative group cursor-pointer">
        {/* Efeito de brilho externo */}
        <div className="absolute -inset-4 bg-cyan-300/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Card do Galão */}
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl w-80 overflow-hidden">
          
          {/* Gradiente animado de fundo */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Conteúdo do Galão */}
          <div className="relative z-10 text-center">
            {/* Ícone do Galão */}
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative inline-block"
            >
              <div className="text-8xl mb-4 relative">
                <FaWater className="text-cyan-400 drop-shadow-lg" />
                {/* Tampa do galão */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-t-lg" />
              </div>
              
              {/* Água dentro do galão (nível) */}
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gradient-to-t from-cyan-400/30 to-cyan-500/20 rounded-b-full"
                animate={{ height: [8, 12, 8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

           
            
            {/* Linha divisória */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
              </div>
            </div>


            
            {/* Bolhas dentro da água */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-20 h-20 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-cyan-300/50"
                  initial={{ y: 0, opacity: 0.5 }}
                  animate={{ y: -20, opacity: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.5,
                    repeat: Infinity 
                  }}
                  style={{ left: `${30 + i * 20}%`, bottom: 0 }}
                />
              ))}
            </div>
          </div>

          {/* Bordas decorativas */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        </div>

        {/* Gotas de água caindo do galão */}
        {waterDrops.map(drop => (
          <motion.div
            key={drop.id}
            initial={{ y: -30, opacity: 0, x: `${drop.x}%` }}
            animate={{ 
              y: window.innerHeight - 300, 
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1.2, 0.5]
            }}
            transition={{
              duration: 2.5,
              ease: "easeIn",
              times: [0, 0.1, 0.8, 1]
            }}
            style={{ 
              left: `${drop.x}%`,
              position: 'absolute',
              top: '60px'
            }}
            className="absolute pointer-events-none z-30"
          >
            <div className="relative">
              <FaTint 
                className="text-cyan-300/60 drop-shadow-lg" 
                style={{ fontSize: drop.size, filter: 'blur(0.3px)' }}
              />
              {/* Brilho da gota */}
              <div 
                className="absolute top-[30%] left-[30%] w-1 h-1 rounded-full bg-white/80"
                style={{ transform: 'translate(-50%, -50%)' }}
              />
              {/* Rastro da gota */}
              <motion.div
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="absolute -top-2 left-1/2 w-0.5 h-2 bg-gradient-to-b from-cyan-300/50 to-transparent"
                style={{ transform: 'translateX(-50%)' }}
              />
            </div>
          </motion.div>
        ))}

        {/* Efeito de ripple/ping no ponto de impacto */}
        {waterDrops.map(drop => (
          <motion.div
            key={`ripple-${drop.id}`}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1, delay: 2.3 }}
            style={{ 
              left: `${drop.x}%`,
              top: `${window.innerHeight - 300}px`,
              position: 'absolute'
            }}
            className="absolute pointer-events-none z-20"
          >
            <div className="w-6 h-6 rounded-full border-2 border-cyan-300/50" />
          </motion.div>
        ))}
      </div>
    </div>
  )
})

WaterGalloon.displayName = 'WaterGalloon'

// ============================================
// COMPONENTE DE PARTÍCULAS DE ÁGUA FLUTUANTES
// ============================================
const FloatingParticles = React.memo(() => {
  const particles = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-300/10"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -50, 0, 50, 0],
            x: [0, 30, 0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
})

FloatingParticles.displayName = 'FloatingParticles'

// ============================================
// COMPONENTE DE CARD PREMIUM
// ============================================
const PremiumCard = React.memo(({ children, className = "" }) => {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')
  const [glowStyle, setGlowStyle] = useState({})
  const rafRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -5
      const rotateY = ((x - centerX) / centerX) * 5
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
      setGlowStyle({
        background: `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(0, 212, 255, 0.15) 0%, rgba(0, 212, 255, 0) 70%)`
      })
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)')
    setGlowStyle({})
  }, [])

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-200 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300" style={glowStyle} />
      {children}
    </div>
  )
})

PremiumCard.displayName = 'PremiumCard'

// ============================================
// COMPONENTE DE ESTATÍSTICA
// ============================================
const StatCounter = React.memo(({ icon: Icon, value, label, suffix }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isGlowing, setIsGlowing] = useState(false)
  const elementRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !isVisible) setIsVisible(true) },
      { threshold: 0.1, rootMargin: "50px" }
    )
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return
    const duration = 2000
    const stepTime = 16
    const steps = duration / stepTime
    const increment = value / steps
    let current = 0
    let step = 0

    intervalRef.current = setInterval(() => {
      step++
      current += increment
      if (step >= steps) {
        setCount(value)
        clearInterval(intervalRef.current)
        setIsGlowing(true)
        setTimeout(() => setIsGlowing(false), 1000)
      } else {
        setCount(Math.floor(current))
      }
    }, stepTime)

    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isVisible, value])

  return (
    <div ref={elementRef} className="relative text-center p-6 sm:p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-2xl sm:text-3xl text-white" />
      </div>
      <motion.div
        animate={{ scale: isGlowing ? [1, 1.1, 1] : 1 }}
        className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent ${isGlowing ? 'animate-pulse' : ''}`}
      >
        {count}{suffix}
      </motion.div>
      <p className="text-gray-300 mt-2 sm:mt-3 text-sm sm:text-base font-medium">{label}</p>
      {isGlowing && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full animate-pulse" />
      )}
    </div>
  )
})

StatCounter.displayName = 'StatCounter'

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const About = () => {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y = useSpring(backgroundY, { damping: 30, stiffness: 200 })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    return () => y.stop()
  }, [y])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-[#001C30] via-[#001C30] to-[#0A4A6E] min-h-screen"
      aria-label="Sobre a H2B Plásticos"
    >
      {/* Background com efeito de profundidade */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: isMobile ? 0 : y }}>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2070')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#001C30]/95 via-[#001C30]/85 to-[#0A4A6E]/95" />
        </motion.div>

        <FloatingParticles />
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
        
        {/* Header com Galão de Água */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 sm:mb-20">
          {/* Texto do Header */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                Sobre a
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent relative">
                H2B Plásticos
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </span>
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mb-6 lg:mx-0 mx-auto"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed backdrop-blur-sm bg-white/5 rounded-2xl py-4 px-6 lg:mx-0 mx-auto"
            >
              Uma indústria de destaque nacional sediada em Muriaé (MG), especialista na fabricação 
              de embalagens plásticas de alta qualidade.
            </motion.p>
          </motion.div>

          {/* Galão de Água com Gotas Caindo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <WaterGalloon />
          </motion.div>
        </div>

        {/* Seção de História */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative backdrop-blur-md bg-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-600 p-2 rounded-xl shadow-lg">
                  <FaMapMarkerAlt className="text-white text-lg sm:text-xl" />
                </div>
                <span className="text-cyan-300 font-semibold text-sm sm:text-base">Muriaé - Minas Gerais</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Nossa História
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mt-2" />
              </h2>

              <p className="text-gray-300 leading-relaxed mb-6 text-base sm:text-lg">
                Fundada em <span className="text-cyan-300 font-bold">2014</span>, a H2B Plásticos nasceu 
                em Muriaé (MG) com um propósito claro: oferecer soluções plásticas de alta performance 
                sem abrir mão da responsabilidade ambiental.
              </p>

              <div className="relative pl-4 sm:pl-6 border-l-2 border-cyan-400 mb-6">
                <p className="text-gray-200 leading-relaxed text-sm sm:text-base italic">
                  "Desde o início, nos especializamos na fabricação de <span className="text-cyan-300 font-semibold">garrafões de água mineral</span>, 
                  <span className="text-cyan-300 font-semibold"> tampas para garrafões</span> e embalagens para 
                  <span className="text-cyan-300 font-semibold"> produtos lácteos</span>, tornando-nos referência nacional 
                  nesses segmentos."
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 mt-6">
                {['Certificação ISO 9001', 'Selo Verde', 'Destaque Nacional', '+50t recicladas/mês'].map((label) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-cyan-400/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-cyan-400/30"
                  >
                    <FaCheckCircle className="text-cyan-400 text-xs sm:text-sm" />
                    <span className="text-gray-200 text-xs sm:text-sm">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 to-blue-600/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
              <motion.img
                src="https://static.blocks-cms.com/h2bplasticos/upload/slide/6d7e083fa5224d66bd26394de530be51.png"
                alt="Fábrica H2B Plásticos"
                className="w-full h-auto object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001C30] via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Especialidades */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20 lg:mb-24"
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
            Nossas <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Especialidades</span>
          </h3>
          <p className="text-center text-gray-300 text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto px-4">
            Com foco nos segmentos de água mineral e produtos lácteos, entregamos soluções 
            personalizadas de alta qualidade.
          </p>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {PRODUCT_SPECIALTIES_DATA.map((product, idx) => (
              <PremiumCard key={idx}>
                <div className="relative backdrop-blur-md bg-white/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <product.icon className="text-2xl sm:text-3xl text-white" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{product.title}</h4>
                    <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">{product.description}</p>
                    <span className="inline-block bg-cyan-400/20 backdrop-blur-sm text-cyan-300 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-cyan-400/30">
                      {product.highlight}
                    </span>
                  </div>
                </div>
              </PremiumCard>
            ))}
          </div>
        </motion.div>

        {/* Estatísticas */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 lg:mb-24">
          {STATS_DATA.map((stat, idx) => (
            <StatCounter key={idx} {...stat} />
          ))}
        </div>

        {/* Valores */}
        <div className="mb-20 lg:mb-24">
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
            Nossos <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Valores</span>
          </h3>
          <p className="text-center text-gray-300 text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto px-4">
            Princípios que guiam nossas ações e decisões diariamente
          </p>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {VALUES_DATA.map((value, idx) => (
              <PremiumCard key={idx}>
                <div className="relative text-center p-6 sm:p-8 rounded-xl sm:rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden group">
                  <div className={`bg-gradient-to-br ${value.color} w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="text-2xl sm:text-3xl text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{value.title}</h4>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{value.description}</p>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>

        {/* Linha do tempo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-white/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cyan-400/5 to-transparent" />
          
          <h3 className="text-3xl sm:text-4xl font-bold text-center text-white mb-3">
            Nossa <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Jornada</span>
          </h3>
          <p className="text-center text-cyan-300 text-base sm:text-lg mb-8 sm:mb-12">
            Conheça os marcos da nossa história
          </p>

          <div className="max-w-3xl mx-auto">
            {TIMELINE_DATA.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                <div className={`flex gap-4 sm:gap-6 pb-6 sm:pb-8 ${idx !== TIMELINE_DATA.length - 1 ? 'border-l-2 border-cyan-400/30 ml-5' : ''}`}>
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg
                        ${item.achieved 
                          ? 'bg-gradient-to-br from-cyan-400 to-blue-600' 
                          : 'bg-gradient-to-br from-cyan-400/30 to-blue-600/30 border border-cyan-400/50'}`}
                    >
                      {item.achieved ? (
                        <FaCheckCircle className="text-white text-sm sm:text-base" />
                      ) : (
                        <FaRocket className="text-cyan-300 text-sm sm:text-base" />
                      )}
                    </motion.div>
                    {item.achieved && (
                      <motion.div
                        className="absolute inset-0 bg-cyan-400 rounded-lg sm:rounded-xl blur-md"
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-2 sm:pb-4">
                    <div className={`font-bold text-lg sm:text-xl mb-1 sm:mb-2 ${item.achieved ? 'text-cyan-300' : 'text-cyan-400'}`}>
                      {item.year}
                    </div>
                    <p className={`text-sm sm:text-base ${item.achieved ? 'text-gray-200' : 'text-gray-300'}`}>
                      {item.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About