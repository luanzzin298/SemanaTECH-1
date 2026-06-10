import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaArrowLeft, 
  FaFileContract, 
  FaCheckCircle, 
  FaGavel, 
  FaShieldAlt,
  FaChartLine,
  FaRegClock,
  FaBalanceScale,
  FaExclamationTriangle,
  FaInfoCircle,
  FaUsers,
  FaDatabase,
  FaRegLightbulb
} from 'react-icons/fa'
import { useEffect, useState, useRef } from 'react'

const TermosUso = () => {
  const [activeSection, setActiveSection] = useState('aceitacao')
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const { scrollYProgress } = useScroll()
  const sectionRef = useRef(null)

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

  // Scroll para o topo
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

  // Smooth scroll para seções
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  // Detectar seção ativa durante o scroll
  useEffect(() => {
    const sections = ['aceitacao', 'licenca', 'responsabilidade', 'limitacoes', 'alteracoes', 'lei']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Animações
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const secoes = [
    {
      id: 'aceitacao',
      icon: FaCheckCircle,
      title: '1. Aceitação dos Termos',
      content: 'Ao acessar e usar o site da H2B Plásticos, você concorda em cumprir estes Termos de Uso e todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.'
    },
    {
      id: 'licenca',
      icon: FaDatabase,
      title: '2. Uso da Licença',
      content: 'É concedida permissão para baixar temporariamente uma cópia dos materiais no site da H2B Plásticos apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título.',
      restrictions: [
        'Modificar ou copiar os materiais',
        'Usar os materiais para qualquer finalidade comercial',
        'Tentar descompilar ou fazer engenharia reversa de qualquer software do site',
        'Remover quaisquer direitos autorais ou outras notações de propriedade'
      ]
    },
    {
      id: 'responsabilidade',
      icon: FaShieldAlt,
      title: '3. Isenção de Responsabilidade',
      content: 'Os materiais no site da H2B Plásticos são fornecidos "como estão". A H2B Plásticos não oferece garantias, expressas ou implícitas, e por meio deste nega e anula todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual.'
    },
    {
      id: 'limitacoes',
      icon: FaExclamationTriangle,
      title: '4. Limitações',
      content: 'Em nenhum caso a H2B Plásticos ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em seu site.'
    },
    {
      id: 'alteracoes',
      icon: FaRegClock,
      title: '5. Alterações nos Termos',
      content: 'A H2B Plásticos pode revisar estes Termos de Uso a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual destes Termos de Uso.'
    },
    {
      id: 'lei',
      icon: FaBalanceScale,
      title: '6. Lei Aplicável',
      content: 'Estes termos e condições são regidos e interpretados de acordo com as leis do Brasil, e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.'
    }
  ]

  const pontosImportantes = [
    {
      icon: FaUsers,
      text: 'Uso exclusivamente pessoal e não comercial',
      description: 'Os materiais são apenas para visualização pessoal'
    },
    {
      icon: FaGavel,
      text: 'Proibida modificação ou cópia',
      description: 'Não é permitido alterar ou reproduzir os conteúdos'
    },
    {
      icon: FaRegLightbulb,
      text: 'Site fornecido "como está"',
      description: 'Sem garantias expressas ou implícitas'
    },
    {
      icon: FaChartLine,
      text: 'Termos sujeitos a alterações',
      description: 'Podem ser atualizados sem aviso prévio'
    }
  ]

  return (
    <section
      ref={sectionRef}
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

      {/* Padrão industrial de fundo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-3xl" />
      </div>

      {/* Barra de progresso de scroll */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="relative mb-12">
            {/* Badge de última atualização */}
            <div className="absolute top-0 right-0 bg-cyan-500/20 backdrop-blur-sm text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full border border-cyan-400/30">
              📅 Atualizado: {new Date().toLocaleDateString('pt-BR')}
            </div>

            {/* Botão voltar */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-all duration-300 group"
            >
              <div className="bg-cyan-500/20 backdrop-blur-sm p-2 rounded-full group-hover:bg-cyan-500/30 transition-colors border border-cyan-400/30">
                <FaArrowLeft className="text-sm" />
              </div>
              <span className="font-medium">Voltar para o início</span>
            </Link>

            {/* Hero Section */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur-xl opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-full shadow-lg">
                    <FaFileContract className="text-4xl text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
                variants={fadeUp}
              >
                <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                  Termos de
                </span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Uso
                </span>
              </motion.h1>
              
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-6 rounded-full"
                variants={fadeUp}
              />
              
              <motion.p 
                className="text-gray-300 text-lg max-w-2xl mx-auto"
                variants={fadeUp}
              >
                Leia atentamente nossos termos e condições antes de utilizar nossos serviços
              </motion.p>
            </div>

            {/* Menu de navegação rápida */}
            <div className="sticky top-20 z-40 bg-white/5 backdrop-blur-md rounded-2xl shadow-sm border border-white/10 p-2 mb-12">
              <div className="flex flex-wrap justify-center gap-2">
                {secoes.map((secao) => (
                  <button
                    key={secao.id}
                    onClick={() => scrollToSection(secao.id)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${activeSection === secao.id 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                        : 'text-gray-300 hover:bg-white/10'
                      }`}
                  >
                    {secao.title.split('.')[0]}. {secao.title.split('.')[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards de pontos importantes */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {pontosImportantes.map((ponto, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-md border border-white/10 hover:border-cyan-400/50 hover:shadow-cyan-500/20 transition-all duration-300 group"
              >
                <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ponto.icon className="text-cyan-400 text-xl" />
                </div>
                <h3 className="font-bold text-white mb-2">{ponto.text}</h3>
                <p className="text-gray-300 text-xs">{ponto.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Seções de conteúdo */}
          <div className="space-y-6">
            {secoes.map((secao) => (
              <motion.section
                key={secao.id}
                id={secao.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeUp}
                className="scroll-mt-24"
              >
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-sm border border-white/10 hover:border-cyan-400/50 hover:shadow-cyan-500/20 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <secao.icon className="text-cyan-400 text-xl" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">
                        {secao.title}
                      </h2>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {secao.content}
                      </p>
                      
                      {secao.restrictions && (
                        <div className="mt-4">
                          <p className="font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                            <FaGavel className="text-cyan-400" />
                            Não é permitido:
                          </p>
                          <ul className="space-y-2">
                            {secao.restrictions.map((restriction, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                <span className="text-cyan-400 mt-1">•</span>
                                <span>{restriction}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Banner informativo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-2xl p-6 border border-cyan-400/30"
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl">
                <FaInfoCircle className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-300 mb-2">Informação Importante</h3>
                <p className="text-gray-300 text-sm">
                  Ao continuar utilizando nosso site, você declara ter lido, entendido e concordado com todos os 
                  termos e condições estabelecidos neste documento. Recomendamos revisar periodicamente esta página 
                  para estar ciente de eventuais alterações.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Footer da página */}
          <div className="text-center pt-8 mt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} H2B Plásticos - Todos os direitos reservados
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link to="/politica-privacidade" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">
                Política de Privacidade
              </Link>
              <span className="text-gray-500">|</span>
              <Link to="/codigo-etica" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">
                Código de Ética
              </Link>
              <span className="text-gray-500">|</span>
              <Link to="/politica-cookies" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">
                Política de Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TermosUso