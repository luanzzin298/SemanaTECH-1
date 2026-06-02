import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaIndustry, FaUsers, FaRecycle, FaTrophy } from 'react-icons/fa'
import { company } from '../data/content'

const Counter = ({ value, suffix, icon, label }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  const isInView = useInView(ref, {
    once: true,
    margin: '-50px',
  })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const duration = 1500
      const stepTime = Math.abs(Math.floor(duration / end))

      const timer = setInterval(() => {
        start += 1
        setCount(start)

        if (start === end) {
          clearInterval(timer)
        }
      }, stepTime)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center p-6 glass-card shadow-lg hover:shadow-xl transition rounded-2xl bg-white/80 backdrop-blur-md"
    >
      <div className="text-5xl text-accent mb-4 flex justify-center">
        {icon}
      </div>

      <div className="text-4xl font-bold text-primary">
        {count}
        {suffix}
      </div>

      <div className="text-gray-600 mt-2 font-medium">
        {label}
      </div>
    </motion.div>
  )
}

const Numbers = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <Counter
            value={company.employees}
            suffix="+"
            icon={<FaIndustry />}
            label="Funcionários"
          />

          <Counter
            value={company.clients}
            suffix="+"
            icon={<FaUsers />}
            label="Clientes ativos"
          />

          <Counter
            value={company.recycledMonthly}
            suffix=" t/mês"
            icon={<FaRecycle />}
            label="Reciclagem"
          />

          <Counter
            value={new Date().getFullYear() - company.founded}
            suffix=" anos"
            icon={<FaTrophy />}
            label="Experiência"
          />
        </div>
      </div>
    </section>
  )
}

export default Numbers