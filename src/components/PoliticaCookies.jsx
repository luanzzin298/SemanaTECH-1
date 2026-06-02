import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaArrowLeft, 
  FaCookie, 
  FaCookieBite,
  FaDatabase,
  FaChartLine,
  FaUserCheck,
  FaAd,
  FaChrome,
  FaFirefox,
  FaSafari,
  FaEdge,
  FaShieldAlt,
  FaRegClock,
  FaCheckCircle,
  FaInfoCircle
} from 'react-icons/fa'
import { useEffect, useState } from 'react'

const PoliticaCookies = () => {
  const [activeSection, setActiveSection] = useState('o-que-sao')
  const { scrollYProgress } = useScroll()

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
    const sections = ['o-que-sao', 'como-usamos', 'tipos', 'gerenciamento', 'configuracoes']
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

  const tiposCookies = [
    {
      icon: FaDatabase,
      title: 'Cookies Essenciais',
      description: 'Necessários para o funcionamento básico do site',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      example: 'Autenticação, segurança, carrinho de compras'
    },
    {
      icon: FaChartLine,
      title: 'Cookies de Desempenho',
      description: 'Nos ajudam a entender como os visitantes interagem com o site',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      example: 'Páginas mais visitadas, tempo de navegação'
    },
    {
      icon: FaUserCheck,
      title: 'Cookies Funcionais',
      description: 'Lembram suas preferências para melhorar sua experiência',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      example: 'Idioma, tema, preferências de exibição'
    },
    {
      icon: FaAd,
      title: 'Cookies de Publicidade',
      description: 'Usados para entregar anúncios relevantes',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      example: 'Anúncios personalizados, campanhas'
    }
  ]

  const navegadores = [
    {
      icon: FaChrome,
      name: 'Google Chrome',
      path: 'Configurações → Privacidade e segurança → Cookies',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FaFirefox,
      name: 'Mozilla Firefox',
      path: 'Opções → Privacidade e segurança → Cookies',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: FaSafari,
      name: 'Safari',
      path: 'Preferências → Privacidade → Cookies',
      color: 'from-blue-400 to-blue-500'
    },
    {
      icon: FaEdge,
      name: 'Microsoft Edge',
      path: 'Configurações → Privacidade → Cookies',
      color: 'from-green-500 to-green-600'
    }
  ]

  const beneficios = [
    {
      icon: FaShieldAlt,
      title: 'Segurança',
      description: 'Cookies essenciais protegem sua sessão'
    },
    {
      icon: FaRegClock,
      title: 'Eficiência',
      description: 'Carregamento mais rápido do site'
    },
    {
      icon: FaUserCheck,
      title: 'Personalização',
      description: 'Experiência adaptada às suas preferências'
    },
    {
      icon: FaCheckCircle,
      title: 'Transparência',
      description: 'Controle total sobre seus dados'
    }
  ]

  return (
    <section className="pt-20 pb-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Barra de progresso de scroll */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="relative mb-12">
            {/* Badge de última atualização */}
            <div className="absolute top-0 right-0 bg-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full">
              📅 Atualizado: {new Date().toLocaleDateString('pt-BR')}
            </div>

            {/* Botão voltar */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-8 transition-all duration-300 group"
            >
              <div className="bg-cyan-100 p-2 rounded-full group-hover:bg-cyan-200 transition-colors">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full blur-xl opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-cyan-500 to-cyan-600 p-5 rounded-full shadow-lg">
                    <FaCookie className="text-4xl text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-[#001C30] to-cyan-600 bg-clip-text text-transparent"
                variants={fadeUp}
              >
                Política de Cookies
              </motion.h1>
              
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mb-6 rounded-full"
                variants={fadeUp}
              />
              
              <motion.p 
                className="text-gray-600 text-lg max-w-2xl mx-auto"
                variants={fadeUp}
              >
                Entenda como utilizamos cookies para melhorar sua experiência em nosso site
              </motion.p>
            </div>

            {/* Menu de navegação rápida */}
            <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-2 mb-12">
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: 'o-que-sao', label: '🍪 O que são?' },
                  { id: 'como-usamos', label: '📊 Como usamos' },
                  { id: 'tipos', label: '🔢 Tipos' },
                  { id: 'gerenciamento', label: '⚙️ Gerenciamento' },
                  { id: 'configuracoes', label: '🌐 Configurações' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${activeSection === item.id 
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards de benefícios */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {beneficios.map((beneficio, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-cyan-100 to-cyan-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <beneficio.icon className="text-cyan-600 text-xl" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{beneficio.title}</h3>
                <p className="text-gray-500 text-xs">{beneficio.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Seção: O que são Cookies */}
          <motion.section
            id="o-que-sao"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="scroll-mt-24 mb-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <FaCookieBite className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#001C30] mb-4">
                    O que são Cookies?
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Cookies são pequenos arquivos de texto que os sites que você visita colocam no seu computador. 
                    Eles são amplamente utilizados para fazer os sites funcionarem ou funcionarem de forma mais eficiente, 
                    bem como para fornecer informações aos proprietários do site.
                  </p>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      💡 <strong>Importante:</strong> Os cookies não contêm vírus e não podem acessar seus arquivos pessoais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Seção: Como Usamos Cookies */}
          <motion.section
            id="como-usamos"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="scroll-mt-24 mb-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-[#001C30] mb-4 flex items-center gap-2">
                <FaChartLine className="text-cyan-500" />
                Como Utilizamos Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilizamos cookies de diferentes tipos para melhorar sua experiência, personalizar conteúdo e anúncios, 
                fornecer recursos de mídia social e analisar nosso tráfego.
              </p>
            </div>
          </motion.section>

          {/* Seção: Tipos de Cookies */}
          <motion.section
            id="tipos"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="scroll-mt-24 mb-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-[#001C30] mb-6 text-center">
                Tipos de Cookies que Utilizamos
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {tiposCookies.map((tipo, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className={`${tipo.bgColor} rounded-xl p-5 transition-all duration-300`}
                  >
                    <div className={`bg-gradient-to-r ${tipo.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                      <tipo.icon className="text-white text-lg" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{tipo.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{tipo.description}</p>
                    <p className="text-xs text-gray-500">Exemplo: {tipo.example}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Seção: Gerenciamento de Cookies */}
          <motion.section
            id="gerenciamento"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="scroll-mt-24 mb-8"
          >
            <div className="bg-gradient-to-br from-gray-900 to-[#001C30] rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-cyan-400" />
                Gerenciamento de Cookies
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Você pode controlar e/ou excluir cookies como desejar. A maioria dos navegadores permite que você:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-cyan-400">✓</span> Veja quais cookies estão ativos
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-cyan-400">✓</span> Bloqueie cookies de terceiros
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-cyan-400">✓</span> Exclua todos os cookies ao fechar o navegador
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-cyan-400">✓</span> Receba alertas quando novos cookies forem criados
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Seção: Configurações por Navegador */}
          <motion.section
            id="configuracoes"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="scroll-mt-24 mb-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-[#001C30] mb-6 text-center">
                Configurações por Navegador
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {navegadores.map((nav, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-all duration-300"
                  >
                    <div className={`bg-gradient-to-r ${nav.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <nav.icon className="text-white text-xl" />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm mb-2">{nav.name}</h3>
                    <p className="text-gray-500 text-xs">{nav.path}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Banner de ajuda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100"
          >
            <div className="flex items-start gap-4">
              <div className="bg-cyan-500 p-3 rounded-xl">
                <FaInfoCircle className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-cyan-800 mb-2">
                  Precisa de ajuda sobre Cookies?
                </h3>
                <p className="text-cyan-700 text-sm">
                  Se tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco pelo e-mail:{' '}
                  <strong className="text-cyan-900">cookies@h2bplasticos.com.br</strong>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Footer da página */}
          <div className="text-center pt-8 mt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} H2B Plásticos - Todos os direitos reservados
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Link to="/politica-privacidade" className="text-xs text-gray-400 hover:text-cyan-600 transition-colors">
                Política de Privacidade
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/termos-uso" className="text-xs text-gray-400 hover:text-cyan-600 transition-colors">
                Termos de Uso
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/codigo-etica" className="text-xs text-gray-400 hover:text-cyan-600 transition-colors">
                Código de Ética
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PoliticaCookies