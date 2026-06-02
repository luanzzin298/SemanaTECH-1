import { motion } from 'framer-motion'
import { 
  FaLeaf, FaSolarPanel, FaWater, FaHandsHelping, 
  FaRecycle, FaChartLine, FaAward, FaTree 
} from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Animações padronizadas
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 },
}

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0 },
}

const stagger = (delayChildren = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delayChildren } },
})

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200 } },
}

// Componente de contagem animada
const CountUp = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const increment = end / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
          return () => clearInterval(timer)
        }
      },
      { threshold: 0.3 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={countRef} className="text-3xl md:text-4xl font-bold text-cyan-500">
      {count}{suffix}
    </span>
  )
}

const Sustainability = () => {
  const sectionRef = useRef(null)

  // Scroll automático para o topo da seção quando a página carregar
  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        const offset = 70 // Compensação reduzida para o header fixo
        const elementPosition = sectionRef.current.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }, [])

  const sustainabilityMetrics = [
    { icon: FaRecycle, value: 50, suffix: 't/mês', label: 'Plástico reciclado', color: 'cyan' },
    { icon: FaSolarPanel, value: 40, suffix: '%', label: 'Energia renovável', color: 'cyan' },
    { icon: FaWater, value: 30, suffix: '%', label: 'Redução no consumo de água', color: 'cyan' },
    { icon: FaTree, value: 1000, suffix: '+', label: 'Árvores equivalentes preservadas', color: 'cyan' },
  ]

  const sustainabilityInitiatives = [
    {
      icon: FaLeaf,
      title: 'Economia Circular',
      description: 'Resíduos plásticos pós-consumo e pós-industrial são reintegrados à produção, gerando novo valor e reduzindo o descarte em aterros.',
      metrics: '85% de resíduos reciclados',
      color: 'cyan'
    },
    {
      icon: FaSolarPanel,
      title: 'Energia Solar',
      description: 'Investimos em usinas fotovoltaicas que já atendem 40% da demanda energética da fábrica, reduzindo significativamente nossa pegada de carbono.',
      metrics: '200 ton CO₂/ano evitadas',
      color: 'cyan'
    },
    {
      icon: FaWater,
      title: 'Reuso de Água',
      description: 'Sistema de captação e tratamento de água da chuva, com estação de reuso que reduz o consumo em 30% e protege os recursos hídricos.',
      metrics: '5 milhões L/ano economizados',
      color: 'cyan'
    },
    {
      icon: FaAward,
      title: 'Certificações',
      description: 'Somos signatários do Pacto Global da ONU e possuímos certificação ISO 14001 e selo de material reciclado pós-consumo.',
      metrics: 'Meta 2027: 100% circular',
      color: 'cyan'
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="sustainability" 
      className="pt-24 pb-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        
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
            className="inline-block bg-cyan-100 text-cyan-700 text-sm font-semibold
                       px-4 py-1 rounded-full mb-3"
          >
            Sustentabilidade
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#001C30] mb-3">
            Compromisso com o{' '}
            <span className="text-cyan-500">Planeta</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-400 mx-auto mb-4 rounded-full" />
          <p className="text-gray-600 text-base">
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
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-5 text-center shadow-md 
                         hover:shadow-xl transition-all duration-300
                         border border-cyan-100"
            >
              <div className="bg-cyan-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                <metric.icon className="text-2xl text-cyan-600" />
              </div>
              <CountUp end={metric.value} suffix={metric.suffix} />
              <p className="text-gray-500 text-xs mt-2">{metric.label}</p>
            </motion.div>
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
            <motion.div
              key={idx}
              variants={fadeLeft}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl 
                         transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex gap-4 items-start">
                <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 w-12 h-12 
                                rounded-xl flex items-center justify-center shadow-lg
                                group-hover:scale-110 transition-transform duration-300">
                  <initiative.icon className="text-xl text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#001C30] mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-2 text-sm">
                    {initiative.description}
                  </p>
                  <div className="inline-block bg-cyan-50 text-cyan-700 text-xs 
                                  font-semibold px-2 py-1 rounded-full">
                    {initiative.metrics}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Card de destaque */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          className="bg-gradient-to-r from-[#001C30] to-[#0A4A6E] rounded-2xl p-6 md:p-8 
                     text-center text-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-left">
              <FaHandsHelping className="text-4xl text-cyan-300 mb-3" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                +50 toneladas recicladas por mês
              </h3>
              <p className="text-cyan-100 text-sm mb-3">
                Comprometidos com o Pacto Global da ONU e com certificação de material reciclado.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-cyan-500/20 text-cyan-200 px-3 py-1 rounded-full text-xs">
                  🌍 Pacto Global
                </span>
                <span className="inline-block bg-cyan-500/20 text-cyan-200 px-3 py-1 rounded-full text-xs">
                  ✓ ISO 14001
                </span>
                <span className="inline-block bg-cyan-500/20 text-cyan-200 px-3 py-1 rounded-full text-xs">
                  ♻️ Material Reciclado
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-300 mb-1">2027</div>
              <p className="text-cyan-100 text-xs">Meta de <br />100% circular</p>
              <div className="w-16 h-0.5 bg-cyan-400 mx-auto mt-2 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* CTA - Chamada para ação */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-50 to-white rounded-2xl p-6 md:p-8 shadow-lg max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-[#001C30] mb-2">
              Faça parte dessa mudança
            </h3>
            <p className="text-gray-600 text-sm mb-5">
              Conheça nossas soluções sustentáveis e contribua para um futuro mais verde.
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 
                         text-white font-semibold px-6 py-2.5 rounded-full 
                         transition-all duration-300 shadow-lg hover:shadow-xl 
                         hover:-translate-y-1 group text-sm"
            >
              Fale com um especialista
              <FaHandsHelping className="group-hover:translate-x-1 transition-transform text-sm" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Sustainability