import { motion } from 'framer-motion'
import { FaExpandAlt } from 'react-icons/fa'

const products = [
  { id: 1, name: 'Filme Stretch Industrial', desc: 'Alta resistência à perfuração, ideal para paletização.', image: 'https://placehold.co/600x400/2C74B3/white?text=Stretch' },
  { id: 2, name: 'Saco Big Bag', desc: 'Capacidade de 500kg a 1500kg, com alças de segurança.', image: 'https://placehold.co/600x400/F2A900/white?text=Big+Bag' },
  { id: 3, name: 'Embalagem para Alimentos', desc: 'Filme laminado BOPP com barreira de oxigênio.', image: 'https://placehold.co/600x400/0A2647/white?text=Food+Pack' },
  { id: 4, name: 'Plástico para Silagem', desc: 'Filme preto/leitoso para conservação de grãos e forragem.', image: 'https://placehold.co/600x400/2E8B57/white?text=Silagem' },
  { id: 5, name: 'Sacos de Lixo Industrial', desc: 'Alta gramatura, resistente a cargas pesadas.', image: 'https://placehold.co/600x400/555/white?text=Lixo+Ind' },
  { id: 6, name: 'Plástico Bolha', desc: 'Proteção para embalagens logísticas.', image: 'https://placehold.co/600x400/3498db/white?text=Bolha' },
]

const ProductGallery = () => {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Galeria de Produtos</h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-2"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">Conheça nossa linha completa de soluções plásticas</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div key={product.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-sm text-gray-200">{product.desc}</p>
                <button className="mt-3 text-accent flex items-center gap-1 text-sm">Ver detalhes <FaExpandAlt /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default ProductGallery