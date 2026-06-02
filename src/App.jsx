import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Services from './components/Services'
import Differentials from './components/Differentials'
import Sustainability from './components/Sustainability'
import Testimonials from './components/Testimonials'
import PostDetail from './components/PostDetail'
import Contact from './components/Contact'

import PoliticaPrivacidade from './components/PoliticaPrivacidade'
import PoliticaCookies from './components/PoliticaCookies'
import CodigoEtica from './components/CodigoEtica'
import TermosUso from './components/TermosUso'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Página Inicial */}
          <Route path="/" element={<Hero />} />

          {/* Páginas Principais */}
          <Route path="/sobre" element={<About />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/diferenciais" element={<Differentials />} />
          <Route path="/sustentabilidade" element={<Sustainability />} />
          <Route path="/depoimentos" element={<Testimonials />} />
          <Route path="/contato" element={<Contact />} />

          {/* Blog */}
          <Route path="/blog/:slug" element={<PostDetail />} />

          {/* Rodapé */}
          <Route
            path="/politica-privacidade"
            element={<PoliticaPrivacidade />}
          />
          <Route
            path="/politica-cookies"
            element={<PoliticaCookies />}
          />
          <Route
            path="/codigo-etica"
            element={<CodigoEtica />}
          />
          <Route
            path="/termos-uso"
            element={<TermosUso />}
          />
        </Routes>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App