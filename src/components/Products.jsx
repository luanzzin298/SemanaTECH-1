import { motion } from 'framer-motion'
import { products } from '../data/content'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaWhatsapp,
  FaEye,
} from 'react-icons/fa'

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [showFilter, setShowFilter] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const location = useLocation()
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
    if (shouldScrollToForm) {
      setTimeout(() => {
        const formElement = document.getElementById('formulario-contato')
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          formElement.classList.add('ring-4', 'ring-cyan-300', 'ring-opacity-50')
          setTimeout(() => {
            formElement.classList.remove('ring-4', 'ring-cyan-300', 'ring-opacity-50')
          }, 2000)
        }
      }, 500)
    }
  }, [location])

  // Partículas de água flutuantes
  const floatingParticles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  })), [])

  // IMAGENS ESPECÍFICAS DOS PRODUTOS
  const productImages = {
    'Saco Big Bag': 'https://images.unsplash.com/photo-1581092335871-4c4b7a4b9c5d?w=600&h=400&fit=crop',
    'Embalagem para Alimentos': 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=400&fit=crop',
    'Plástico para Silagem': 'https://images.unsplash.com/photo-1592982537447-6f2c6a0a7c5b?w=600&h=400&fit=crop',
    'Sacos de Lixo Industrial': 'https://images.unsplash.com/photo-1614123454719-9bdd7b5a2c0c?w=600&h=400&fit=crop',
    'Proteção para Embalagens': 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop',
    'Sacolas Personalizadas': 'https://images.unsplash.com/photo-1564428771378-6b5f5d5a9b9c?w=600&h=400&fit=crop',
  }

  const productsWithImages = products.map((product) => ({
    ...product,
    image: productImages[product.name] || product.image,
  }))

  const categories = ['Todos', ...new Set(productsWithImages.map((p) => p.category || 'Geral'))]

  const filteredProducts = productsWithImages.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedCategory('Todos')
  }, [])

  return (
    <section
      ref={sectionRef}
      id="products"
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

      {/* Partículas flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((p) => (
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

      {/* Padrão industrial de fundo */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-4"
          >
            <span className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-md border border-cyan-400/30 text-cyan-300 font-semibold text-sm tracking-wider">
              Soluções Plásticas
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
              Nossos
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Produtos
            </span>
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full mb-5" />
          
          <p className="text-gray-300 max-w-2xl mx-auto text-base">
            Soluções plásticas desenvolvidas com tecnologia de ponta e precisão para sua indústria.
          </p>
        </motion.div>

        {/* BUSCA E FILTRO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* INPUT DE BUSCA */}
            <div className="relative w-full lg:w-96">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60 text-sm" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-sm bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  <FaTimes size={14} />
                </button>
              )}
            </div>

            {/* FILTRO MOBILE */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="md:hidden flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm shadow-sm hover:bg-white/10 transition"
            >
              <FaFilter className="text-cyan-400" /> Filtrar
            </button>

            {/* CATEGORIAS DESKTOP */}
            <div className="hidden md:flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-white/5 backdrop-blur-sm text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* CATEGORIAS MOBILE */}
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 flex gap-2 flex-wrap"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat)
                    setShowFilter(false)
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-white/5 backdrop-blur-sm text-gray-300 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* GRID DE PRODUTOS */}
        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 border border-white/10 hover:border-cyan-400/50 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                {/* IMAGEM */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001C30]/80 via-[#001C30]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <FaEye className="text-white text-xl" />
                    </div>
                  </div>
                  {product.tag && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* CONTEÚDO */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">
                      <product.icon className="text-2xl text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-4 text-sm">
                    {product.desc}
                  </p>
                  
                  <div className="flex items-center justify-end pt-3 border-t border-white/10">
                    <span className="text-cyan-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-300 text-sm cursor-pointer">
                      Ver detalhes
                      <svg className="w-4 h-4 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
          >
            <p className="text-gray-300 text-base">Nenhum produto encontrado com os filtros selecionados.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-cyan-400 font-semibold hover:underline text-sm"
            >
              Limpar filtros
            </button>
          </motion.div>
        )}

        {/* MODAL DE DETALHES PREMIUM */}
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-gradient-to-br from-[#001C30] to-[#0A4A6E] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cyan-400/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Imagem do modal */}
              <div className="relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001C30] to-transparent" />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition backdrop-blur-sm"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              {/* Conteúdo do modal */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-cyan-400/20 to-blue-600/20 w-16 h-16 rounded-xl flex items-center justify-center">
                    <selectedProduct.icon className="text-3xl text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedProduct.name}</h3>
                    {selectedProduct.tag && (
                      <span className="inline-block mt-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {selectedProduct.tag}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6 text-base">
                  {selectedProduct.desc}
                </p>

                {/* Especificações */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 mb-6 border border-white/10">
                  <h4 className="font-semibold text-cyan-400 mb-3 text-sm">Especificações Técnicas:</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                      Material de alta resistência e durabilidade
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                      Disponível em diversas medidas e espessuras
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                      Personalizável conforme necessidade do cliente
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                      Certificação de qualidade ISO 9001
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                      Sustentável e 100% reciclável
                    </li>
                  </ul>
                </div>

                {/* Botão de orçamento */}
                <Link
                  to="/contato"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-xl text-sm"
                  onClick={() => setSelectedProduct(null)}
                >
                  <FaWhatsapp size={18} /> Solicitar orçamento agora
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 md:p-10 overflow-hidden relative border border-white/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cyan-400/5 to-transparent" />
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Precisa de uma solução personalizada?
            </h3>
            <p className="text-cyan-100 mb-6 max-w-2xl mx-auto text-base">
              Desenvolvemos produtos plásticos sob medida para atender às necessidades específicas da sua indústria.
            </p>
            <Link
              to="/contato"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:-translate-y-1 text-sm"
            >
              Fale com um especialista
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Products