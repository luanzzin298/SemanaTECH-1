import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaArrowLeft, 
  FaHandshake, 
  FaLeaf, 
  FaUsers, 
  FaBalanceScale,
  FaShieldAlt,
  FaRegLightbulb,
  FaHeart,
  FaGlobeAmericas,
  FaStar,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPhoneAlt,
  FaEnvelope,
  FaLock
} from 'react-icons/fa'
import { useEffect, useState } from 'react'

const CodigoEtica = () => {
  const [activeSection, setActiveSection] = useState('missao')
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

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
    const sections = ['missao', 'valores', 'compromissos', 'canais']
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

  const valores = [
    {
      icon: FaBalanceScale,
      title: 'Integridade',
      description: 'Agimos com honestidade, transparência e justiça em todas as relações.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: FaLeaf,
      title: 'Sustentabilidade',
      description: 'Compromisso com o meio ambiente e a economia circular.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: FaUsers,
      title: 'Respeito à Diversidade',
      description: 'Valorizamos a diversidade e tratamos todos com dignidade e igualdade.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: FaHandshake,
      title: 'Excelência',
      description: 'Buscamos a melhoria contínua em tudo o que fazemos.',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      icon: FaRegLightbulb,
      title: 'Inovação',
      description: 'Estimulamos a criatividade e buscamos soluções inovadoras.',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: FaHeart,
      title: 'Empatia',
      description: 'Colocamo-nos no lugar do outro para construir relações mais humanas.',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    }
  ]

  const compromissos = [
    {
      icon: FaCheckCircle,
      text: 'Cumprir rigorosamente as leis e regulamentações aplicáveis',
      category: 'Legal'
    },
    {
      icon: FaShieldAlt,
      text: 'Promover um ambiente de trabalho seguro, saudável e inclusivo',
      category: 'Segurança'
    },
    {
      icon: FaExclamationTriangle,
      text: 'Combater qualquer forma de corrupção, fraude ou suborno',
      category: 'Integridade'
    },
    {
      icon: FaLock,
      text: 'Proteger dados e informações confidenciais',
      category: 'Privacidade'
    },
    {
      icon: FaChartLine,
      text: 'Praticar a concorrência leal e ética no mercado',
      category: 'Mercado'
    },
    {
      icon: FaGlobeAmericas,
      text: 'Reduzir impactos ambientais e promover a economia circular',
      category: 'Sustentabilidade'
    }
  ]

  const canaisDenuncia = [
    {
      icon: FaEnvelope,
      title: 'E-mail',
      value: 'etica@h2bplasticos.com.br'
    },
    {
      icon: FaPhoneAlt,
      title: 'Telefone',
      value: '(32) 99811-4901'
    },
    {
      icon: FaLock,
      title: 'Canal Sigiloso',
      value: 'www.h2bplasticos.com.br/canal-denuncia'
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
          {/* Header com gradiente */}
          <div className="relative mb-12">
            {/* Badge de última atualização */}
            <div className="absolute top-0 right-0 bg-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full">
              📅 Atualizado: {new Date().toLocaleDateString('pt-BR')}
            </div>

            {/* Botão voltar melhorado */}
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
                    <FaHandshake className="text-4xl text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-[#001C30] to-cyan-600 bg-clip-text text-transparent"
                variants={fadeUp}
              >
                Código de Ética
              </motion.h1>
              
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mb-6 rounded-full"
                variants={fadeUp}
              />
              
              <motion.p 
                className="text-gray-600 text-lg max-w-2xl mx-auto"
                variants={fadeUp}
              >
                Nossos princípios e valores guiam todas as nossas ações e decisões
              </motion.p>
            </div>

            {/* Menu de navegação rápida */}
            <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-2 mb-12">
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: 'missao', label: '🎯 Missão' },
                  { id: 'valores', label: '💎 Valores' },
                  { id: 'compromissos', label: '📋 Compromissos' },
                  { id: 'canais', label: '📢 Canais' }
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

          <div className="space-y-16">
            {/* Seção Missão */}
            <motion.section
              id="missao"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              className="scroll-mt-24"
            >
              <div className="bg-gradient-to-br from-cyan-50 to-white rounded-3xl p-10 md:p-12 shadow-xl border border-cyan-100">
                <div className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-6">
                  📖 Propósito
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#001C30] mb-6">
                  Nossa Missão
                </h2>
                <p className="text-gray-700 text-xl md:text-2xl leading-relaxed italic font-light">
                  "Transformar o setor plástico com soluções inovadoras, sustentáveis e éticas, 
                  gerando valor para nossos clientes, colaboradores e sociedade."
                </p>
                <div className="mt-8 flex items-center gap-2 text-cyan-600">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm">Compromisso com a excelência</span>
                </div>
              </div>
            </motion.section>

            {/* Seção Valores */}
            <motion.section
              id="valores"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              className="scroll-mt-24"
            >
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4">
                  💎 Pilares
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#001C30]">
                  Nossos Valores
                </h2>
                <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mt-4 rounded-full" />
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {valores.map((valor, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`${valor.bgColor} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100`}
                  >
                    <div className={`bg-gradient-to-r ${valor.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                      <valor.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{valor.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{valor.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Seção Compromissos */}
            <motion.section
              id="compromissos"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              className="scroll-mt-24"
            >
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
                <div className="text-center mb-10">
                  <div className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4">
                    📋 Diretrizes
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#001C30]">
                    Compromissos Éticos
                  </h2>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {compromissos.map((comp, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex-shrink-0">
                        <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition-colors">
                          <comp.icon className="text-green-600 text-sm" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed">{comp.text}</p>
                        <span className="text-xs text-cyan-600 mt-1 inline-block">{comp.category}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Destaque */}
                <div className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
                  <div className="flex items-start gap-4">
                    <div className="bg-cyan-500 p-3 rounded-xl">
                      <FaStar className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-cyan-800 mb-2">Compromisso da Liderança</h3>
                      <p className="text-cyan-700">
                        Nossa diretoria e gestores são os primeiros responsáveis por garantir o cumprimento deste Código, 
                        liderando pelo exemplo e promovendo uma cultura ética em toda a organização.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Seção Canais de Denúncia - APENAS DECORATIVOS */}
            <motion.section
              id="canais"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              className="scroll-mt-24"
            >
              <div className="bg-gradient-to-br from-gray-900 to-[#001C30] rounded-3xl p-10 md:p-12 shadow-2xl text-white">
                <div className="text-center mb-10">
                  <div className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
                    🔒 Canais Seguros
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Canais de Denúncia
                  </h2>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto mt-4 rounded-full" />
                  <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                    Disponibilizamos canais seguros e confidenciais para relatar qualquer violação ao nosso Código de Ética
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {canaisDenuncia.map((canal, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 cursor-default"
                    >
                      <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <canal.icon className="text-3xl text-cyan-300" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{canal.title}</h3>
                      <p className="text-cyan-300 text-sm break-all select-all">
                        {canal.value}
                      </p>
                      {/* Indicador visual de que é apenas para exibição */}
                      <div className="mt-3 text-xs text-gray-400 flex items-center justify-center gap-1">
                        <FaLock className="text-[10px]" />
                        <span>Informação segura</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-400 text-sm">
                    Todos os relatos são tratados com sigilo absoluto e imparcialidade
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Footer da página */}
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} H2B Plásticos - Código de Ética e Conduta
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <Link to="/politica-privacidade" className="text-xs text-gray-400 hover:text-cyan-600 transition-colors">
                  Política de Privacidade
                </Link>
                <span className="text-gray-300">|</span>
                <Link to="/termos-uso" className="text-xs text-gray-400 hover:text-cyan-600 transition-colors">
                  Termos de Uso
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CodigoEtica