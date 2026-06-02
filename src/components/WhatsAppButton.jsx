import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppButton = () => {
  // Número de WhatsApp correto da empresa
  const whatsappNumber = '5532998114901'
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-cyan-500 text-white p-4 rounded-full 
                 shadow-2xl z-50 hover:bg-cyan-600 transition-all duration-300 
                 group shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      aria-label="Fale conosco pelo WhatsApp"
    >
      <FaWhatsapp size={28} className="group-hover:scale-110 transition-transform" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 
                       bg-[#001C30] text-white text-sm px-4 py-2 rounded-full 
                       opacity-0 group-hover:opacity-100 transition-all duration-300 
                       whitespace-nowrap pointer-events-none shadow-md
                       before:content-[''] before:absolute before:left-full before:top-1/2 
                       before:-translate-y-1/2 before:border-8 before:border-transparent 
                       before:border-l-[#001C30]">
        Fale conosco no WhatsApp
      </span>
    </motion.a>
  )
}

export default WhatsAppButton