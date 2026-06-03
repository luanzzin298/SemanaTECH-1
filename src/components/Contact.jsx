import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, 
  FaWhatsapp, FaClock, FaArrowRight, FaExternalLinkAlt
} from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import emailjs from '@emailjs/browser'

// Animações padronizadas
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0, y: 30 },
  show: { scale: 1, opacity: 1, y: 0,
          transition: { type: 'spring', stiffness: 200, damping: 20 } },
}

// Dados reais da empresa
const COMPANY_LOCATION = {
  lat: -21.3789,
  lng: -42.1936,
  address: 'BR-116, KM 713 - Santa Helena, Muriaé - MG, 36884-250',
  name: 'H2B Plásticos',
  city: 'Muriaé',
  state: 'MG',
  cep: '36884-250'
}

// URL do Google Maps
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent('BR-116 KM 713 Santa Helena Muriaé MG')}&t=&z=17&ie=UTF8&iwloc=&output=embed`
const MAPS_DIRECT_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('BR-116 KM 713 Santa Helena Muriaé MG 36884-250')}`

// Contatos
const WHATSAPP_NUMBER = '5532998114901'
const PHONE_NUMBER = '553237282050'
const EMAIL_ADDRESS = 'contato@h2bplasticos.com.br'

// Link do Gmail direto
const GMAIL_LINK = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=Contato%20via%20Site%20H2B%20Plásticos&body=Olá,%20gostaria%20de%20mais%20informações%20sobre%20os%20produtos%20e%20serviços%20da%20H2B%20Plásticos.`

// Dados de contato
const CONTACT_INFO = [
  {
    icon: FaMapMarkerAlt,
    title: 'Localização',
    content: COMPANY_LOCATION.address,
    link: MAPS_DIRECT_URL,
    linkText: 'Abrir no Google Maps',
  },
  {
    icon: FaPhoneAlt,
    title: 'Telefone',
    content: '(32) 3728-2050',
    link: `tel:${PHONE_NUMBER}`,
    linkText: 'Ligar agora',
  },
  {
    icon: FaWhatsapp,
    title: 'WhatsApp',
    content: '(32) 99811-4901',
    link: `https://wa.me/${WHATSAPP_NUMBER}`,
    linkText: 'Enviar mensagem',
    isWhatsApp: true,
  },
  {
    icon: FaEnvelope,
    title: 'E-mail',
    content: EMAIL_ADDRESS,
    link: GMAIL_LINK,
    linkText: 'Abrir no Gmail',
  },
  {
    icon: FaClock,
    title: 'Horário de atendimento',
    content: 'Segunda a sexta, 8h às 18h',
    note: 'Atendimento também via WhatsApp',
  },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const formRef = useRef(null)
  const sectionRef = useRef(null)
  const location = useLocation()

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

  // Verificar se veio com o parâmetro ?form=true
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const shouldScrollToForm = params.get('form') === 'true'
    
    if (shouldScrollToForm && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        })
        formRef.current.classList.add('ring-4', 'ring-cyan-300', 'ring-opacity-50')
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.classList.remove('ring-4', 'ring-cyan-300', 'ring-opacity-50')
          }
        }, 2000)
      }, 500)
    }
  }, [location])

  const validateForm = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!form.email.trim()) newErrors.email = 'E-mail é obrigatório'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'E-mail inválido'
    if (!form.message.trim()) newErrors.message = 'Mensagem é obrigatória'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  // Função para enviar o e-mail via EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Configuração do EmailJS
      // ATENÇÃO: Você precisa substituir estas credenciais pelas suas
      // Crie uma conta gratuita em https://www.emailjs.com/
      const serviceId = 'service_uaizfmu'  // Seu Service ID
      const templateId = 'template_zon7wwm' // Seu Template ID
      const publicKey = 'Zm3QJq1CQCGCUSkRJ' // Sua Public Key

      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_email: EMAIL_ADDRESS,
      }

      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)

      if (response.status === 200) {
        setSubmitted(true)
        setForm({ name: '', email: '', message: '' })
        setErrors({})
        
        setTimeout(() => {
          setSubmitted(false)
        }, 5000)
      } else {
        throw new Error('Erro ao enviar')
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error)
      alert('Erro ao enviar mensagem. Tente novamente ou clique no e-mail para enviar diretamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="pt-24 pb-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden relative"
      aria-label="Contato H2B Plásticos"
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
            className="inline-block bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm font-semibold
                       px-4 py-1.5 rounded-full mb-4 shadow-sm"
          >
            Contato
          </motion.span>

          <h1 className="text-3xl md:text-4xl font-bold text-[#001C30] mb-3">
            Fale com a{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">H2B Plásticos</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-4 rounded-full" />
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Unimos localização estratégica, tecnologia e compromisso com a qualidade para oferecer soluções em plásticos reciclados com agilidade, eficiência e confiança.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Informações de contato */}
          <div className="space-y-5">
            {CONTACT_INFO.map((item, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                initial="hidden"
                animate="show"
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
              >
                {/* Efeito de fundo */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {item.isWhatsApp && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                    Mais rápido
                  </div>
                )}
                
                <div className="relative flex gap-4 items-start">
                  <div className="bg-gradient-to-br from-cyan-100 to-blue-100 w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="text-xl text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#001C30] text-lg mb-1 group-hover:text-cyan-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                    {item.note && (
                      <p className="text-xs text-gray-400 mt-1">{item.note}</p>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm transition-all mt-2 font-medium text-cyan-600 hover:text-cyan-700 hover:gap-2"
                      >
                        {item.linkText} <FaExternalLinkAlt size={10} />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Linha animada */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </motion.div>
            ))}

            {/* Informação adicional de localização */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 text-center border border-cyan-100"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaMapMarkerAlt className="text-cyan-500 text-sm" />
                <span className="font-semibold text-[#001C30] text-sm">Região de atendimento:</span>
              </div>
              <p className="text-gray-600 text-sm">
                Muriaé, Zona da Mata Mineira e todo território nacional
              </p>
              <p className="text-xs text-cyan-600 mt-2 font-medium">
                Fácil acesso pela BR-116
              </p>
            </motion.div>
          </div>

          {/* Formulário de contato */}
          <motion.div
            ref={formRef}
            variants={scaleIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 scroll-mt-28"
            id="formulario-contato"
          >
            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[#001C30] mb-2">
                  Envie uma mensagem rápida
                </h3>
                <p className="text-gray-500 text-sm">
                  Preencha o formulário e enviaremos sua mensagem
                </p>
                <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Seu nome completo"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Como podemos ajudar sua empresa?"
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none text-sm ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-2 group text-base"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensagem
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform text-sm" />
                    </>
                  )}
                </button>

                <AnimatePresence mode="wait">
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 text-cyan-700 rounded-xl p-3 text-center text-sm"
                    >
                      ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">
                  Ou se preferir, clique no e-mail acima para enviar diretamente pelo Gmail
                </p>
              </div>
            </div>

            {/* Mapa */}
            <div className="relative">
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="text-center">
                    <svg className="animate-spin h-8 w-8 text-cyan-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-500 text-sm">Carregando mapa...</p>
                  </div>
                </div>
              )}
              
              <iframe
                title="Localização da H2B Plásticos"
                src={MAP_EMBED_URL}
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
                className="transition-opacity duration-300"
              />
              
              <div className="absolute bottom-3 right-3 z-20">
                <a
                  href={MAPS_DIRECT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 hover:bg-white text-[#001C30] hover:text-cyan-600 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md text-xs font-medium flex items-center gap-1.5 transition-all duration-300 hover:shadow-lg border border-gray-200"
                >
                  <FaExternalLinkAlt size={10} />
                  Abrir no Google Maps
                </a>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-cyan-500 text-sm" />
                  <span className="truncate max-w-[200px] md:max-w-none text-xs">
                    {COMPANY_LOCATION.address}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'H2B Plásticos',
                        text: 'Localização da H2B Plásticos',
                        url: MAPS_DIRECT_URL,
                      })
                    } else {
                      window.open(MAPS_DIRECT_URL, '_blank')
                    }
                  }}
                  className="text-cyan-500 hover:text-cyan-600 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <FaExternalLinkAlt size={9} />
                  Compartilhar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact