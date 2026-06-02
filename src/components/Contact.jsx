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
  show: { opacity: 1, y: 0 },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 },
}

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0 },
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

// Dados reais da empresa - NOVO ENDEREÇO
const COMPANY_LOCATION = {
  lat: -21.3789,
  lng: -42.1936,
  address: 'BR-116, KM 713 - Santa Helena, Muriaé - MG, 36884-250',
  name: 'H2B Plásticos',
  city: 'Muriaé',
  state: 'MG',
  cep: '36884-250'
}

// URL do Google Maps para o novo endereço
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent('BR-116 KM 713 Santa Helena Muriaé MG')}&t=&z=17&ie=UTF8&iwloc=&output=embed`
// Link para abrir no Google Maps completo
const MAPS_DIRECT_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('BR-116 KM 713 Santa Helena Muriaé MG 36884-250')}`

// Número do WhatsApp atualizado
const WHATSAPP_NUMBER = '5532998114901'
const PHONE_NUMBER = '553237282050'

// Dados de contato
const CONTACT_INFO = [
  {
    icon: FaMapMarkerAlt,
    title: 'Central',
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
    content: 'comercial@h2bplasticos.com.br',
    link: 'mailto:comercial@h2bplasticos.com.br',
    linkText: 'Enviar e-mail',
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
  
  const formRef = useRef(null)
  const sectionRef = useRef(null)
  const location = useLocation()

  // SEMPRE ROLAR PARA O TOPO DA SEÇÃO QUANDO A PÁGINA FOR CARREGADA
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

  // Verificar se veio com o parâmetro ?form=true e rolar suavemente até o formulário
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
      await emailjs.send(
        'service_uaizfmu',
        'template_zon7wwm',
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        'Zm3QJq1CQCGCUSkRJ'
      )

      setSubmitted(true)
      setForm({
        name: '',
        email: '',
        message: '',
      })

      setErrors({})

      setTimeout(() => {
        setSubmitted(false)
      }, 5000)

    } catch (error) {
      console.error('Erro ao enviar email:', error)
      alert('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="pt-24 pb-20 bg-white overflow-hidden"
      aria-label="Contato H2B Plásticos"
    >
      <div className="container mx-auto px-6">

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
            className="inline-block bg-cyan-100 text-cyan-700 text-sm font-semibold
                       px-4 py-1 rounded-full mb-3"
          >
            Contato
          </motion.span>

          <h1 className="text-3xl md:text-4xl font-bold text-[#001C30] mb-3">
            Fale com a{' '}
            <span className="text-cyan-500">H2B Plásticos</span>
          </h1>
          <div className="w-20 h-1 bg-cyan-400 mx-auto mb-4 rounded-full" />
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Unimos localização estratégica, tecnologia e compromisso com a qualidade para oferecer soluções em plásticos reciclados com agilidade, eficiência e confiança.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Informações de contato */}
          <motion.div
            variants={stagger()}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            {CONTACT_INFO.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeLeft}
                whileHover={{ y: -4 }}
                className={`bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl
                           shadow-md hover:shadow-xl transition-all duration-300
                           border border-cyan-100 ${item.isWhatsApp ? 'relative overflow-hidden' : ''}`}
              >
                {item.isWhatsApp && (
                  <div className="absolute top-0 right-0 bg-cyan-500 text-white text-xs font-bold px-2 py-0.5 rounded-bl-lg">
                    Mais rápido
                  </div>
                )}
                <div className="flex gap-3 items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0
                                 ${item.isWhatsApp ? 'bg-cyan-100' : 'bg-cyan-100'}`}>
                    <item.icon className={`text-xl ${item.isWhatsApp ? 'text-cyan-600' : 'text-cyan-600'}`} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#001C30] text-md mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.content}</p>
                    {item.note && (
                      <p className="text-xs text-gray-400 mt-1">{item.note}</p>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 text-xs 
                                   transition-all mt-2 font-medium
                                   ${item.isWhatsApp 
                                     ? 'text-cyan-600 hover:text-cyan-700 hover:gap-2' 
                                     : 'text-cyan-600 hover:text-cyan-700 hover:gap-2'}`}
                      >
                        {item.linkText} <FaExternalLinkAlt size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Informação adicional de localização */}
            <motion.div
              variants={fadeLeft}
              className="bg-cyan-50/50 rounded-xl p-3 text-center border border-cyan-100"
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <FaMapMarkerAlt className="text-cyan-500 text-sm" />
                <span className="font-semibold text-[#001C30] text-sm">Região de atendimento:</span>
              </div>
              <p className="text-gray-600 text-xs">
                Muriaé, Zona da Mata Mineira e todo território nacional | Luan e Kauã
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Fácil acesso pela BR-116
              </p>
            </motion.div>
          </motion.div>

          {/* Formulário e Mapa */}
          <motion.div
            ref={formRef}
            variants={fadeRight}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden 
                       hover:shadow-2xl transition-shadow duration-300
                       border border-gray-100 scroll-mt-28"
            id="formulario-contato"
          >
            <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Seu nome completo"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full p-2.5 border rounded-lg focus:outline-none 
                             focus:ring-2 focus:ring-cyan-400 transition-all text-sm
                             ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-xs mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full p-2.5 border rounded-lg focus:outline-none 
                             focus:ring-2 focus:ring-cyan-400 transition-all text-sm
                             ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Como podemos ajudar sua empresa?"
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full p-2.5 border rounded-lg focus:outline-none 
                             focus:ring-2 focus:ring-cyan-400 transition-all resize-none text-sm
                             ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-xs mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold 
                           py-2.5 rounded-full transition-all duration-300 
                           shadow-lg hover:shadow-xl hover:-translate-y-1
                           disabled:opacity-50 disabled:cursor-not-allowed 
                           disabled:hover:transform-none
                           flex items-center justify-center gap-2 group text-sm"
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

              {/* Mensagem de sucesso */}
              <AnimatePresence mode="wait">
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-cyan-50 border border-cyan-200 text-cyan-700 
                               rounded-lg p-2 text-center text-sm"
                  >
                    ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Mapa - Nova localização BR-116 KM 713 */}
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
                title="Localização da H2B Plásticos - BR-116, KM 713 - Santa Helena, Muriaé - MG"
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
                  className="bg-white/90 hover:bg-white text-[#001C30] hover:text-cyan-600
                             backdrop-blur-sm px-2 py-1.5 rounded-lg shadow-md
                             text-xs font-medium flex items-center gap-1.5
                             transition-all duration-300 hover:shadow-lg
                             border border-gray-200"
                >
                  <FaExternalLinkAlt size={10} />
                  Abrir no Google Maps
                </a>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-cyan-500 text-xs" />
                  <span className="truncate max-w-[200px] md:max-w-none text-xs">
                    {COMPANY_LOCATION.address}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'H2B Plásticos',
                        text: 'Localização da H2B Plásticos - BR-116, KM 713 - Muriaé - MG',
                        url: MAPS_DIRECT_URL,
                      })
                    } else {
                      window.open(MAPS_DIRECT_URL, '_blank')
                    }
                  }}
                  className="text-cyan-500 hover:text-cyan-600 text-xs font-medium
                             flex items-center gap-1 transition-colors"
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