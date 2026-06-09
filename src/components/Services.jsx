import { useState, useEffect, memo, useRef, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { 
  FaCheckCircle, FaArrowRight, FaClock, FaChartLine, 
  FaHandshake, FaShieldAlt, FaRocket, FaLeaf, FaTint, FaCog 
} from 'react-icons/fa'
import { services } from '../data/content'

// ============================================
// ANIMAÇÕES PADRONIZADAS
// ============================================

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const stagger = (delayChildren = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delayChildren } },
})

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1, 
    transition: { type: 'spring', stiffness: 200, damping: 20 } 
  },
}

// ============================================
// DADOS
// ============================================

const benefitsData = [
  { title: 'Atendimento Personalizado', desc: 'Consultores dedicados para cada cliente', icon: FaHandshake },
  { title: 'Suporte Técnico 24/7', desc: 'Equipe sempre disponível para emergências', icon: FaClock },
  { title: 'Relatórios Gerenciais', desc: 'Acompanhamento de KPIs e métricas', icon: FaChartLine },
  { title: 'Garantia de Qualidade', desc: 'Certificação ISO 9001 e controle rigoroso', icon: FaShieldAlt },
  { title: 'Inovação Contínua', desc: 'Laboratório próprio e novas soluções', icon: FaRocket },
  { title: 'Compromisso Sustentável', desc: 'Práticas ecológicas e economia circular', icon: FaLeaf },
]

// ============================================
// COMPONENTES
// ============================================

// Partículas flutuantes
const FloatingParticles = memo(() => {
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
})
FloatingParticles.displayName = 'FloatingParticles'

// Card de Serviço Premium
const ServiceCard = memo(({ svc, idx }) => {
  const Icon = svc.icon
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
    <motion.article
      ref={cardRef}
      variants={scaleIn}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className="group relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden 
                 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 
                 border border-white/10 hover:border-cyan-400/50"
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300" style={glowStyle} />
      
      <div className="relative p-6">
        {/* ÍCONE */}
        <div className="relative mb-5">
          <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-16 h-16 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
            <Icon className="text-2xl text-cyan-400" />
          </div>
          <div className="absolute inset-0 w-16 h-16 bg-cyan-400/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* TÍTULO */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-500">
          {svc.title}
        </h3>

        {/* DESCRIÇÃO */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {svc.desc}
        </p>

        {/* LINK */}
        <Link
          to="/contato"
          className="inline-flex items-center gap-2 text-cyan-400 font-semibold 
                     text-sm hover:gap-3 transition-all duration-300 group/link"
        >
          <span>Solicitar este serviço</span>
          <FaArrowRight className="text-xs group-hover/link:translate-x-1 transition-transform" />
        </Link>

        {/* LINHA ANIMADA */}
        <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 mt-5 rounded-full group-hover:w-24 transition-all duration-500" />
      </div>
    </motion.article>
  )
})
ServiceCard.displayName = 'ServiceCard'

// Card de Benefício Premium
const BenefitCard = memo(({ benefit, idx }) => {
  const BenefitIcon = benefit.icon
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -2
    const rotateY = ((x - centerX) / centerX) * 2
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)')
  }

  return (
    <motion.div
      ref={cardRef}
      variants={scaleIn}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      whileHover={{ y: -4 }}
      className="flex items-start gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-2xl 
                 shadow-md hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 
                 border border-white/10 hover:border-cyan-400/50 group cursor-pointer"
    >
      <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
        <BenefitIcon className="text-xl text-cyan-400" />
      </div>
      <div>
        <h3 className="font-bold text-white mb-1 text-base group-hover:text-cyan-400 transition-colors">
          {benefit.title}
        </h3>
        <p className="text-sm text-gray-300 leading-relaxed">{benefit.desc}</p>
      </div>
    </motion.div>
  )
})
BenefitCard.displayName = 'BenefitCard'

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const Services = () => {
  const sectionRef = useRef(null)
  const location = useLocation()
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  // Efeito de mouse para gradiente dinâmico
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

  // Verificar parâmetro ?form=true
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const shouldScrollToForm = params.get('form') === 'true'
    
    if (shouldScrollToForm) {
      setTimeout(() => {
        const formElement = document.getElementById('formulario-contato')
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          formElement.classList.add('ring-4', 'ring-cyan-300', 'ring-opacity-50')
          setTimeout(() => {
            formElement.classList.remove('ring-4', 'ring-cyan-300', 'ring-opacity-50')
          }, 2000)
        }
      }, 500)
    }
  }, [location])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="pt-24 pb-20 overflow-hidden relative min-h-screen bg-gradient-to-br from-[#001C30] via-[#001C30] to-[#0A4A6E]"
    >
      {/* Fundo com gradiente dinâmico seguindo o mouse */}
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
        
        {/* ========== CABEÇALHO ========== */}
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
            Soluções Completas
          </motion.span>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-4">
            <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
              Serviços
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Especializados
            </span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-6 rounded-full" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Da consultoria estratégica à logística inteligente, entregamos valor em cada etapa da sua cadeia produtiva.
          </p>
        </motion.div>

        {/* ========== GRID DE SERVIÇOS ========== */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {services.map((svc, idx) => (
            <ServiceCard key={svc.id || idx} svc={svc} idx={idx} />
          ))}
        </motion.div>

        {/* ========== POR QUE ESCOLHER A H2B ========== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              Por que escolher a{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                H2B Plásticos
              </span>
              ?
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefitsData.map((benefit, idx) => (
              <BenefitCard key={idx} benefit={benefit} idx={idx} />
            ))}
          </div>
        </motion.div>

        {/* ========== METODOLOGIA ========== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 text-white text-center shadow-xl overflow-hidden border border-white/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%2300D4FF&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Nossa Metodologia de Trabalho</h3>
              <p className="text-cyan-100/80 text-sm mb-10">Como transformamos ideias em soluções reais</p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { step: '01', title: 'Diagnóstico', desc: 'Análise detalhada das suas necessidades' },
                  { step: '02', title: 'Projeto', desc: 'Desenvolvimento da solução personalizada' },
                  { step: '03', title: 'Execução', desc: 'Implementação com acompanhamento' },
                  { step: '04', title: 'Otimização', desc: 'Melhoria contínua e suporte' },
                ].map((item, idx) => (
                  <div key={idx} className="text-center flex flex-col items-center group">
                    <span className="text-4xl font-black text-cyan-300 mb-2 block group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </span>
                    <div className="w-8 h-[2px] bg-cyan-400/40 my-2 group-hover:w-16 transition-all duration-300" />
                    <h4 className="font-bold text-white mb-1 text-base">{item.title}</h4>
                    <p className="text-xs text-cyan-100/70 max-w-[190px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========== NÚMEROS QUE COMPROVAM ========== */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { value: '200+', label: 'Clientes ativos' },
              { value: '98%', label: 'Taxa de satisfação' },
              { value: '24/7', label: 'Suporte técnico' },
              { value: '100%', label: 'Qualidade garantida' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl shadow-md 
                           border border-white/10 hover:shadow-xl hover:shadow-cyan-500/20 
                           transition-all duration-300 hover:border-cyan-400/50"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-300 mt-2 uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ========== CTA ========== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center"
        >

        </motion.div>

      </div>
    </section>
  )
}

export default Services