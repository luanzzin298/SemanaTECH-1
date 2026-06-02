import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  FaRecycle, FaIndustry, FaLeaf, FaTrophy,
  FaChartLine, FaUsers, FaCheckCircle, FaMapMarkerAlt,
  FaWater, FaBoxOpen, FaStar, FaHandsHelping
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
  },
  {
    icon: FaChartLine,
    title: 'Inovação Contínua',
    description: 'Laboratório próprio e parcerias com universidades para desenvolver novas resinas e processos.',
  },
  {
    icon: FaUsers,
    title: 'Relacionamento Transparente',
    description: 'Atendimento próximo, consultoria técnica e soluções sob medida para cada cliente.',
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
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

const stagger = (delayChildren = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delayChildren } },
})

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0, y: 30 },
  show: { scale: 1, opacity: 1, y: 0,
          transition: { type: 'spring', stiffness: 200 } },
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
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl text-center
                 shadow-md hover:shadow-xl transition-all duration-300 border border-cyan-100"
    >
      <div className="bg-cyan-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
        <Icon className="text-2xl text-cyan-600" aria-hidden="true" />
      </div>
      <div className="text-2xl font-bold text-[#001C30]">
        <span ref={numRef}>0</span>{suffix}
      </div>
      <p className="text-gray-500 text-xs mt-2">{label}</p>
    </motion.div>
  )
}

function ValueCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      className="bg-white p-6 rounded-2xl text-center shadow-lg border border-gray-100
                 hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 w-16 h-16 rounded-2xl
                      flex items-center justify-center mx-auto mb-4 shadow-lg
                      group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-2xl text-white" aria-hidden="true" />
      </div>
      <h4 className="text-lg font-bold text-[#001C30] mb-2">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

function ProductCard({ icon: Icon, title, description, highlight }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      className="bg-gradient-to-br from-cyan-50 to-white p-5 rounded-2xl text-center
                 shadow-md hover:shadow-xl transition-all duration-300 border border-cyan-100
                 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-400/5 rounded-full blur-2xl
                      group-hover:bg-cyan-400/10 transition-all" />
      <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3
                      shadow-md border border-cyan-100 group-hover:scale-110 transition-transform">
        <Icon className="text-xl text-cyan-600" aria-hidden="true" />
      </div>
      <h3 className="text-base font-bold text-[#001C30] mb-2">{title}</h3>
      <p className="text-gray-500 text-xs mb-3">{description}</p>
      <span className="inline-block bg-cyan-100 text-cyan-700 text-xs font-semibold 
                       px-3 py-1 rounded-full">
        {highlight}
      </span>
    </motion.div>
  )
}

function TimelineItem({ year, label, achieved, isLast }) {
  return (
    <div className={`relative ${!isLast ? 'pb-6' : ''}`}>
      {/* Linha conectora */}
      {!isLast && (
        <div className="absolute left-5 top-10 w-0.5 h-full bg-cyan-400/40" />
      )}
      <div className="flex gap-4">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-lg
                        ${achieved ? 'bg-cyan-400' : 'bg-cyan-600/50 border border-cyan-400/30'}`}>
          {achieved ? (
            <FaCheckCircle className="text-[#001C30] text-xs" />
          ) : (
            <FaStar className="text-cyan-200 text-xs" />
          )}
        </div>
        <div className="flex-1">
          <div className={`font-bold text-base ${achieved ? 'text-cyan-300' : 'text-cyan-400'}`}>
            {year}
          </div>
          <p className={`text-xs ${achieved ? 'text-gray-200' : 'text-gray-300'}`}>
            {label}
          </p>
        </div>
      </div>
    </div>
  )
}

function CheckBadge({ label }) {
  return (
    <div className="flex items-center gap-2 bg-cyan-50/50 px-3 py-1.5 rounded-full border border-cyan-100">
      <FaCheckCircle className="text-cyan-500 shrink-0 text-xs" aria-hidden="true" />
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  )
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const About = () => {
  const sectionRef = useRef(null)

  // Scroll automático para o topo da seção quando a página carregar
  useEffect(() => {
    // Força o scroll para o topo da seção sobre
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

  return (
    <section
      ref={sectionRef}
      className="pt-24 pb-20 bg-white overflow-hidden"
      aria-label="Sobre a H2B Plásticos"
      id="about-section"
    >
      <div className="container mx-auto px-6">

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
            className="inline-block bg-cyan-100 text-cyan-700 text-sm font-semibold
                       px-4 py-1 rounded-full mb-3"
          >
            Sobre nós
          </motion.span>

          <h1 className="text-3xl md:text-4xl font-bold text-[#001C30] mb-3">
            Sobre a <span className="text-cyan-500">H2B Plásticos</span>
          </h1>
          <div className="w-20 h-1 bg-cyan-400 mx-auto mb-4 rounded-full" />
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Uma indústria de destaque nacional sediada em Muriaé (MG), especialista na fabricação 
            de embalagens plásticas de alta qualidade.
          </p>
        </motion.div>

        {/* ========== NOSSA HISTÓRIA ========== */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <FaMapMarkerAlt className="text-cyan-500 text-lg" />
              <span className="text-cyan-600 font-semibold text-sm">Muriaé - MG</span>
            </div>
            <h2 className="text-xl font-bold text-[#001C30] mb-3 relative inline-block">
              Nossa História
              <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-cyan-400 rounded-full" />
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3 text-sm mt-3">
              Fundada em <span className="font-semibold text-cyan-600">2014</span>, a H2B Plásticos nasceu 
              em Muriaé (MG) com um propósito claro: oferecer soluções plásticas de alta performance 
              sem abrir mão da responsabilidade ambiental.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3 text-sm">
              Desde o início, nos especializamos na fabricação de <span className="font-semibold">garrafões de água mineral</span>, 
              <span className="font-semibold"> tampas para garrafões</span> e embalagens para 
              <span className="font-semibold"> produtos lácteos</span>, tornando-nos referência nacional 
              nesses segmentos.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Hoje, com tecnologia de ponta e compromisso com a economia circular, atendemos os 
              setores de água mineral, lácteos, alimentício, construção civil e logística, sempre 
              superando as expectativas de nossos clientes.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {CHECKS.map((label) => <CheckBadge key={label} label={label} />)}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-3 -left-3 w-24 h-24 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative bg-gradient-to-br from-[#001C30] to-[#0A4A6E] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://static.blocks-cms.com/h2bplasticos/upload/slide/6d7e083fa5224d66bd26394de530be51.png"
                alt="Fábrica H2B Plásticos em Muriaé - MG"
                loading="lazy"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Selo de destaque */}
            <div className="absolute -bottom-3 -left-3 bg-cyan-500 rounded-full p-2 shadow-lg">
              <FaTrophy className="text-white text-base" />
            </div>
          </motion.div>
        </div>

        {/* ========== ESPECIALIDADES ========== */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h3
            variants={fadeUp}
            className="text-xl font-bold text-center text-[#001C30] mb-3"
          >
            Nossas <span className="text-cyan-500">Especialidades</span>
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="text-center text-gray-600 text-sm mb-8 max-w-2xl mx-auto"
          >
            Com foco nos segmentos de água mineral e produtos lácteos, entregamos soluções 
            personalizadas de alta qualidade.
          </motion.p>
          <motion.div
            variants={stagger(0.1)}
            className="grid md:grid-cols-3 gap-5"
          >
            {PRODUCT_SPECIALTIES.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </motion.div>
        </motion.div>

        {/* ========== ESTATÍSTICAS ========== */}
        <section aria-label="Estatísticas da empresa" className="mb-16">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xl font-bold text-center text-[#001C30] mb-6"
          >
            Números que comprovam nossa{' '}
            <span className="text-cyan-500">excelência</span>
          </motion.h3>
          <motion.div
            variants={stagger()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </motion.div>
        </section>

        {/* ========== VALORES ========== */}
        <section aria-label="Valores e compromissos" className="mb-16">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-xl font-bold text-center text-[#001C30] mb-8"
          >
            Nossos <span className="text-cyan-500">Valores</span> e Compromissos
          </motion.h3>
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
          className="bg-gradient-to-r from-[#001C30] to-[#0A4A6E] rounded-2xl p-6 md:p-8 mb-16"
          aria-label="Linha do tempo da empresa"
        >
          <h3 className="text-xl font-bold text-center text-white mb-6">
            Nossa <span className="text-cyan-300">Jornada</span>
          </h3>
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

        {/* ========== CTA ========== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-cyan-50 to-white rounded-2xl p-6 md:p-8">
            <FaHandsHelping className="text-4xl text-cyan-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-[#001C30] mb-3">
              Pronto para transformar sua embalagem?
            </h3>
            <p className="text-gray-600 text-sm mb-5 max-w-xl mx-auto">
              Solicite uma cotação ou agende uma visita à nossa fábrica em Muriaé - MG.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/contato"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2.5 text-sm
                           rounded-full transition-all duration-300 shadow-lg hover:shadow-xl
                           hover:-translate-y-1"
              >
                Fale com um especialista
              </Link>
              <Link
                to="/produtos"
                className="border-2 border-[#001C30] text-[#001C30] hover:bg-[#001C30]
                           hover:text-white px-6 py-2.5 text-sm rounded-full transition-all duration-300
                           hover:-translate-y-1"
              >
                Conheça nossos produtos
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default About