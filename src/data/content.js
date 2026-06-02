import { FaBox, FaShoppingBag, FaSeedling, FaHardHat, FaWater, FaTint, FaIndustry, FaRecycle } from 'react-icons/fa'
import { FaCogs, FaTruck, FaSyncAlt, FaChartLine } from 'react-icons/fa'
import { FaMedal, FaClock, FaFlask, FaUsers } from 'react-icons/fa'
import extrusadoImg from '../assets/extrusado.png'
import FlocosdeGarrafaoImg from '../assets/Flocos de Garrafao.png'
import Garafaode10LitrosImg from '../assets/Garafaode10Litros.png'
import Garafaode20LitrosImg from '../assets/Garafaode20Litros.png'
import TampadeProdutosLacteosImg from '../assets/Tampa de Produtos Lacteos.png'
import tampadegarrafao from '../assets/tampa de garrafao.png'


export const company = {
  name: 'H2B Plásticos',
  founded: 2008,
  employees: 120,
  clients: 200,
  recycledMonthly: 50,
  slogan: 'Inovação, resistência e sustentabilidade em cada grânulo',
}

export const products = [
  {
    id: 1,
    name: 'Extrusado de Garrafão',
    desc: 'Material de alta qualidade para produção de garrafões de água, com resistência e durabilidade superiores.',
    icon: FaWater,
    image: extrusadoImg,
    category: 'Extrusados',
    tag: 'Alta Qualidade',
    featured: true
  },
  {
    id: 2,
    name: 'Flakes de Garrafão',
    desc: 'Material reciclado de alta pureza para produção de novos garrafões, sustentável e econômico.',
    icon: FaRecycle,
    image: FlocosdeGarrafaoImg,
    category: 'Reciclados',
    tag: 'Sustentável',
    featured: true
  },
  {
    id: 3,
    name: 'Galão de 10 Litros',
    desc: 'Galão produzido com polipropileno de alta resistência, ideal para armazenamento de água e bebidas.',
    icon: FaTint,
    image: Garafaode10LitrosImg,
    category: 'Galões',
    tag: 'Resistente',
    featured: false
  },
  {
    id: 4,
    name: 'Galão de 20 Litros',
    desc: 'Galão produzido com polipropileno de alta resistência, perfeito para distribuição de água mineral.',
    icon: FaTint,
    image: Garafaode20LitrosImg,
    category: 'Galões',
    tag: 'Alta Capacidade',
    featured: true
  },
  {
    id: 5,
    name: 'Tampa de Produtos Lácteos',
    desc: 'Produzidas com polietileno de alta densidade, garantindo vedação perfeita e segurança alimentar.',
    icon: FaIndustry,
    image: TampadeProdutosLacteosImg,
    category: 'Tampas',
    tag: 'Segurança',
    featured: false
  },
  {
    id: 6,
    name: 'Tampa para Garrafão',
    desc: 'Feita com polietilenos de baixa densidade, ideal para garrafões de água, com vedação hermética.',
    icon: FaIndustry,
    image: tampadegarrafao,
    category: 'Tampas',
    tag: 'Vedação Perfeita',
    featured: false
  },
]

export const services = [
  { title: 'Desenvolvimento sob medida', desc: 'Criamos embalagens conforme sua necessidade técnica e visual.', icon: FaCogs },
  { title: 'Logística integrada', desc: 'Entregas programadas e gestão de estoque para sua linha produtiva.', icon: FaTruck },
  { title: 'Reciclagem de resíduos', desc: 'Coletamos e reciclamos aparas plásticas industriais, fechando o ciclo.', icon: FaSyncAlt },
  { title: 'Consultoria técnica', desc: 'Otimização de processos e redução de custos com plásticos.', icon: FaChartLine },
]

export const differentials = [
  { title: 'Certificação ISO 9001', text: 'Processos controlados e melhoria contínua.', icon: FaMedal },
  { title: 'Entrega ágil', desc: 'Atendemos prazos críticos com frota própria e logística eficiente.', icon: FaClock },
  { title: 'Laboratório próprio', desc: 'Testes de resistência, gramatura e qualidade em até 24h.', icon: FaFlask },
  { title: 'Equipe especializada', desc: 'Profissionais com mais de 10 anos de experiência no mercado.', icon: FaUsers },
]

export const testimonials = [
  { name: 'Carlos M.', role: 'Gerente de Compras, Indústria Alfa', text: 'A H2B reduziu nosso custo com embalagens em 20% sem perder qualidade. Entrega impecável.', rating: 5 },
  { name: 'Fernanda L.', role: 'Coordenadora de Logística, Supermercados Sul', text: 'Os sacos plásticos personalizados com nossa marca são um diferencial competitivo.', rating: 5 },
  { name: 'Ricardo S.', role: 'Proprietário, Agropecuária Santa Fé', text: 'Nossas embalagens para silagem são as mais resistentes que já utilizamos.', rating: 4 },
  { name: 'Ana Paula R.', role: 'Gerente de Qualidade, FoodTech Brasil', text: 'As embalagens da H2B atendem todos os rigorosos padrões da indústria alimentícia.', rating: 5 },
  { name: 'Roberto C.', role: 'Diretor de Operações, Logística Rápida', text: 'Parceiro estratégico que nunca deixou a gente na mão. Recomendo fortemente.', rating: 5 },
]

export const blogPosts = [
  {
    id: 1,
    slug: 'vantagens-da-embalagem-personalizada',
    title: '5 vantagens da embalagem personalizada para sua marca',
    date: '15/04/2025',
    author: 'Marketing H2B',
    category: 'Marketing',
    excerpt: 'Como uma embalagem exclusiva pode aumentar o valor percebido e fidelizar clientes.',
    content: `
      <p>A embalagem é o primeiro contato físico que o consumidor tem com seu produto. Uma embalagem personalizada transmite profissionalismo, cuidado e diferencia sua marca no ponto de venda.</p>
      <p>Na H2B, desenvolvemos soluções com cores, logos e formatos exclusivos, atendendo às necessidades específicas de cada cliente.</p>
      <h2>Benefícios da personalização</h2>
      <p>Embalagens personalizadas aumentam o reconhecimento da marca, geram mais vendas e criam uma conexão emocional com o consumidor.</p>
    `,
    image: 'https://placehold.co/800x500/0A4A6E/white?text=Embalagem+Personalizada',
  },
  {
    id: 2,
    slug: 'economia-circular-meta-2027',
    title: 'Economia circular: nossa meta é 100% de reciclagem até 2027',
    date: '02/03/2025',
    author: 'Comitê de Sustentabilidade',
    category: 'Sustentabilidade',
    excerpt: 'Conheça nossos investimentos em eco-design, logística reversa e parcerias para fechar o ciclo do plástico.',
    content: `
      <p>A H2B Plásticos assumiu o compromisso público de alcançar 100% de reciclagem dos resíduos gerados até 2027. Para isso, estamos investindo em novas tecnologias de triagem, parcerias com cooperativas e desenvolvimento de embalagens mono-material.</p>
      <p>Nosso projeto "Plástico de Volta" já recupera mais de 50 toneladas por mês, transformando aparas industriais e pós-consumo em novos produtos de alto valor.</p>
      <p>Além disso, reduzimos em 40% o uso de resina virgem em algumas linhas, substituindo por PCR (Plástico Pós-Consumo Reciclado) certificado.</p>
    `,
    image: 'https://placehold.co/800x500/0A4A6E/white?text=Reciclagem',
  },
  {
    id: 3,
    slug: 'inovacao-em-embalagens-biodegradaveis',
    title: 'Inovação em embalagens biodegradáveis: o futuro é agora',
    date: '10/01/2025',
    author: 'P&D H2B',
    category: 'Inovação',
    excerpt: 'Pesquisamos novos materiais que se decompõem em até 180 dias, sem gerar microplásticos.',
    content: `
      <p>Estamos desenvolvendo uma linha de embalagens a partir de polímeros biodegradáveis certificados. Os primeiros testes mostram decomposição em até 180 dias em condições de compostagem industrial, sem resíduos tóxicos.</p>
      <p>Essa inovação coloca a H2B na vanguarda da sustentabilidade, antecipando tendências de mercado e regulamentações ambientais.</p>
      <p>Nosso compromisso é oferecer alternativas ecológicas sem comprometer a resistência e durabilidade que nossos clientes exigem.</p>
    `,
    image: 'https://placehold.co/800x500/0A4A6E/white?text=Biodegradável',
  },
  {
    id: 4,
    slug: 'big-bags-ideal-para-industria',
    title: 'Big Bags: a solução ideal para transporte de granéis',
    date: '20/02/2025',
    author: 'Equipe Técnica H2B',
    category: 'Dicas Técnicas',
    excerpt: 'Conheça as vantagens dos big bags para sua indústria e como escolher o modelo certo.',
    content: `
      <p>Os big bags são a solução mais eficiente para transporte e armazenamento de materiais a granel. Com capacidade de 500kg a 1500kg, eles otimizam a logística e reduzem custos.</p>
      <p>Na H2B, fabricamos big bags com diferentes tipos de alças, aberturas e fechamentos, atendendo às necessidades específicas de cada setor.</p>
    `,
    image: 'https://placehold.co/800x500/0A4A6E/white?text=Big+Bag',
  },
]

export const partners = [
  { name: 'Braskem', logo: 'https://placehold.co/150x80/e0e0e0/333?text=Braskem' },
  { name: 'Dow', logo: 'https://placehold.co/150x80/e0e0e0/333?text=Dow' },
  { name: 'SABIC', logo: 'https://placehold.co/150x80/e0e0e0/333?text=SABIC' },
  { name: 'Veolia', logo: 'https://placehold.co/150x80/e0e0e0/333?text=Veolia' },
  { name: 'BASF', logo: 'https://placehold.co/150x80/e0e0e0/333?text=BASF' },
  { name: 'Nova Chemicals', logo: 'https://placehold.co/150x80/e0e0e0/333?text=Nova' },
]

// Informações de contato
export const contactInfo = {
  address: 'Av. Industrial, 1000 – Distrito Industrial, São Paulo – SP, CEP 08000-000',
  phone: '(11) 3456-7890',
  email: 'comercial@h2bplasticos.com.br',
  whatsapp: '5511999999999',
  hours: 'Segunda a sexta, 8h às 18h',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.097123456789!2d-46.633308!3d-23.550520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDMzJzAxLjkiUyA0NsKwMzgnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m0',
}

// Redes sociais
export const socialLinks = {
  facebook: 'https://facebook.com/h2bplasticos',
  instagram: 'https://instagram.com/h2bplasticos',
  linkedin: 'https://linkedin.com/company/h2bplasticos',
  youtube: 'https://youtube.com/@h2bplasticos',
}