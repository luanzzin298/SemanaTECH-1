import { motion } from 'framer-motion'
import { 
  FaCheckCircle, FaRocket, FaRecycle, FaMedal, 
  FaChartLine, FaClock, FaAward, FaUsers, 
  FaLeaf, FaIndustry, FaBoxOpen, FaTruck,
  FaArrowRight, FaShieldAlt, FaThumbsUp
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

// ============================================
// DIFERENCIAIS ESPECÍFICOS DA H2B PLÁSTICOS
// ============================================

const DIFFERENTIALS_DATA = [
  {
    icon: FaMedal,
    title: 'Qualidade Premium',
    description: 'Certificação ISO 9001 e rigoroso controle de qualidade em todo processo produtivo.',
    stats: '+12 anos de excelência',
  },
  {
    icon: FaRecycle,
    title: 'Compromisso Sustentável',
    description: '+50 toneladas de plástico reciclado por mês. Redução ativa da pegada de carbono.',
    stats: 'Meta 2027: 100% circular',
  },
  {
    icon: FaRocket,
    title: 'Inovação Tecnológica',
    description: 'Laboratório próprio e parcerias com universidades para desenvolvimento de novas resinas.',
    stats: 'Pesquisa contínua',
  },
  {
    icon: FaClock,
    title: 'Agilidade na Entrega',
    description: 'Frota própria e logística otimizada para atender todo território nacional.',
    stats: 'Entregas em até 48h',
  },
  {
    icon: FaBoxOpen,
    title: 'Produtos Especializados',
    description: 'Garrafões de água mineral, tampas e embalagens para produtos lácteos de alta resistência.',
    stats: 'Referência nacional',
  },
  {
    icon: FaLeaf,
    title: 'Economia Circular',
    description: 'Reintegração de resíduos pós-consumo e pós-industrial à cadeia produtiva.',
    stats: '+50t/mês recicladas',
  },
  {
    icon: FaUsers,
    title: 'Atendimento Personalizado',
    description: 'Consultoria técnica especializada e soluções sob medida para cada cliente.',
    stats: 'Satisfação 98%',
  },
  {
    icon: FaTruck,
    title: 'Logística Eficiente',
    description: 'Entregas programadas e monitoradas para garantir o melhor prazo e segurança.',
    stats: 'Cobertura nacional',
  }
]

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
  hidden: { scale: 0.8, opacity: 0, y: 30 },
  show: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 } 
  },
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const Differentials = () => {
  const sectionRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  return (
    <section
      ref={sectionRef}
      id="differentials"
      className="pt-24 pb-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden relative"
    >
      {/* Fundo com gradiente dinâmico */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0) 50%)`
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
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm font-semibold
                       px-4 py-1.5 rounded-full mb-4 shadow-sm"
          >
            Vantagens Competitivas
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#001C30] mb-3">
            Diferenciais <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Competitivos</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-4 rounded-full" />

          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Por que a H2B Plásticos é a escolha certa para sua empresa.
            Qualidade, inovação e sustentabilidade em cada solução.
          </p>
        </motion.div>

        {/* ========== GRID DE DIFERENCIAIS ========== */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {DIFFERENTIALS_DATA.map((diff, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden 
                         shadow-lg hover:shadow-2xl transition-all duration-500 
                         border border-gray-100"
            >
              {/* EFEITO DE FUNDO */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* CONTEÚDO */}
              <div className="relative p-6">

                {/* ÍCONE */}
                <div className="relative mb-5">
                  <div className="bg-gradient-to-br from-cyan-100 to-blue-100 w-16 h-16 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <diff.icon className="text-2xl text-cyan-600" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 bg-cyan-400/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* TÍTULO */}
                <h3 className="text-lg font-bold text-[#001C30] mb-2 group-hover:text-cyan-600 transition-colors duration-500">
                  {diff.title}
                </h3>

                {/* DESCRIÇÃO */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {diff.description}
                </p>

                {/* STATUS */}
                <div className="inline-block bg-gradient-to-r from-cyan-50 to-blue-50 px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-cyan-600">
                    {diff.stats}
                  </span>
                </div>

                {/* LINHA ANIMADA */}
                <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 mt-5 rounded-full group-hover:w-24 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ========== BANNER PRINCIPAL H2B ========== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative bg-gradient-to-br from-[#001C30] to-[#0A4A6E] rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%2300D4FF&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
            
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                
                {/* Lado esquerdo - Texto principal */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
                    <FaShieldAlt className="text-cyan-300 text-xs" />
                    <span className="text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                      Líder em Transformação Plástica
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                    Inovação que <span className="text-cyan-300">Transforma</span>
                    <br />
                    Sustentabilidade que <span className="text-cyan-300">Impulsiona</span>
                  </h3>
                  
                  <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 mb-6">
                    Soluções plásticas de alta performance para os mercados mais exigentes, 
                    com tecnologia de ponta e compromisso real com o futuro do planeta.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <Link
                      to="/contato"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group text-sm"
                    >
                      Solicitar Atendimento
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform text-sm" />
                    </Link>
                    
                    <Link
                      to="/produtos"
                      className="inline-flex items-center gap-2 border-2 border-cyan-400 hover:bg-cyan-400/10 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 text-sm"
                    >
                      Conhecer Produtos
                    </Link>
                  </div>
                </div>

                {/* Lado direito - Métricas e indicadores */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Métrica 1 */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/15 transition-all duration-300 group">
                      <div className="text-3xl font-bold text-cyan-300 mb-1 group-hover:scale-110 transition-transform duration-300">
                        50+
                      </div>
                      <div className="text-xs font-semibold text-white mb-1">
                        Toneladas Recicladas
                      </div>
                      <p className="text-xs text-gray-300">
                        por mês
                      </p>
                    </div>

                    {/* Métrica 2 */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/15 transition-all duration-300 group">
                      <div className="text-3xl font-bold text-cyan-300 mb-1 group-hover:scale-110 transition-transform duration-300">
                        98%
                      </div>
                      <div className="text-xs font-semibold text-white mb-1">
                        Satisfação
                      </div>
                      <p className="text-xs text-gray-300">
                        dos clientes
                      </p>
                    </div>

                    {/* Métrica 3 */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/15 transition-all duration-300 group">
                      <div className="text-3xl font-bold text-cyan-300 mb-1 group-hover:scale-110 transition-transform duration-300">
                        12+
                      </div>
                      <div className="text-xs font-semibold text-white mb-1">
                        Anos
                      </div>
                      <p className="text-xs text-gray-300">
                        de experiência
                      </p>
                    </div>

                    {/* Métrica 4 */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/15 transition-all duration-300 group">
                      <div className="text-3xl font-bold text-cyan-300 mb-1 group-hover:scale-110 transition-transform duration-300">
                        24/7
                      </div>
                      <div className="text-xs font-semibold text-white mb-1">
                        Suporte
                      </div>
                      <p className="text-xs text-gray-300">
                        especializado
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* ========== SELOS ========== */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16 flex flex-wrap justify-center gap-3"
        >
          {[
            { text: 'Certificação ISO 9001', icon: FaAward },
            { text: 'Selo Verde', icon: FaLeaf },
            { text: 'Qualidade Garantida', icon: FaCheckCircle },
            { text: 'Compromisso Ambiental', icon: FaRecycle },
            { text: 'Excelência Operacional', icon: FaThumbsUp },
            { text: 'Inovação Contínua', icon: FaRocket },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-md border border-cyan-100 hover:shadow-xl transition-all duration-500 hover:border-cyan-300"
            >
              <item.icon className="text-cyan-500 text-xs" />
              <span className="text-gray-700 text-xs font-medium">
                {item.text}
              </span>
            </motion.div>
          ))}
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

export default Differentials