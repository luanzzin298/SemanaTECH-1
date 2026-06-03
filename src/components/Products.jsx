import { motion } from 'framer-motion'
import { products } from '../data/content'
import { useState, useEffect, useRef } from 'react'
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
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

  // Scroll automático para o topo da seção quando a página carregar
  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        const offset = 70
        const elementPosition = sectionRef.current.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }, [])

  // Verificar se veio com o parâmetro ?form=true
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const shouldScrollToForm = params.get('form') === 'true'
    
    if (shouldScrollToForm) {
      setTimeout(() => {
        const formElement = document.getElementById('formulario-contato')
        if (formElement) {
          formElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          })
          formElement.classList.add('ring-4', 'ring-cyan-300', 'ring-opacity-50')
          setTimeout(() => {
            if (formElement) {
              formElement.classList.remove('ring-4', 'ring-cyan-300', 'ring-opacity-50')
            }
          }, 2000)
        }
      }, 500)
    }
  }, [location])

  // IMAGENS ESPECÍFICAS DOS PRODUTOS
  const productImages = {
    'Saco Big Bag': 'https://images.unsplash.com/photo-1581092335871-4c4b7a4b9c5d?w=600&h=400&fit=crop',
    'Embalagem para Alimentos': 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=400&fit=crop',
    'Plástico para Silagem': 'https://images.unsplash.com/photo-1592982537447-6f2c6a0a7c5b?w=600&h=400&fit=crop',
    'Sacos de Lixo Industrial': 'https://images.unsplash.com/photo-1614123454719-9bdd7b5a2c0c?w=600&h=400&fit=crop',
    'Proteção para Embalagens': 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop',
    'Sacolas Personalizadas': 'https://images.unsplash.com/photo-1564428771378-6b5f5d5a9b9c?w=600&h=400&fit=crop',
  }

  // ADICIONA IMAGEM ESPECÍFICA PARA CADA PRODUTO
  const productsWithImages = products.map((product) => ({
    ...product,
    image: productImages[product.name] || product.image,
  }))

  // CATEGORIAS
  const categories = [
    'Todos',
    ...new Set(productsWithImages.map((p) => p.category || 'Geral')),
  ]

  // FILTRO
  const filteredProducts = productsWithImages.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'Todos' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="pt-24 pb-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden relative"
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
        {/* HEADER - PADRONIZADO */}
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
            className="inline-block mb-3"
          >
            <span className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm">
              Produtos de Alta Performance
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#001C30] mb-3">
            Nossos <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Produtos</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            Soluções plásticas desenvolvidas com tecnologia de ponta e precisão para sua indústria.
          </p>
        </motion.div>

        {/* BUSCA E FILTRO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* INPUT */}
            <div className="relative w-full lg:w-96">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all text-sm bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={14} />
                </button>
              )}
            </div>

            {/* FILTRO MOBILE */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm shadow-sm"
            >
              <FaFilter className="text-cyan-500" /> Filtrar
            </button>

            {/* CATEGORIAS DESKTOP */}
            <div className="hidden md:flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
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
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* GRID DE PRODUTOS - SEM BOTÃO SOLICITAR COTAÇÃO */}
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
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                {/* IMAGEM */}
                <div
                  className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001C30]/70 via-[#001C30]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2.5">
                      <FaEye className="text-white text-lg" />
                    </div>
                  </div>
                  {product.tag && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-lg">
                      {product.tag}
                    </span>
                  )}
                  {product.featured && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-lg">
                      ★ Destaque
                    </span>
                  )}
                </div>

                {/* CONTEÚDO */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-gradient-to-br from-cyan-100 to-blue-100 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
                        <product.icon className="text-xl text-cyan-600" />
                      </div>
                      <h3 className="text-lg font-bold text-[#001C30] group-hover:text-cyan-600 transition-colors">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    {product.desc}
                  </p>
                  
                  <div className="flex items-center justify-end pt-3 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-cyan-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-300 text-sm"
                    >
                      Ver detalhes
                      <svg className="w-3 h-3 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-base">Nenhum produto encontrado com os filtros selecionados.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('Todos')
              }}
              className="mt-3 text-cyan-600 font-semibold hover:underline text-sm"
            >
              Limpar filtros
            </button>
          </motion.div>
        )}

        {/* MODAL DE DETALHES */}
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition"
                >
                  <FaTimes size={14} />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-cyan-100 to-blue-100 w-14 h-14 rounded-xl flex items-center justify-center">
                    <selectedProduct.icon className="text-2xl text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#001C30]">{selectedProduct.name}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">{selectedProduct.desc}</p>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 mb-4 border border-gray-100">
                  <h4 className="font-semibold text-[#001C30] mb-2 text-sm">Especificações:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
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
                      Sustentável e reciclável
                    </li>
                  </ul>
                </div>
                <Link
                  to="/contato"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md text-sm"
                  onClick={() => setSelectedProduct(null)}
                >
                  <FaWhatsapp size={16} /> Solicitar orçamento agora
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA - PADRONIZADO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-gradient-to-br from-[#001C30] to-[#0A4A6E] rounded-2xl p-8 md:p-10 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%2300D4FF&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            Precisa de uma solução personalizada?
          </h3>
          <p className="text-cyan-100 mb-6 max-w-2xl mx-auto text-sm">
            Desenvolvemos produtos plásticos sob medida para atender às necessidades específicas da sua indústria.
          </p>
          <Link
            to="/contato"
            className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-sm"
          >
            Fale com um especialista
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Products