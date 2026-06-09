import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, 
  FaWhatsapp, FaClock, FaArrowRight, FaExternalLinkAlt
} from 'react-icons/fa'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import emailjs from '@emailjs/browser'

// ============================================
// PARTÍCULAS FLUTUANTES
// ============================================
const FloatingParticles = () => {
  const particles = useMemo(() => Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-300/15"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -40, 0, 40, 0],
            x: [0, 25, 0, -25, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// ANIMAÇÕES PADRONIZADAS
// ============================================
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0, y: 30 },
  show: { scale: 1, opacity: 1, y: 0,
          transition: { type: 'spring', stiffness: 200, damping: 20 } },
}

// ============================================
// CARD DE CONTATO PREMIUM
// ============================================
const ContactCard = ({ item, idx }) => {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')
  const [glowStyle, setGlowStyle] = useState({})
  const rafRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -3
      const rotateY = ((x - centerX) / centerX) * 3
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
      setGlowStyle({
        background: `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(0, 212, 255, 0.12) 0%, rgba(0, 212, 255, 0) 70%)`
      })
    })
  }

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)')
    setGlowStyle({})
  }

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      variants={scaleIn}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      whileHover={{ y: -4 }}
      className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-xl 
                 hover:shadow-cyan-500/20 transition-all duration-500 border border-white/10 
                 hover:border-cyan-400/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300" style={glowStyle} />
      
      {item.isWhatsApp && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-20">
          Mais rápido
        </div>
      )}
      
      <div className="relative flex gap-4 items-start">
        <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
          <item.icon className="text-xl text-cyan-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white text-lg mb-1 group-hover:text-cyan-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">{item.content}</p>
          {item.note && (
            <p className="text-xs text-gray-400 mt-1">{item.note}</p>
          )}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm transition-all mt-2 font-medium text-cyan-400 hover:text-cyan-300 hover:gap-2"
            >
              {item.linkText} <FaExternalLinkAlt size={10} />
            </a>
          )}
        </div>
      </div>
      
      {/* Linha animada */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    </motion.div>
  )
}

// ============================================
// DADOS REAIS DA EMPRESA
// ============================================
const COMPANY_LOCATION = {
  lat: -21.3789,
  lng: -42.1936,
  address: 'BR-116, KM 713 - Santa Helena, Muriaé - MG, 36884-250',
  name: 'H2B Plásticos',
  city: 'Muriaé',
  state: 'MG',
  cep: '36884-250'
}

const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent('BR-116 KM 713 Santa Helena Muriaé MG')}&t=&z=17&ie=UTF8&iwloc=&output=embed`
const MAPS_DIRECT_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('BR-116 KM 713 Santa Helena Muriaé MG 36884-250')}`

const WHATSAPP_NUMBER = '5532998114901'
const PHONE_NUMBER = '553237282050'
const EMAIL_ADDRESS = 'contato@h2bplasticos.com.br'
const GMAIL_LINK = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=Contato%20via%20Site%20H2B%20Plásticos&body=Olá,%20gostaria%20de%20mais%20informações%20sobre%20os%20produtos%20e%20serviços%20da%20H2B%20Plásticos.`

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

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  
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

  // Verificar parâmetro ?form=true
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)

    try {
      const serviceId = 'service_uaizfmu'
      const templateId = 'template_zon7wwm'
      const publicKey = 'Zm3QJq1CQCGCUSkRJ'

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
      className="pt-24 pb-20 overflow-hidden relative min-h-screen bg-gradient-to-br from-[#001C30] via-[#001C30] to-[#0A4A6E]"
      aria-label="Contato H2B Plásticos"
    >
      {/* Fundo com gradiente dinâmico */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0) 60%)`
          }}
        />
      </div>

      {/* Partículas flutuantes */}
      <FloatingParticles />

      {/* Padrão industrial de fundo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

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
            className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-md border border-cyan-400/30 text-cyan-300 font-semibold text-sm tracking-wider"
          >
            Contato
          </motion.span>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 mt-4">
            <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
              Fale com a
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              H2B Plásticos
            </span>
          </h1>

          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-6 rounded-full" />

          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Unimos localização estratégica, tecnologia e compromisso com a qualidade para oferecer soluções em plásticos reciclados com agilidade, eficiência e confiança.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Informações de contato */}
          <div className="space-y-5">
            {CONTACT_INFO.map((item, idx) => (
              <ContactCard key={idx} item={item} idx={idx} />
            ))}

            {/* Informação adicional de localização */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.5 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-4 text-center border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <FaMapMarkerAlt className="text-cyan-400 text-sm" />
                <span className="font-semibold text-white text-sm">Região de atendimento:</span>
              </div>
              <p className="text-gray-300 text-sm">
                Muriaé, Zona da Mata Mineira e todo território nacional
              </p>
              <p className="text-xs text-cyan-400 mt-2 font-medium">
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
            className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 border border-white/10 hover:border-cyan-400/50 scroll-mt-28"
            id="formulario-contato"
          >
            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Envie uma mensagem rápida
                </h3>
                <p className="text-gray-300 text-sm">
                  Preencha o formulário e enviaremos sua mensagem
                </p>
                <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-3 rounded-full" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Seu nome completo"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full p-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm text-white placeholder:text-gray-400 ${errors.name ? 'border-red-500' : 'border-white/20'}`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full p-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all text-sm text-white placeholder:text-gray-400 ${errors.email ? 'border-red-500' : 'border-white/20'}`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-200 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Como podemos ajudar sua empresa?"
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full p-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none text-sm text-white placeholder:text-gray-400 ${errors.message ? 'border-red-500' : 'border-white/20'}`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-500 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-2 group text-base"
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
                      className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 text-cyan-300 rounded-xl p-3 text-center text-sm backdrop-blur-sm"
                    >
                      ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <p className="text-xs text-gray-400">
                  Ou se preferir, clique ao lado para enviar diretamente pelo Email
                </p>
              </div>
            </div>

            {/* Mapa */}
            <div className="relative">
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#001C30] z-10">
                  <div className="text-center">
                    <svg className="animate-spin h-8 w-8 text-cyan-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-400 text-sm">Carregando mapa...</p>
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
                  className="bg-black/50 hover:bg-black/70 text-white hover:text-cyan-400 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md text-xs font-medium flex items-center gap-1.5 transition-all duration-300 hover:shadow-lg border border-white/20"
                >
                  <FaExternalLinkAlt size={10} />
                  Abrir no Google Maps
                </a>
              </div>
            </div>
            
            <div className="p-4 bg-white/5 backdrop-blur-sm border-t border-white/10">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-300">
                  <FaMapMarkerAlt className="text-cyan-400 text-sm" />
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
                  className="text-cyan-400 hover:text-cyan-300 text-xs font-medium flex items-center gap-1 transition-colors"
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