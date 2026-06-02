import { motion } from 'framer-motion'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  const socialLinks = [
    { 
      icon: FaFacebook, 
      href: 'https://facebook.com/h2bplasticos', 
      label: 'Facebook',
      color: '#1877f2'
    },
    { 
      icon: FaInstagram, 
      href: 'https://instagram.com/h2bplasticos', 
      label: 'Instagram',
      color: '#e4405f'
    },
    { 
      icon: FaLinkedin, 
      href: 'https://linkedin.com/company/h2bplasticos', 
      label: 'LinkedIn',
      color: '#0a66c2'
    },
    { 
      icon: FaYoutube, 
      href: 'https://youtube.com/@h2bplasticos', 
      label: 'YouTube',
      color: '#ff0000'
    },
  ]

  const quickLinks = [
    { name: 'Início', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Produtos', path: '/produtos' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Sustentabilidade', path: '/sustentabilidade' },
    { name: 'Contato', path: '/contato' },
  ]

  const policies = [
    { name: 'Política de Privacidade', path: '/politica-privacidade' },
    { name: 'Termos de Uso', path: '/termos-uso' },
    { name: 'Código de Ética', path: '/codigo-etica' },
  ]

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-b from-[#001C30] to-[#001420] text-gray-300 pt-16 pb-8 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-300/50 via-cyan-300 to-cyan-300/50"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-300/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-300/5 rounded-full blur-3xl"></div>
      
      {/* Botão de voltar ao topo */}
      <button
        onClick={handleScrollToTop}
        className="absolute right-6 bottom-6 z-20 bg-cyan-500 hover:bg-cyan-600 text-white 
                   w-10 h-10 rounded-full flex items-center justify-center shadow-lg 
                   transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="Voltar ao topo"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Coluna 1 - Logo e Redes Sociais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="/" onClick={handleScrollToTop} className="inline-block">
              <h3 className="text-2xl font-extrabold tracking-tight hover:opacity-90 transition-opacity">
                <span className="text-white">H2B</span>
                <span className="text-cyan-300">Plásticos</span>
              </h3>
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Soluções plásticas com responsabilidade ambiental, inovação contínua e compromisso com a economia circular.
            </p>
            <div className="flex space-x-3 mt-6">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-cyan-300 text-gray-400 hover:text-[#001C30] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Visite nosso ${social.label}`}
                  title={`Abrir ${social.label}`}
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Coluna 2 - Links rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white text-lg mb-4 relative inline-block">
              Links rápidos
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-cyan-300 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    onClick={handleScrollToTop}
                    className="text-gray-400 hover:text-cyan-300 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Coluna 3 - Políticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white text-lg mb-4 relative inline-block">
              Políticas
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-cyan-300 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {policies.map((policy, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={policy.path}
                    onClick={handleScrollToTop}
                    className="text-gray-400 hover:text-cyan-300 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {policy.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Linha divisória com gradiente */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-cyan-300/10"></div>
          </div>
        </div>

        {/* Copyright e informações adicionais */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-gray-400">
            © {new Date().getFullYear()} H2B Plásticos. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 flex-wrap justify-center">
            <Link 
              to="/politica-privacidade" 
              onClick={handleScrollToTop}
              className="text-gray-400 hover:text-cyan-300 transition-colors text-xs"
            >
              Política de Privacidade
            </Link>
            <Link 
              to="/termos-uso" 
              onClick={handleScrollToTop}
              className="text-gray-400 hover:text-cyan-300 transition-colors text-xs"
            >
              Termos de Uso
            </Link>
            <Link 
              to="/politica-cookies" 
              onClick={handleScrollToTop}
              className="text-gray-400 hover:text-cyan-300 transition-colors text-xs"
            >
              Cookies
            </Link>
          </div>
        </div>

        
      </div>
    </footer>
  )
}

export default Footer