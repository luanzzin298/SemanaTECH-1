import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaRecycle, FaIndustry, FaLeaf, FaTrophy,
  FaChartLine, FaUsers, FaCheckCircle, FaMapMarkerAlt,
  FaWater, FaBoxOpen, FaStar, FaHandsHelping,
  FaQuoteLeft, FaShieldAlt, FaAward, FaRocket
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { company } from '../data/content'

// ============================================
// DADOS ATUALIZADOS DA EMPRESA
// ============================================

const STATS = [
  { icon: FaIndustry,  value: company.employees,      label: 'Funcionários',             suffix: '+' },
  { icon: FaUsers,     value: company.clients,        label: 'Clientes ativos',          suffix: '+' },
  { icon: FaRecycle,   value: company.recycledMonthly, label: 'Toneladas recicladas/mês', suffix: 't' },
  { icon: FaTrophy,    value: new Date().getFullYear() - company.founded,
                                                        label: 'Anos de experiência',      suffix: '+' },
]

const VALUES = [
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

const PRODUCT_SPECIALTIES = [
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

const TIMELINE = [
  { year: '2014', label: 'Fundação da H2B em Muriaé-MG', achieved: true },
  { year: '2016', label: 'Início da produção de garrafões', achieved: true },
  { year: '2018', label: 'Expansão para tampas e lácteos', achieved: true },
  { year: '2020', label: 'Certificação ISO 9001', achieved: true },
  { year: '2023', label: 'Reconhecimento nacional', achieved: true },
  { year: '2026', label: 'Meta de expansão e inovação', achieved: false },
]

const CHECKS = ['Certificação ISO 9001', 'Selo Verde', 'Destaque Nacional', '+50t recicladas/mês']

// ============================================
// ANIMAÇÕES
// ============================================

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
}

const stagger = (delayChildren = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delayChildren } },
})

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0, y: 30 },
  show: { scale: 1, opacity: 1, y: 0,
          transition: { type: 'spring', stiffness: 200, damping: 20 } },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

// ============================================
// COMPONENTES
// ============================================

function useCountUp(target, duration = 1500) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      el.textContent = Math.floor(progress * target)
      if (progress < 1) requestAnimationFrame(step)
      else el.textContent = target
    }
    requestAnimationFrame(step)
  }, [target, duration])
  return ref
}

function StatCard({ icon: Icon, value, label, suffix }) {
  const numRef = useCountUp(value)
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      <div className="relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl text-center
                     shadow-lg hover:shadow-2xl transition-all duration-500 border border-cyan-100
                     group-hover:border-cyan-300">
        <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-16 h-16 rounded-2xl 
                        flex items-center justify-center mx-auto mb-4 shadow-lg
                        group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          <Icon className="text-2xl text-white" aria-hidden="true" />
        </div>
        <div className="text-3xl font-bold bg-gradient-to-r from-[#001C30] to-cyan-600 bg-clip-text text-transparent">
          <span ref={numRef}>0</span>{suffix}
        </div>
        <p className="text-gray-500 text-sm mt-2 font-medium">{label}</p>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-3/4 transition-all duration-500 rounded-full" />
      </div>
    </motion.div>
  )
}

function ValueCard({ icon: Icon, title, description, color }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -10 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-white p-8 rounded-2xl text-center shadow-lg border border-gray-100
                     hover:shadow-2xl transition-all duration-500 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/5 to-transparent rounded-full blur-2xl" />
        <div className={`bg-gradient-to-br ${color} w-20 h-20 rounded-2xl
                        flex items-center justify-center mx-auto mb-5 shadow-xl
                        group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
          <Icon className="text-3xl text-white" aria-hidden="true" />
        </div>
        <h4 className="text-xl font-bold text-[#001C30] mb-3">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.div>
  )
}

function ProductCard({ icon: Icon, title, description, highlight }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className="relative bg-gradient-to-br from-cyan-50 to-white p-6 rounded-2xl text-center
                     shadow-md hover:shadow-xl transition-all duration-500 border border-cyan-100
                     overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-full blur-2xl
                        group-hover:bg-cyan-400/10 transition-all duration-500" />
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-400/5 rounded-full blur-2xl" />
        
        <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4
                        shadow-md border border-cyan-100 group-hover:scale-110 group-hover:rotate-6 
                        transition-all duration-300 relative z-10">
          <Icon className="text-2xl text-cyan-600" aria-hidden="true" />
        </div>
        
        <h3 className="text-lg font-bold text-[#001C30] mb-2 relative z-10">{title}</h3>
        <p className="text-gray-500 text-sm mb-4 relative z-10">{description}</p>
        
        <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-xs font-semibold 
                         px-4 py-1.5 rounded-full relative z-10 shadow-md">
          {highlight}
        </span>
      </div>
    </motion.div>
  )
}

function TimelineItem({ year, label, achieved, isLast }) {
  return (
    <div className={`relative ${!isLast ? 'pb-8' : ''}`}>
      {!isLast && (
        <div className="absolute left-5 top-10 w-0.5 h-full bg-gradient-to-b from-cyan-400 to-blue-600/30" />
      )}
      <div className="flex gap-4 group">
        <div className="relative">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg
                          transition-all duration-300 group-hover:scale-110
                          ${achieved ? 'bg-gradient-to-br from-cyan-400 to-blue-600' : 'bg-gradient-to-br from-cyan-600/50 to-blue-400/30 border border-cyan-400/30'}`}>
            {achieved ? (
              <FaCheckCircle className="text-white text-sm" />
            ) : (
              <FaStar className="text-cyan-200 text-sm" />
            )}
          </div>
          {achieved && (
            <div className="absolute inset-0 bg-cyan-400 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          )}
        </div>
        <div className="flex-1 pt-1">
          <div className={`font-bold text-base ${achieved ? 'text-cyan-300' : 'text-cyan-400'}`}>
            {year}
          </div>
          <p className={`text-sm ${achieved ? 'text-gray-200' : 'text-gray-300'} leading-relaxed`}>
            {label}
          </p>
        </div>
      </div>
    </div>
  )
}

function CheckBadge({ label }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, x: 3 }}
      className="flex items-center gap-2 bg-gradient-to-r from-cyan-50 to-white px-3 py-2 rounded-full border border-cyan-100 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <FaCheckCircle className="text-cyan-500 shrink-0 text-sm" aria-hidden="true" />
      <span className="text-sm text-gray-700 font-medium">{label}</span>
    </motion.div>
  )
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const About = () => {
  const sectionRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        const offset = 70
        const elementPosition = sectionRef.current.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="pt-24 pb-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden relative"
      aria-label="Sobre a H2B Plásticos"
      id="about-section"
    >
      {/* Fundo com gradiente dinâmico */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0) 50%)`
          }}
        />
      </div>

      {/* Padrão decorativo de fundo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* ========== CABEÇALHO ========== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm font-semibold
                       px-5 py-1.5 rounded-full mb-4 shadow-sm"
          >
            Sobre nós
          </motion.span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#001C30] mb-4">
            Sobre a <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">H2B Plásticos</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Uma indústria de destaque nacional sediada em Muriaé (MG), especialista na fabricação 
            de embalagens plásticas de alta qualidade.
          </p>
        </motion.div>

        {/* ========== NOSSA HISTÓRIA ========== */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-600 p-1.5 rounded-lg">
                <FaMapMarkerAlt className="text-white text-base" />
              </div>
              <span className="text-cyan-600 font-semibold text-sm">Muriaé - MG</span>
            </div>
            <h2 className="text-3xl font-bold text-[#001C30] mb-4 relative inline-block">
              Nossa História
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full" />
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-base mt-4">
              Fundada em <span className="font-semibold text-cyan-600">2014</span>, a H2B Plásticos nasceu 
              em Muriaé (MG) com um propósito claro: oferecer soluções plásticas de alta performance 
              sem abrir mão da responsabilidade ambiental.
            </p>
            <div className="relative pl-4 border-l-2 border-cyan-400 mb-4">
              <p className="text-gray-600 leading-relaxed text-base italic">
                "Desde o início, nos especializamos na fabricação de <span className="font-semibold text-cyan-600">garrafões de água mineral</span>, 
                <span className="font-semibold text-cyan-600"> tampas para garrafões</span> e embalagens para 
                <span className="font-semibold text-cyan-600"> produtos lácteos</span>, tornando-nos referência nacional 
                nesses segmentos."
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed text-base mb-6">
              Hoje, com tecnologia de ponta e compromisso com a economia circular, atendemos os 
              setores de água mineral, lácteos, alimentício, construção civil e logística, sempre 
              superando as expectativas de nossos clientes.
            </p>
            <div className="flex flex-wrap gap-3">
              {CHECKS.map((label) => <CheckBadge key={label} label={label} />)}
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative bg-gradient-to-br from-[#001C30] to-[#0A4A6E] rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://static.blocks-cms.com/h2bplasticos/upload/slide/6d7e083fa5224d66bd26394de530be51.png"
                alt="Fábrica H2B Plásticos em Muriaé - MG"
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001C30]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Selo de destaque */}
            <motion.div 
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-3 shadow-xl"
            >
              <FaTrophy className="text-white text-xl" />
            </motion.div>
          </motion.div>
        </div>

        {/* ========== ESPECIALIDADES ========== */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            variants={fadeUp}
            className="text-3xl font-bold text-center text-[#001C30] mb-4"
          >
            Nossas <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Especialidades</span>
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="text-center text-gray-600 text-base mb-10 max-w-2xl mx-auto"
          >
            Com foco nos segmentos de água mineral e produtos lácteos, entregamos soluções 
            personalizadas de alta qualidade.
          </motion.p>
          <motion.div
            variants={stagger(0.1)}
            className="grid md:grid-cols-3 gap-6"
          >
            {PRODUCT_SPECIALTIES.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </motion.div>
        </motion.div>

        {/* ========== ESTATÍSTICAS ========== */}
        <section aria-label="Estatísticas da empresa" className="mb-20">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-[#001C30] mb-4"
          >
            Números que comprovam nossa{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">excelência</span>
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="text-center text-gray-600 text-base mb-10 max-w-2xl mx-auto"
          >
            Resultados que refletem nosso compromisso com a qualidade e inovação
          </motion.p>
          <motion.div
            variants={stagger()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </motion.div>
        </section>

        {/* ========== VALORES ========== */}
        <section aria-label="Valores e compromissos" className="mb-20">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-[#001C30] mb-4"
          >
            Nossos <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Valores</span> e Compromissos
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="text-center text-gray-600 text-base mb-10 max-w-2xl mx-auto"
          >
            Princípios que guiam nossas ações e decisões diariamente
          </motion.p>
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {VALUES.map((v) => <ValueCard key={v.title} {...v} />)}
          </motion.div>
        </section>

        {/* ========== LINHA DO TEMPO ========== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-[#001C30] to-[#0A4A6E] rounded-2xl p-8 md:p-10 mb-20 overflow-hidden"
          aria-label="Linha do tempo da empresa"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%2300D4FF&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          
          <motion.h3 
            variants={fadeUp}
            className="text-3xl font-bold text-center text-white mb-3"
          >
            Nossa <span className="text-cyan-300">Jornada</span>
          </motion.h3>
          <motion.p 
            variants={fadeUp}
            className="text-center text-cyan-100 text-base mb-10"
          >
            Conheça os marcos da nossa história
          </motion.p>
          
          <div className="max-w-2xl mx-auto">
            {TIMELINE.map((item, idx) => (
              <TimelineItem 
                key={idx} 
                {...item} 
                isLast={idx === TIMELINE.length - 1} 
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default About