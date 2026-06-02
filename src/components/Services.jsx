import { useState, useEffect, memo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FaCheckCircle, FaArrowRight, FaClock, FaChartLine, FaHandshake, FaShieldAlt, FaRocket, FaLeaf } from 'react-icons/fa'
import { services } from '../data/content'

// ============================================
// ANIMAÇÕES PADRONIZADAS (MESMAS DOS OUTROS COMPONENTES)
// ============================================

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
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
    transition: { type: 'spring', stiffness: 200 } 
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

const ServiceCard = memo(({ svc, idx }) => {
  const Icon = svc.icon
  
  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl overflow-hidden 
                 shadow-lg hover:shadow-2xl transition-all duration-500 
                 border border-gray-100"
    >
      {/* EFEITO DE FUNDO */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* BORDA BRILHO */}
      <div className="absolute inset-0 rounded-2xl border border-cyan-200/0 group-hover:border-cyan-200/70 transition-all duration-500" />

      {/* CONTEÚDO */}
      <div className="relative p-6">

        {/* ÍCONE */}
        <div className="relative mb-5">
          <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 w-16 h-16 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
            <Icon className="text-2xl text-cyan-600" />
          </div>

          {/* GLOW */}
          <div className="absolute inset-0 w-16 h-16 bg-cyan-400/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* TÍTULO */}
        <h3 className="text-lg font-bold text-[#001C30] mb-2 group-hover:text-cyan-600 transition-colors duration-500">
          {svc.title}
        </h3>

        {/* DESCRIÇÃO */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {svc.desc}
        </p>

        {/* LINK */}
        <Link
          to="/contato"
          className="inline-flex items-center gap-2 text-cyan-600 font-semibold 
                     text-sm hover:gap-3 transition-all duration-300 group/link"
        >
          <span>Solicitar este serviço</span>
          <FaArrowRight className="text-xs group-hover/link:translate-x-1 transition-transform" />
        </Link>

        {/* LINHA ANIMADA */}
        <div className="w-12 h-0.5 bg-cyan-300 mt-5 rounded-full group-hover:w-24 transition-all duration-500" />
      </div>
    </motion.article>
  )
})
ServiceCard.displayName = 'ServiceCard'

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const Services = () => {
  const sectionRef = useRef(null)
  const location = useLocation()

  // Scroll automático para o topo da seção quando a página carregar
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

  // Verificar se veio com o parâmetro ?form=true
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const shouldScrollToForm = params.get('form') === 'true'
    
    if (shouldScrollToForm) {
      setTimeout(() => {
        const formElement = document.getElementById('formulario-contato')
        if (formElement) {
          formElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          })
          formElement.classList.add('ring-4', 'ring-cyan-300', 'ring-opacity-50')
          setTimeout(() => {
            if (formElement) {
              formElement.classList.remove('ring-4', 'ring-cyan-300', 'ring-opacity-50')
            }
          }, 2000)
        }
      }, 500)
    }
  }, [location])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="pt-24 pb-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
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
                       px-4 py-1 rounded-full mb-4"
          >
            Soluções Completas
          </motion.span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#001C30] mb-4">
            Serviços <span className="text-cyan-500">Especializados</span>
          </h1>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Da consultoria estratégica à logística inteligente, entregamos valor em cada etapa da sua cadeia produtiva.
          </p>
        </motion.div>

        {/* ========== GRID DE SERVIÇOS ========== */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
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
            <h2 className="text-2xl font-bold text-[#001C30] mb-3">
              Por que escolher a <span className="text-cyan-500">H2B Plásticos</span>?
            </h2>
            <div className="w-16 h-0.5 bg-cyan-400 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsData.map((benefit, idx) => {
              const BenefitIcon = benefit.icon
              return (
                <motion.div
                  key={idx}
                  variants={scaleIn}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <BenefitIcon className="text-xl text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#001C30] mb-1 text-base group-hover:text-cyan-600 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{benefit.desc}</p>
                  </div>
                </motion.div>
              )
            })}
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
          <div className="bg-gradient-to-r from-[#001C30] to-[#0A4A6E] rounded-3xl p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Nossa Metodologia de Trabalho</h3>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                className="text-center p-6 bg-white rounded-2xl shadow-md border border-cyan-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl font-bold text-cyan-600">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">{stat.label}</p>
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
          <div className="bg-gradient-to-r from-cyan-50 to-white rounded-2xl p-8 md:p-10 shadow-lg border border-cyan-100 max-w-3xl mx-auto">
            <FaCheckCircle className="text-5xl text-cyan-500 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-[#001C30] mb-3">
              Pronto para elevar a qualidade da sua embalagem?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-base">
              Entre em contato com nossos especialistas e descubra como podemos otimizar seus processos e reduzir custos.
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 
                         text-white font-semibold px-8 py-3 rounded-full 
                         transition-all duration-300 shadow-lg hover:shadow-xl 
                         hover:-translate-y-1 group"
            >
              Solicitar proposta comercial
              <FaRocket className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Services