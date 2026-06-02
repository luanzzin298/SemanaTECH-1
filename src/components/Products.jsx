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
  const location = useLocation()
  const sectionRef = useRef(null)

  // Scroll automático para o topo da seção quando a página carregar
  useEffect(() => {
    setTimeout(() => {
      if (sectionRef.current) {
        const offset = 70 // Compensação para o header fixo
        const elementPosition = sectionRef.current.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }, [])

  // Verificar se veio com o parâmetro ?form=true e rolar suavemente até o formulário na página de contato
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

  // IMAGENS ESPECÍFICAS DOS PRODUTOS (6 PRODUTOS)
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
      className="products-section pt-24 pb-20 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6">
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
            <span className="bg-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full">
              Produtos de Alta Performance
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#001C30] mb-3">
            Nossos <span className="text-cyan-500">Produtos</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-400 mx-auto mb-4 rounded-full"></div>
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
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all text-sm"
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
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-600 text-sm"
            >
              <FaFilter /> Filtrar
            </button>

            {/* CATEGORIAS DESKTOP */}
            <div className="hidden md:flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* GRID DE PRODUTOS - 6 PRODUTOS */}
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
                    <span className="absolute top-3 right-3 bg-cyan-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-lg">
                      {product.tag}
                    </span>
                  )}
                  {product.featured && (
                    <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-lg">
                      ★ Destaque
                    </span>
                  )}
                </div>

                {/* CONTEÚDO */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
                        <product.icon className="text-xl text-cyan-600" />
                      </div>
                      <h3 className="text-lg font-bold text-[#001C30] group-hover:text-cyan-600 transition-colors">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                    {product.desc}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <Link
                      to="/contato"
                      className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 text-xs shadow-md hover:shadow-lg"
                    >
                      <FaWhatsapp size={14} /> Solicitar cotação
                    </Link>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-cyan-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-300 text-xs"
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
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 w-14 h-14 rounded-xl flex items-center justify-center">
                    <selectedProduct.icon className="text-2xl text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#001C30]">{selectedProduct.name}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-3 text-sm">{selectedProduct.desc}</p>
                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <h4 className="font-semibold text-[#001C30] mb-1 text-sm">Especificações:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Material de alta resistência e durabilidade</li>
                    <li>• Disponível em diversas medidas e espessuras</li>
                    <li>• Personalizável conforme necessidade do cliente</li>
                    <li>• Certificação de qualidade ISO 9001</li>
                    <li>• Sustentável e reciclável</li>
                  </ul>
                </div>
                <Link
                  to="/contato"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md text-sm"
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
          className="mt-12 text-center bg-gradient-to-r from-[#001C30] to-[#0A4A6E] rounded-2xl p-6 md:p-8"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            Precisa de uma solução personalizada?
          </h3>
          <p className="text-gray-300 mb-5 max-w-2xl mx-auto text-sm">
            Desenvolvemos produtos plásticos sob medida para atender às necessidades específicas da sua indústria.
          </p>
          <Link
            to="/contato"
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-sm"
          >
            Fale com um especialista
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Products