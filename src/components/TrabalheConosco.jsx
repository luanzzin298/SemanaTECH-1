import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaClock, 
  FaMoneyBillWave,
  FaWhatsapp,
  FaEnvelope,
  FaUserTie,
  FaFileAlt,
  FaUpload,
  FaCheckCircle,
  FaSearch,
  FaBuilding,
  FaUsers,
  FaStar,
  FaHome
} from 'react-icons/fa'
import { useEffect, useState, useRef, useMemo } from 'react'

// ============================================
// DADOS DAS VAGAS
// ============================================
const VAGAS_DATA = [
  {
    id: 1,
    titulo: 'Operador de Máquina Injetora',
    setor: 'Produção',
    local: 'Muriaé - MG',
    tipo: 'Efetivo',
    salario: 'R$ 2.500 - R$ 3.200',
    horario: 'Segunda a Sexta, 06h às 14h',
    requisitos: [
      'Ensino Médio Completo',
      'Experiência em máquinas injetoras',
      'Curso de NR-12 (diferencial)',
      'Disponibilidade para horários rotativos'
    ],
    beneficios: [
      'Vale Transporte',
      'Vale Alimentação',
      'Plano de Saúde',
      'Plano Odontológico',
      'Seguro de Vida'
    ]
  },
  {
    id: 2,
    titulo: 'Analista de Qualidade Pleno',
    setor: 'Qualidade',
    local: 'Muriaé - MG',
    tipo: 'Efetivo',
    salario: 'R$ 3.500 - R$ 4.500',
    horario: 'Segunda a Sexta, 08h às 17h',
    requisitos: [
      'Graduação em Engenharia ou Química',
      'Experiência com ISO 9001',
      'Conhecimento em ferramentas da qualidade',
      'Pacote Office avançado'
    ],
    beneficios: [
      'Vale Transporte',
      'Vale Refeição',
      'Plano de Saúde',
      'Plano Odontológico',
      'Seguro de Vida',
      'Participação nos Lucros'
    ]
  },
  {
    id: 3,
    titulo: 'Vendedor Externo',
    setor: 'Comercial',
    local: 'Região Sul de Minas',
    tipo: 'Efetivo',
    salario: 'R$ 2.200 + Comissões',
    horario: 'Segunda a Sexta, 08h às 18h',
    requisitos: [
      'Ensino Médio Completo',
      'CNH B',
      'Experiência em vendas B2B',
      'Disponibilidade para viagens',
      'Residir na região'
    ],
    beneficios: [
      'Vale Transporte',
      'Vale Alimentação',
      'Plano de Saúde',
      'Plano Odontológico',
      'Comissões atrativas',
      'Carro da empresa'
    ]
  },
  {
    id: 4,
    titulo: 'Auxiliar de Logística',
    setor: 'Logística',
    local: 'Muriaé - MG',
    tipo: 'Efetivo',
    salario: 'R$ 1.900 - R$ 2.300',
    horario: 'Segunda a Sexta, 07h às 16h',
    requisitos: [
      'Ensino Médio Completo',
      'Conhecimento em expedição',
      'Curso de empilhadeira (diferencial)',
      'Organização e proatividade'
    ],
    beneficios: [
      'Vale Transporte',
      'Vale Alimentação',
      'Plano de Saúde',
      'Plano Odontológico'
    ]
  }
]

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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

// ============================================
// COMPONENTE DE VAGA
// ============================================
const VagaCard = ({ vaga, onCandidatar }) => {
  const [expanded, setExpanded] = useState(false)
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
      whileHover={{ y: -5 }}
      className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-500 group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full">
                {vaga.setor}
              </span>
              <span className="bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-full">
                {vaga.tipo}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
              {vaga.titulo}
            </h3>
          </div>
          <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 p-3 rounded-xl">
            <FaBriefcase className="text-cyan-400 text-xl" />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <FaMapMarkerAlt className="text-cyan-400 text-xs" />
            <span>{vaga.local}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <FaClock className="text-cyan-400 text-xs" />
            <span>{vaga.horario}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <FaMoneyBillWave className="text-cyan-400 text-xs" />
            <span>{vaga.salario}</span>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors mb-3"
        >
          {expanded ? 'Ver menos' : 'Ver requisitos e benefícios'}
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 mt-4 pt-4 border-t border-white/10"
          >
            <div>
              <h4 className="font-semibold text-white text-sm mb-2">Requisitos:</h4>
              <ul className="space-y-1">
                {vaga.requisitos.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300 text-xs">
                    <span className="text-cyan-400">•</span> {req}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-2">Benefícios:</h4>
              <ul className="space-y-1">
                {vaga.beneficios.map((ben, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300 text-xs">
                    <span className="text-green-400">✓</span> {ben}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => onCandidatar(vaga)}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 text-sm"
            >
              Candidatar-se agora
            </button>
          </motion.div>
        )}

        {!expanded && (
          <button
            onClick={() => onCandidatar(vaga)}
            className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500 hover:to-blue-600 text-cyan-300 hover:text-white font-semibold py-2.5 rounded-xl transition-all duration-300 text-sm border border-cyan-400/30 hover:border-transparent"
          >
            Candidatar-se
          </button>
        )}
      </div>
    </motion.div>
  )
}

// ============================================
// COMPONENTE SELECT PERSONALIZADO
// ============================================
const CustomSelect = ({ value, onChange, options, placeholder, error }) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 bg-white/10 rounded-xl border ${error ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-cyan-400 text-left flex justify-between items-center transition-all duration-300`}
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder || 'Selecione uma opção'}
        </span>
        <span className="text-cyan-400">▼</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#0A2A3E] rounded-xl border border-white/20 overflow-hidden z-50 shadow-xl">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`w-full p-3 text-left hover:bg-white/10 transition-colors ${option.value === value ? 'text-cyan-400 bg-white/5' : 'text-white'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================
// COMPONENTE DE INPUT COM VALIDAÇÃO
// ============================================
const InputText = ({ label, value, onChange, placeholder, error, required }) => {
  const handleChange = (e) => {
    let val = e.target.value
    val = val.replace(/[^A-Za-zÀ-ÿ\s]/g, '')
    onChange(val)
  }

  return (
    <div>
      <label className="block text-gray-300 text-sm mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        maxLength={100}
        className={`w-full p-3 bg-white/10 rounded-xl border ${error ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-cyan-400 text-white placeholder:text-gray-400 transition-all duration-300`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

const InputNumber = ({ label, value, onChange, placeholder, error, required, maxLength }) => {
  const handleChange = (e) => {
    let val = e.target.value
    val = val.replace(/[^0-9]/g, '')
    if (maxLength) val = val.slice(0, maxLength)
    onChange(val)
  }

  return (
    <div>
      <label className="block text-gray-300 text-sm mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        className={`w-full p-3 bg-white/10 rounded-xl border ${error ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-cyan-400 text-white placeholder:text-gray-400 transition-all duration-300`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

const InputEmail = ({ label, value, onChange, placeholder, error, required }) => {
  return (
    <div>
      <label className="block text-gray-300 text-sm mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 bg-white/10 rounded-xl border ${error ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-cyan-400 text-white placeholder:text-gray-400 transition-all duration-300`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

const TextAreaWithLimit = ({ label, value, onChange, placeholder, error, required, maxLength = 2000 }) => {
  return (
    <div>
      <label className="block text-gray-300 text-sm mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        rows="4"
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        maxLength={maxLength}
        className={`w-full p-3 bg-white/10 rounded-xl border ${error ? 'border-red-500' : 'border-white/20'} focus:outline-none focus:border-cyan-400 text-white placeholder:text-gray-400 resize-none transition-all duration-300`}
        placeholder={placeholder}
      />
      <div className="text-right text-xs text-gray-400 mt-1">
        {value.length}/{maxLength} caracteres
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const TrabalheConosco = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [selectedVaga, setSelectedVaga] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSetor, setSelectedSetor] = useState('Todos')
  const [curriculoFile, setCurriculoFile] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    email: '',
    celular: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: 'MG',
    cep: '',
    vaga: '',
    disponibilidade: '',
    experiencia: '',
    naturalidade: ''
  })
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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

  const setores = ['Todos', ...new Set(VAGAS_DATA.map(v => v.setor))]

  const vagasFiltradas = VAGAS_DATA.filter(vaga => {
    const matchesSearch = vaga.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vaga.setor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSetor = selectedSetor === 'Todos' || vaga.setor === selectedSetor
    return matchesSearch && matchesSetor
  })

  const handleCandidatar = (vaga) => {
    setSelectedVaga(vaga)
    setFormData(prev => ({ ...prev, vaga: vaga.titulo }))
    setShowForm(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || 
                 file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setCurriculoFile(file)
    } else {
      alert('Por favor, envie um arquivo no formato PDF ou DOC/DOCX')
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório'
    if (!formData.dataNascimento) newErrors.dataNascimento = 'Data de nascimento é obrigatória'
    if (!formData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório'
    else if (formData.cpf.length !== 11) newErrors.cpf = 'CPF deve ter 11 dígitos'
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido'
    if (!formData.celular.trim()) newErrors.celular = 'Celular é obrigatório'
    else if (formData.celular.length < 10) newErrors.celular = 'Celular deve ter pelo menos 10 dígitos'
    if (!formData.endereco.trim()) newErrors.endereco = 'Endereço é obrigatório'
    if (!formData.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório'
    if (!formData.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória'
    if (!formData.cep.trim()) newErrors.cep = 'CEP é obrigatório'
    else if (formData.cep.length !== 8) newErrors.cep = 'CEP deve ter 8 dígitos'
    if (!formData.disponibilidade.trim()) newErrors.disponibilidade = 'Disponibilidade é obrigatória'
    if (!formData.experiencia.trim()) newErrors.experiencia = 'Experiência é obrigatória'
    if (!curriculoFile) newErrors.curriculo = 'Envie seu currículo'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    setTimeout(() => {
      const candidaturas = JSON.parse(localStorage.getItem('candidaturas_h2b') || '[]')
      
      const novaCandidatura = {
        ...formData,
        curriculoNome: curriculoFile?.name,
        dataEnvio: new Date().toISOString(),
        status: 'Recebida'
      }
      
      candidaturas.push(novaCandidatura)
      localStorage.setItem('candidaturas_h2b', JSON.stringify(candidaturas))
      
      setIsSubmitting(false)
      setShowSuccessMessage(true)
      setFormSubmitted(true)
      
      setFormData({
        nome: '',
        dataNascimento: '',
        cpf: '',
        email: '',
        celular: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: 'MG',
        cep: '',
        vaga: '',
        disponibilidade: '',
        experiencia: '',
        naturalidade: ''
      })
      setCurriculoFile(null)
      
      setTimeout(() => {
        setShowSuccessMessage(false)
        setFormSubmitted(false)
        setShowForm(false)
        setSelectedVaga(null)
      }, 3000)
    }, 1000)
  }

  const estadoOptions = [
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'BA', label: 'Bahia' },
    { value: 'PR', label: 'Paraná' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'GO', label: 'Goiás' },
    { value: 'DF', label: 'Distrito Federal' }
  ]

  return (
    <section
      ref={sectionRef}
      className="pt-24 pb-20 overflow-hidden relative min-h-screen bg-gradient-to-br from-[#001C30] via-[#001C30] to-[#0A4A6E]"
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
            Oportunidades
          </motion.span>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 mt-4">
            <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
              Trabalhe
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Conosco
            </span>
          </h1>

          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-6 rounded-full" />

          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Faça parte do time H2B Plásticos. Estamos sempre em busca de talentos que compartilhem 
            nossa paixão por inovação e sustentabilidade.
          </p>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: FaBuilding, value: '12+', label: 'Anos de história' },
            { icon: FaUsers, value: '200+', label: 'Colaboradores' },
            { icon: FaStar, value: '98%', label: 'Satisfação' },
            { icon: FaBriefcase, value: '4', label: 'Vagas abertas' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-5 text-center border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
            >
              <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="text-cyan-400 text-xl" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-gray-300 text-xs mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60 text-sm" />
            <input
              type="text"
              placeholder="Buscar vagas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400/50 text-white placeholder:text-gray-400 transition-all duration-300"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {setores.map(setor => (
              <button
                key={setor}
                onClick={() => setSelectedSetor(setor)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedSetor === setor 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                    : 'bg-white/5 backdrop-blur-sm text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
              >
                {setor}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Vagas */}
        {vagasFiltradas.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {vagasFiltradas.map(vaga => (
              <VagaCard key={vaga.id} vaga={vaga} onCandidatar={handleCandidatar} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 mb-12">
            <p className="text-gray-300">Nenhuma vaga encontrada com os filtros selecionados.</p>
          </div>
        )}

        {/* Formulário de Candidatura */}
        {showForm && (
          <motion.div
            ref={formRef}
            variants={scaleIn}
            initial="hidden"
            animate="show"
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 mb-12 scroll-mt-24"
            id="formulario-candidatura"
          >
            {formSubmitted && showSuccessMessage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <FaCheckCircle className="text-green-400 text-5xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Currículo enviado!</h3>
                <p className="text-gray-300">Sua candidatura foi recebida com sucesso.</p>
                <p className="text-cyan-400 mt-4">Entraremos em contato em breve.</p>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Formulário de Candidatura</h2>
                  <p className="text-gray-300 text-sm">Preencha todos os campos obrigatórios abaixo</p>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mt-3 rounded-full" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Seção 1 - Dados Pessoais */}
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FaUserTie className="text-cyan-400" />
                      Dados Pessoais
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputText
                        label="Nome completo"
                        value={formData.nome}
                        onChange={(val) => setFormData({ ...formData, nome: val })}
                        placeholder="Digite seu nome completo"
                        error={errors.nome}
                        required
                      />
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">
                          Data de Nascimento <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="date"
                          value={formData.dataNascimento}
                          onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                          className="w-full p-3 bg-white/10 rounded-xl border border-white/20 focus:outline-none focus:border-cyan-400 text-white"
                        />
                        {errors.dataNascimento && <p className="text-red-400 text-xs mt-1">{errors.dataNascimento}</p>}
                      </div>
                      <InputNumber
                        label="CPF"
                        value={formData.cpf}
                        onChange={(val) => setFormData({ ...formData, cpf: val })}
                        placeholder="00000000000"
                        error={errors.cpf}
                        required
                        maxLength={11}
                      />
                      <InputText
                        label="Naturalidade"
                        value={formData.naturalidade}
                        onChange={(val) => setFormData({ ...formData, naturalidade: val })}
                        placeholder="Cidade/UF"
                        required={false}
                      />
                    </div>
                  </div>

                  {/* Seção 2 - Contato */}
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FaEnvelope className="text-cyan-400" />
                      Contato
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputEmail
                        label="E-mail"
                        value={formData.email}
                        onChange={(val) => setFormData({ ...formData, email: val })}
                        placeholder="seu@email.com"
                        error={errors.email}
                        required
                      />
                      <InputNumber
                        label="Celular / WhatsApp"
                        value={formData.celular}
                        onChange={(val) => setFormData({ ...formData, celular: val })}
                        placeholder="32999999999"
                        error={errors.celular}
                        required
                        maxLength={11}
                      />
                    </div>
                  </div>

                  {/* Seção 3 - Endereço */}
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FaHome className="text-cyan-400" />
                      Endereço
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <InputText
                          label="Endereço"
                          value={formData.endereco}
                          onChange={(val) => setFormData({ ...formData, endereco: val })}
                          placeholder="Rua, Avenida..."
                          error={errors.endereco}
                          required
                        />
                      </div>
                      <InputText
                        label="Número"
                        value={formData.numero}
                        onChange={(val) => setFormData({ ...formData, numero: val })}
                        placeholder="Número"
                        required={false}
                      />
                      <InputText
                        label="Complemento"
                        value={formData.complemento}
                        onChange={(val) => setFormData({ ...formData, complemento: val })}
                        placeholder="Apto, Bloco, Casa..."
                        required={false}
                      />
                      <InputText
                        label="Bairro"
                        value={formData.bairro}
                        onChange={(val) => setFormData({ ...formData, bairro: val })}
                        placeholder="Bairro"
                        error={errors.bairro}
                        required
                      />
                      <InputText
                        label="Cidade"
                        value={formData.cidade}
                        onChange={(val) => setFormData({ ...formData, cidade: val })}
                        placeholder="Cidade"
                        error={errors.cidade}
                        required
                      />
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">
                          Estado <span className="text-red-400">*</span>
                        </label>
                        <CustomSelect
                          value={formData.estado}
                          onChange={(value) => setFormData({ ...formData, estado: value })}
                          options={estadoOptions}
                        />
                      </div>
                      <InputNumber
                        label="CEP"
                        value={formData.cep}
                        onChange={(val) => setFormData({ ...formData, cep: val })}
                        placeholder="00000000"
                        error={errors.cep}
                        required
                        maxLength={8}
                      />
                    </div>
                  </div>

                  {/* Seção 4 - Profissional */}
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FaBriefcase className="text-cyan-400" />
                      Informações Profissionais
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">
                          Vaga de Interesse <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.vaga}
                          readOnly
                          className="w-full p-3 bg-cyan-500/20 rounded-xl border border-cyan-400/30 text-cyan-300 font-medium cursor-default"
                        />
                      </div>
                      <InputText
                        label="Disponibilidade para início"
                        value={formData.disponibilidade}
                        onChange={(val) => setFormData({ ...formData, disponibilidade: val })}
                        placeholder="Ex: Imediata, 15 dias, 30 dias"
                        error={errors.disponibilidade}
                        required
                      />
                      <div className="md:col-span-2">
                        <TextAreaWithLimit
                          label="Experiência Profissional"
                          value={formData.experiencia}
                          onChange={(val) => setFormData({ ...formData, experiencia: val })}
                          placeholder="Descreva sua experiência, principais atividades e empresas onde trabalhou..."
                          error={errors.experiencia}
                          required
                          maxLength={2000}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Seção 5 - Currículo */}
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FaFileAlt className="text-cyan-400" />
                      Anexar Currículo
                    </h3>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="curriculo"
                      />
                      <label
                        htmlFor="curriculo"
                        className="flex items-center justify-center gap-2 w-full p-4 bg-white/10 rounded-xl border-2 border-dashed border-white/20 hover:border-cyan-400 cursor-pointer transition-all duration-300 text-gray-300"
                      >
                        <FaUpload className="text-cyan-400 text-xl" />
                        {curriculoFile ? curriculoFile.name : 'Clique para selecionar seu currículo (PDF/DOC/DOCX)'}
                      </label>
                    </div>
                    {errors.curriculo && <p className="text-red-400 text-xs mt-1">{errors.curriculo}</p>}
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar candidatura'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}

       
      </div>
    </section>
  )
}

export default TrabalheConosco