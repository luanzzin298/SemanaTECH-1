import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa'
import { testimonials } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const fadeOutUp = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0 },
}

const stagger = (delayChildren = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delayChildren } },
})

const Testimonials = () => {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((i) => (i + 1) % testimonials.length)
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  const goToSlide = (i) => setIndex(i)

  return (
    <section
      className="py-24 bg-primary text-white relative overflow-hidden"
      aria-label="Depoimentos de clientes"
    >
      {/* Fundo decorativo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Cabeçalho */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block bg-accent/20 text-accent text-sm font-semibold
                       px-4 py-1 rounded-full mb-4"
          >
            Depoimentos
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold"
          >
            O que nossos{' '}
            <span className="text-accent">clientes</span> dizem
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="w-20 h-1 bg-accent mx-auto my-4 rounded-full"
          />
        </motion.div>

        {/* Carrossel */}
        <div className="relative max-w-3xl mx-auto mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
            >
              {/* Aspas decorativas */}
              <div className="text-6xl text-accent/30 font-serif text-left -mt-4 -mb-2">
                "
              </div>

              <p className="text-xl md:text-2xl italic leading-relaxed">
                {testimonials[index].text}
              </p>

              {/* Avaliação por estrelas */}
              <div className="flex justify-center mt-6 gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xl transition-colors ${
                      i < testimonials[index].rating
                        ? 'text-accent'
                        : 'text-white/30'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Informações do cliente */}
              <p className="mt-6 font-bold text-lg">{testimonials[index].name}</p>
              <p className="text-gray-300">{testimonials[index].role}</p>

              <div className="text-6xl text-accent/30 font-serif text-right -mb-4 -mt-2">
                "
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botão anterior */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-accent
                       p-3 rounded-full transition-all duration-300 -ml-4 md:-ml-8
                       focus:outline-none focus:ring-2 focus:ring-accent/50
                       hover:scale-110"
            aria-label="Depoimento anterior"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>

          {/* Botão próximo */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-accent
                       p-3 rounded-full transition-all duration-300 -mr-4 md:-mr-8
                       focus:outline-none focus:ring-2 focus:ring-accent/50
                       hover:scale-110"
            aria-label="Próximo depoimento"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>

        {/* Indicadores (dots) */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Depoimentos">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2 rounded-full transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-accent/50
                         ${i === index 
                           ? 'bg-accent w-8' 
                           : 'bg-white/50 w-2 hover:bg-white/80'
                         }`}
              role="tab"
              aria-selected={i === index}
              aria-label={`Ver depoimento ${i + 1} de ${testimonials.length}`}
            />
          ))}
        </div>

        {/* Indicador de progresso */}
        <p className="text-white/50 text-sm mt-4">
          {index + 1} de {testimonials.length}
        </p>
      </div>
    </section>
  )
}

export default Testimonials