import { motion } from "framer-motion";
import { FaExpandAlt } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Filme Stretch Industrial",
    desc: "Alta resistência à perfuração, ideal para paletização.",
    image: "https://placehold.co/600x400/2C74B3/white?text=Stretch",
  },
  {
    id: 2,
    name: "Saco Big Bag",
    desc: "Capacidade de 500kg a 1500kg, com alças de segurança.",
    image: "https://placehold.co/600x400/F2A900/white?text=Big+Bag",
  },
  {
    id: 3,
    name: "Embalagem para Alimentos",
    desc: "Filme laminado BOPP com barreira de oxigênio.",
    image: "https://placehold.co/600x400/0A2647/white?text=Food+Pack",
  },
  {
    id: 4,
    name: "Plástico para Silagem",
    desc: "Filme preto/leitoso para conservação de grãos e forragem.",
    image: "https://placehold.co/600x400/2E8B57/white?text=Silagem",
  },
  {
    id: 5,
    name: "Sacos de Lixo Industrial",
    desc: "Alta gramatura, resistente a cargas pesadas.",
    image: "https://placehold.co/600x400/555/white?text=Lixo+Ind",
  },
  {
    id: 6,
    name: "Plástico Bolha",
    desc: "Proteção para embalagens logísticas.",
    image: "https://placehold.co/600x400/3498db/white?text=Bolha",
  },
];

const ProductGallery = () => {
  return (
    <section
      id="products"
      className="pt-24 pb-20 bg-gradient-to-br from-[#001C30] via-[#001C30] to-[#0A4A6E]"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
            Galeria de Produtos
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mt-2 rounded-full"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-4 text-sm sm:text-base">
            Conheça nossa linha completa de soluções plásticas
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all border border-white/10"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-200">
                  {product.desc}
                </p>
                <button className="mt-2 sm:mt-3 text-cyan-400 flex items-center gap-1 text-xs sm:text-sm font-medium hover:text-cyan-300 transition-colors">
                  Ver detalhes <FaExpandAlt />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProductGallery;
