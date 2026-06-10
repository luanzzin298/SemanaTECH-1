import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaArrowLeft, 
  FaShieldAlt, 
  FaDatabase, 
  FaChartLine, 
  FaShareAlt,
  FaLock,
  FaUserCheck,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
  FaCookie,
  FaUserSecret,
  FaRegClock
} from 'react-icons/fa'
import { useEffect, useState, useRef } from 'react'

const PoliticaPrivacidade = () => {
  const [activeSection, setActiveSection] = useState('coletamos')
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
    const sections = ['coletamos', 'usamos', 'compartilhamento', 'seguranca', 'direitos', 'contato']
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
      id: 'coletamos',
      icon: FaDatabase,
      title: '1. Informações que Coletamos',
      description: 'Na H2B Plásticos, valorizamos sua privacidade e estamos comprometidos em proteger seus dados pessoais. Coletamos informações que você nos fornece diretamente, como:',
      items: [
        'Nome completo e dados de contato',
        'Endereço de e-mail e telefone',
        'Informações de empresa e cargo',
        'Dados de navegação no nosso site',
        'Histórico de compras e interações',
        'Preferências de comunicação'
      ]
    },
    {
      id: 'usamos',
      icon: FaChartLine,
      title: '2. Como Usamos suas Informações',
      description: 'Utilizamos seus dados para:',
      items: [
        'Processar seus pedidos e solicitações de orçamento',
        'Enviar atualizações sobre nossos produtos e serviços',
        'Melhorar nossa experiência de navegação no site',
        'Cumprir obrigações legais e regulatórias',
        'Personalizar conteúdo e ofertas',
        'Realizar pesquisas e análises estatísticas'
      ]
    },
    {
      id: 'compartilhamento',
      icon: FaShareAlt,
      title: '3. Compartilhamento de Dados',
      description: 'Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros sem seu consentimento, exceto quando necessário para operar nosso site, conduzir nossos negócios ou cumprir a lei.',
      items: [
        'Parceiros de serviços essenciais (processamento de pagamentos, envio de e-mails)',
        'Autoridades legais quando exigido por lei',
        'Com seu consentimento explícito'
      ]
    },
    {
      id: 'seguranca',
      icon: FaLock,
      title: '4. Segurança dos Dados',
      description: 'Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.',
      items: [
        'Criptografia de dados sensíveis',
        'Firewalls e sistemas de detecção de intrusão',
        'Controles de acesso rigorosos',
        'Monitoramento contínuo de segurança',
        'Backups regulares e seguros'
      ]
    },
    {
      id: 'direitos',
      icon: FaUserCheck,
      title: '5. Seus Direitos (LGPD)',
      description: 'De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:',
      items: [
        'Acessar seus dados pessoais a qualquer momento',
        'Corrigir dados inexatos ou incompletos',
        'Solicitar a exclusão de seus dados',
        'Revogar seu consentimento a qualquer momento',
        'Solicitar a portabilidade dos dados',
        'Opor-se ao tratamento de dados'
      ]
    },
    {
      id: 'contato',
      icon: FaEnvelope,
      title: '6. Contato (Encarregado de Dados)',
      description: 'Se tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados, entre em contato com nosso Encarregado de Dados (DPO):',
      items: [
        '📧 E-mail: contato@h2bplasticos.com.br',
        '📞 Telefone: (32) 3721-3510',
        '📍 Endereço: BR-116, KM 713 - Santa Helena, Muriaé - MG',
        '⏰ Horário: Segunda a Sexta, 8h às 18h'
      ]
    }
  ]

  const principios = [
    {
      icon: FaUserSecret,
      title: 'Privacidade por Design',
      description: 'Incorporamos proteção de dados desde a concepção'
    },
    {
      icon: FaCookie,
      title: 'Cookies e Rastreamento',
      description: 'Usamos cookies apenas para melhorar sua experiência'
    },
    {
      icon: FaRegClock,
      title: 'Retenção de Dados',
      description: 'Mantemos dados apenas pelo tempo necessário'
    },
    {
      icon: FaCheckCircle,
      title: 'Consentimento Claro',
      description: 'Solicitamos permissão explícita para coleta de dados'
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
                    <FaShieldAlt className="text-4xl text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
                variants={fadeUp}
              >
                <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                  Política de
                </span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Privacidade
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
                Sua privacidade é nossa prioridade. Saiba como protegemos seus dados pessoais
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

          {/* Cards de princípios */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {principios.map((principio, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-md border border-white/10 hover:border-cyan-400/50 hover:shadow-cyan-500/20 transition-all duration-300 group"
              >
                <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <principio.icon className="text-cyan-400 text-xl" />
                </div>
                <h3 className="font-bold text-white mb-2">{principio.title}</h3>
                <p className="text-gray-300 text-xs">{principio.description}</p>
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
                        {secao.description}
                      </p>
                      
                      <ul className="space-y-2">
                        {secao.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className="text-cyan-400 mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {secao.id === 'contato' && (
                        <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-gray-200 font-medium mb-2">
                            🛡️ Encarregado de Dados (DPO):
                          </p>
                          <p className="text-gray-300 text-sm">
                            Nosso DPO está disponível para esclarecer dúvidas sobre o tratamento de seus dados pessoais.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Banner informativo sobre LGPD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-2xl p-6 border border-cyan-400/30"
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-300 mb-2">
                  Conformidade com a LGPD (Lei 13.709/2018)
                </h3>
                <p className="text-gray-300 text-sm">
                  A H2B Plásticos está totalmente em conformidade com a Lei Geral de Proteção de Dados, 
                  garantindo que seus dados sejam tratados com transparência, segurança e respeito aos 
                  seus direitos fundamentais de privacidade.
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
              <Link to="/termos-uso" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">
                Termos de Uso
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

export default PoliticaPrivacidade