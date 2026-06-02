import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaChevronDown, FaArrowRight } from 'react-icons/fa'

// 1. Constantes movidas para fora do componente para evitar recriação na renderização
const LINKS = [
  { name: 'Início', path: '/' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Produtos', path: '/produtos' },
  { name: 'Serviços', path: '/servicos' },
  { name: 'Diferenciais', path: '/diferenciais' },
  { name: 'Sustentabilidade', path: '/sustentabilidade' },
  { name: 'Contato', path: '/contato' },
]

const NAV_VARIANTS = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: 'spring', stiffness: 100, damping: 20, delay: 0.1 } 
  }
}

const MOBILE_MENU_VARIANTS = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.4, ease: 'easeInOut' } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: 'easeInOut' } }
}

const DROPDOWN_VARIANTS = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 400, damping: 25 } },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  // 2. Otimização de performance com useMemo
  const mainLinks = useMemo(() => LINKS.slice(0, 5), [])
  const moreLinks = useMemo(() => LINKS.slice(5), [])

  // Debounce/Throttle simplificado para o scroll usando useCallback
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true }) // passive: true melhora performance de scroll
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fechar menus ao mudar de rota
  useEffect(() => {
    setIsOpen(false)
    setDropdownOpen(false)
  }, [location.pathname]) // Dependência específica para evitar execuções desnecessárias

  // Classes utilitárias compartilhadas para evitar repetição de código (DRY)
  const navLinkBaseClass = "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1"

  return (
    <>
      <motion.nav
        variants={NAV_VARIANTS}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#001C30]/95 backdrop-blur-xl shadow-2xl' 
            : 'bg-gradient-to-r from-[#001C30] to-[#0A2A3E]'
        }`}
      >
        {/* Linhas decorativas */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="relative z-10"
            >
              <NavLink to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center p-1.5 backdrop-blur-sm group-hover:bg-white/15 transition-all duration-300">
                  <img
                    src="https://h2bplasticos.com.br/_next/image?url=%2Fimagens%2Flogo-h2b-removebg-preview.png&w=1080&q=75"
                    alt="Logo H2B Plásticos"
                    className="w-full h-full object-contain"
                    loading="eager" // Carrega a logo imediatamente por ser um elemento crítico (LCP)
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight">
                    <span className="text-white">H2B</span>
                    <span className="text-cyan-300"> Plásticos</span>
                  </span>
                  <span className="text-[10px] text-cyan-400/70 -mt-1">Soluções em plásticos</span>
                </div>
              </NavLink>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Menu Principal">
              {mainLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `${navLinkBaseClass} ${isActive ? 'text-cyan-300 bg-white/10 shadow-sm' : 'text-gray-300 hover:text-cyan-300 hover:bg-white/5'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-cyan-400 rounded-full shadow-sm"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}

              {/* Dropdown "Mais" */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(prev => !prev)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  className={`${navLinkBaseClass} ${dropdownOpen ? 'text-cyan-300 bg-white/10' : 'text-gray-300 hover:text-cyan-300 hover:bg-white/5'}`}
                >
                  <span>Mais</span>
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-xs" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      variants={DROPDOWN_VARIANTS}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full right-0 mt-2 w-48 bg-[#001C30]/95 backdrop-blur-xl rounded-xl shadow-2xl border border-cyan-400/20 overflow-hidden"
                    >
                      <div className="py-2" role="menu">
                        {moreLinks.map((link) => (
                          <NavLink
                            key={link.path}
                            to={link.path}
                            role="menuitem"
                            className={({ isActive }) =>
                              `block px-4 py-2.5 text-sm transition-all duration-300 ${
                                isActive ? 'text-cyan-300 bg-white/10 font-medium' : 'text-gray-300 hover:text-cyan-300 hover:bg-white/5'
                              }`
                            }
                          >
                            {link.name}
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Botão Mobile */}
            <button
              onClick={() => setIsOpen(prev => !prev)}
              className="lg:hidden text-2xl text-white hover:text-cyan-300 transition-colors relative z-20"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={MOBILE_MENU_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden fixed top-[72px] left-0 right-0 bg-[#001C30]/95 backdrop-blur-xl shadow-2xl border-t border-cyan-500/20 max-h-[calc(100vh-72px)] overflow-y-auto"
            >
              <div className="flex flex-col p-6 space-y-2">
                {LINKS.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-transparent font-semibold border-l-4 border-cyan-400' 
                            : 'text-gray-300 hover:text-cyan-300 hover:bg-white/5'
                        }`
                      }
                    >
                      <span className="font-medium">{link.name}</span>
                      {link.path === location.pathname && (
                        <motion.div layoutId="mobileActive" className="ml-auto">
                          <FaArrowRight className="text-cyan-400 text-xs" />
                        </motion.div>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Espaçador para compensar a navbar fixa */}
      <div className="h-[72px]" />
    </>
  )
}

export default Navbar