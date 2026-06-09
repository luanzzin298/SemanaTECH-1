import { motion } from 'framer-motion'
import { 
  FaLeaf, FaSolarPanel, FaWater, FaHandsHelping, 
  FaRecycle, FaChartLine, FaAward, FaTree, FaTint
} from 'react-icons/fa'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'

// ============================================
// PARTÍCULAS FLUTUANTES
// ============================================
const FloatingParticles = () => {
  const particles = useMemo(() => Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-300/15"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -40, 0, 40, 0],
            x: [0, 25, 0, -25, 0],
            opacity: [0.1, 0.4, 0.1],
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
}

// ============================================
// COMPONENTE DE CONTAGEM ANIMADA (CORRIGIDO)
// ============================================
const CountUp = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const intervalRef = useRef(null)
  const observerRef = useRef(null)

  useEffect(() => {
    // Criar observer para detectar quando o elemento entra na tela
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    if (countRef.current) {
      observerRef.current.observe(countRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasAnimated])

  // Iniciar a contagem quando o elemento for visível
  useEffect(() => {
    if (!hasAnimated) return

    let start = 0
    const stepTime = 16 // ~60fps
    const steps = duration / stepTime
    const increment = end / steps
    let current = 0
    let step = 0

    intervalRef.current = setInterval(() => {
      step++
      current += increment
      if (step >= steps) {
        setCount(end)
        if (intervalRef.current) clearInterval(intervalRef.current)
      } else {
        setCount(Math.floor(current))
      }
    }, stepTime)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [hasAnimated, end, duration])

  return (
    <span ref={countRef} className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  )
}

// ============================================
// CARD DE MÉTRICA PREMIUM (CORRIGIDO - SEM INTERFERIR NO COUNTUP)
// ============================================
const MetricCard = ({ metric, idx }) => {
  const cardRef = useRef(null)

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -4 }}
      className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center 
                 shadow-md hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300
                 border border-white/10 hover:border-cyan-400/50 group"
    >
      <div className="relative">
        <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <metric.icon className="text-2xl text-cyan-400" />
        </div>
        <CountUp end={metric.value} suffix={metric.suffix} />
        <p className="text-gray-300 text-xs mt-2 uppercase tracking-wide">{metric.label}</p>
      </div>
    </motion.div>
  )
}

// ============================================
// CARD DE INICIATIVA PREMIUM
// ============================================
const InitiativeCard = ({ initiative, idx }) => {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')
  const [glowStyle, setGlowStyle] = useState({})
  const rafRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -3
      const rotateY = ((x - centerX) / centerX) * 3
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
      setGlowStyle({
        background: `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(0, 212, 255, 0.12) 0%, rgba(0, 212, 255, 0) 70%)`
      })
    })
  }

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)')
    setGlowStyle({})
  }

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      whileHover={{ y: -4 }}
      className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl 
                 hover:shadow-cyan-500/20 transition-all duration-300 border border-white/10 
                 hover:border-cyan-400/50 group"
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300" style={glowStyle} />
      <div className="relative flex gap-4 items-start">
        <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-14 h-14 
                        rounded-xl flex items-center justify-center shadow-lg
                        group-hover:scale-110 transition-transform duration-300">
          <initiative.icon className="text-2xl text-cyan-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {initiative.title}
          </h3>
          <p className="text-gray-300 leading-relaxed mb-3 text-sm">
            {initiative.description}
          </p>
          <div className="inline-block bg-gradient-to-r from-cyan-400/20 to-blue-600/20 backdrop-blur-sm 
                          text-cyan-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-cyan-400/30">
            {initiative.metrics}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================
// ANIMAÇÕES PADRONIZADAS
// ============================================
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const stagger = (delayChildren = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delayChildren } },
})

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const Sustainability = () => {
  const sectionRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll automático para o topo da seção
  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        const offset = 70
        const elementPosition = sectionRef.current.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      }
    }, 100)
  }, [])

  const sustainabilityMetrics = [
    { icon: FaRecycle, value: 50, suffix: 't/mês', label: 'Plástico reciclado' },
    { icon: FaSolarPanel, value: 40, suffix: '%', label: 'Energia renovável' },
    { icon: FaWater, value: 30, suffix: '%', label: 'Redução no consumo de água' },
    { icon: FaTree, value: 1000, suffix: '+', label: 'Árvores equivalentes preservadas' },
  ]

  const sustainabilityInitiatives = [
    {
      icon: FaLeaf,
      title: 'Economia Circular',
      description: 'Resíduos plásticos pós-consumo e pós-industrial são reintegrados à produção, gerando novo valor e reduzindo o descarte em aterros.',
      metrics: '85% de resíduos reciclados',
    },
    {
      icon: FaSolarPanel,
      title: 'Energia Solar',
      description: 'Investimos em usinas fotovoltaicas que já atendem 40% da demanda energética da fábrica, reduzindo significativamente nossa pegada de carbono.',
      metrics: '200 ton CO₂/ano evitadas',
    },
    {
      icon: FaWater,
      title: 'Reuso de Água',
      description: 'Sistema de captação e tratamento de água da chuva, com estação de reuso que reduz o consumo em 30% e protege os recursos hídricos.',
      metrics: '5 milhões L/ano economizados',
    },
    {
      icon: FaAward,
      title: 'Certificações',
      description: 'Somos signatários do Pacto Global da ONU e possuímos certificação ISO 14001 e selo de material reciclado pós-consumo.',
      metrics: 'Meta 2027: 100% circular',
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="sustainability" 
      className="pt-24 pb-20 overflow-hidden relative min-h-screen bg-gradient-to-br from-[#001C30] via-[#001C30] to-[#0A4A6E]"
    >
      {/* Fundo com gradiente dinâmico */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0) 60%)`
          }}
        />
      </div>

      {/* Partículas flutuantes */}
      <FloatingParticles />

      {/* Padrão industrial de fundo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Cabeçalho */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-md border border-cyan-400/30 text-cyan-300 font-semibold text-sm tracking-wider"
          >
            Sustentabilidade
          </motion.span>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 mt-4">
            <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
              Compromisso com o
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Planeta
            </span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-6 rounded-full" />

          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            A sustentabilidade está integrada ao nosso DNA. Com metas ousadas para 2030, 
            transformamos responsabilidade ambiental em inovação.
          </p>
        </motion.div>

        {/* Métricas principais com contagem animada */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
        >
          {sustainabilityMetrics.map((metric, idx) => (
            <MetricCard key={idx} metric={metric} idx={idx} />
          ))}
        </motion.div>

        {/* Grid de iniciativas */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {sustainabilityInitiatives.map((initiative, idx) => (
            <InitiativeCard key={idx} initiative={initiative} idx={idx} />
          ))}
        </motion.div>

        {/* Card de destaque - Banner Principal */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 
                     text-white shadow-xl border border-white/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cyan-400/5 to-transparent" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
                <FaHandsHelping className="text-cyan-300 text-sm" />
                <span className="text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                  Impacto Real
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                +50 toneladas recicladas por mês
              </h3>
              <p className="text-cyan-100 text-sm mb-4 max-w-md mx-auto md:mx-0">
                Comprometidos com o Pacto Global da ONU e com certificação de material reciclado.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="inline-block bg-cyan-500/20 backdrop-blur-sm text-cyan-200 px-3 py-1.5 rounded-full text-xs border border-cyan-400/30">
                  🌍 Pacto Global
                </span>
                <span className="inline-block bg-cyan-500/20 backdrop-blur-sm text-cyan-200 px-3 py-1.5 rounded-full text-xs border border-cyan-400/30">
                  ✓ ISO 14001
                </span>
                <span className="inline-block bg-cyan-500/20 backdrop-blur-sm text-cyan-200 px-3 py-1.5 rounded-full text-xs border border-cyan-400/30">
                  ♻️ Material Reciclado
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
                2027
              </div>
              <p className="text-cyan-100 text-xs">Meta de <br />100% circular</p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mt-3 rounded-full" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Sustainability