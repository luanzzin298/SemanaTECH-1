import { motion } from 'framer-motion'
import { 
  FaCheckCircle, FaRocket, FaRecycle, FaMedal, 
  FaChartLine, FaClock, FaAward, FaUsers, 
  FaLeaf, FaIndustry, FaBoxOpen, FaTruck,
  FaArrowRight, FaShieldAlt, FaThumbsUp
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

// ============================================
// DIFERENCIAIS ESPECÍFICOS DA H2B PLÁSTICOS
// ============================================

const DIFFERENTIALS_DATA = [
  {
    icon: FaMedal,
    title: 'Qualidade Premium',
    description: 'Certificação ISO 9001 e rigoroso controle de qualidade em todo processo produtivo.',
    stats: '+12 anos de excelência',
    color: 'cyan'
  },
  {
    icon: FaRecycle,
    title: 'Compromisso Sustentável',
    description: '+50 toneladas de plástico reciclado por mês. Redução ativa da pegada de carbono.',
    stats: 'Meta 2027: 100% circular',
    color: 'cyan'
  },
  {
    icon: FaRocket,
    title: 'Inovação Tecnológica',
    description: 'Laboratório próprio e parcerias com universidades para desenvolvimento de novas resinas.',
    stats: 'Pesquisa contínua',
    color: 'cyan'
  },
  {
    icon: FaClock,
    title: 'Agilidade na Entrega',
    description: 'Frota própria e logística otimizada para atender todo território nacional.',
    stats: 'Entregas em até 48h',
    color: 'cyan'
  },
  {
    icon: FaBoxOpen,
    title: 'Produtos Especializados',
    description: 'Garrafões de água mineral, tampas e embalagens para produtos lácteos de alta resistência.',
    stats: 'Referência nacional',
    color: 'cyan'
  },
  {
    icon: FaLeaf,
    title: 'Economia Circular',
    description: 'Reintegração de resíduos pós-consumo e pós-industrial à cadeia produtiva.',
    stats: '+50t/mês recicladas',
    color: 'cyan'
  },
  {
    icon: FaUsers,
    title: 'Atendimento Personalizado',
    description: 'Consultoria técnica especializada e soluções sob medida para cada cliente.',
    stats: 'Satisfação 98%',
    color: 'cyan'
  },
  {
    icon: FaTruck,
    title: 'Logística Eficiente',
    description: 'Entregas programadas e monitoradas para garantir o melhor prazo e segurança.',
    stats: 'Cobertura nacional',
    color: 'cyan'
  }
]

// ============================================
// ANIMAÇÕES
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
// COMPONENTE PRINCIPAL
// ============================================

const Differentials = () => {
  const firstRow = DIFFERENTIALS_DATA.slice(0, 4)
  const secondRow = DIFFERENTIALS_DATA.slice(4, 8)
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

  return (
    <section
      ref={sectionRef}
      id="differentials"
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
            className="inline-block bg-cyan-100 text-cyan-700 text-sm font-semibold px-4 py-1 rounded-full mb-3"
          >
            Vantagens Competitivas
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#001C30] mb-3">
            Diferenciais <span className="text-cyan-500">Competitivos</span>
          </h2>

          <div className="w-20 h-1 bg-cyan-400 mx-auto mb-4 rounded-full" />

          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Por que a H2B Plásticos é a escolha certa para sua empresa.
            Qualidade, inovação e sustentabilidade em cada solução.
          </p>
        </motion.div>

        {/* ========== PRIMEIRA LINHA ========== */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
        >
          {firstRow.map((diff, idx) => (
            <motion.div
              key={idx}
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
              <div className="relative p-5">

                {/* ÍCONE */}
                <div className="relative mb-4">
                  <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <diff.icon className="text-xl text-cyan-600" />
                  </div>

                  {/* GLOW */}
                  <div className="absolute inset-0 w-14 h-14 bg-cyan-400/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* TÍTULO */}
                <h3 className="text-base font-bold text-[#001C30] mb-2 group-hover:text-cyan-600 transition-colors duration-500">
                  {diff.title}
                </h3>

                {/* DESCRIÇÃO */}
                <p className="text-gray-500 text-xs leading-relaxed mb-3">
                  {diff.description}
                </p>

                {/* STATUS */}
                <div className="inline-block bg-cyan-50 px-2 py-0.5 rounded-full">
                  <span className="text-xs font-semibold text-cyan-600">
                    {diff.stats}
                  </span>
                </div>

                {/* LINHA ANIMADA */}
                <div className="w-10 h-0.5 bg-cyan-300 mt-4 rounded-full group-hover:w-20 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ========== SEGUNDA LINHA ========== */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {secondRow.map((diff, idx) => (
            <motion.div
              key={idx}
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
              <div className="relative p-5">

                {/* ÍCONE */}
                <div className="relative mb-4">
                  <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <diff.icon className="text-xl text-cyan-600" />
                  </div>

                  {/* GLOW */}
                  <div className="absolute inset-0 w-14 h-14 bg-cyan-400/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* TÍTULO */}
                <h3 className="text-base font-bold text-[#001C30] mb-2 group-hover:text-cyan-600 transition-colors duration-500">
                  {diff.title}
                </h3>

                {/* DESCRIÇÃO */}
                <p className="text-gray-500 text-xs leading-relaxed mb-3">
                  {diff.description}
                </p>

                {/* STATUS */}
                <div className="inline-block bg-cyan-50 px-2 py-0.5 rounded-full">
                  <span className="text-xs font-semibold text-cyan-600">
                    {diff.stats}
                  </span>
                </div>

                {/* LINHA ANIMADA */}
                <div className="w-10 h-0.5 bg-cyan-300 mt-4 rounded-full group-hover:w-20 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ========== BANNER PRINCIPAL H2B ========== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <div className="relative bg-gradient-to-r from-[#001C30] via-[#0A4A6E] to-[#001C30] rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" />
            
            <div className="relative p-6 md:p-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                
                {/* Lado esquerdo - Texto principal */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
                    <FaShieldAlt className="text-cyan-300 text-xs" />
                    <span className="text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                      Líder em Transformação Plástica
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                    Inovação que <span className="text-cyan-300">Transforma</span>
                    <br />
                    Sustentabilidade que <span className="text-cyan-300">Impulsiona</span>
                  </h3>
                  
                  <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 mb-5">
                    Soluções plásticas de alta performance para os mercados mais exigentes, 
                    com tecnologia de ponta e compromisso real com o futuro do planeta.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <Link
                      to="/contato"
                      className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group text-sm"
                    >
                      Solicitar Atendimento
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform text-sm" />
                    </Link>
                    
                    <Link
                      to="/produtos"
                      className="inline-flex items-center gap-2 border-2 border-cyan-400 hover:bg-cyan-400/10 text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-300 text-sm"
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
          animate="show"
          className="mt-12 flex flex-wrap justify-center gap-3"
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
          animate="show"
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-50 to-white rounded-2xl p-6 md:p-8 shadow-lg max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-[#001C30] mb-2">
              Pronto para transformar sua embalagem?
            </h3>
            <p className="text-gray-600 text-sm mb-5">
              Solicite uma cotação personalizada e conheça nossas soluções plásticas de alta performance.
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 
                         text-white font-semibold px-6 py-2.5 rounded-full 
                         transition-all duration-300 shadow-lg hover:shadow-xl 
                         hover:-translate-y-1 group text-sm"
            >
              Falar com um especialista
              <FaRocket className="group-hover:translate-x-1 transition-transform text-sm" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Differentials