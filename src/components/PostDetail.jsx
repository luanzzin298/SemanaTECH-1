import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaUser, FaFolderOpen, FaArrowLeft, FaShareAlt } from 'react-icons/fa'
import { blogPosts } from '../data/content'
import { useEffect } from 'react'

const PostDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = blogPosts.find(p => p.slug === slug)

  useEffect(() => {
    if (!post) navigate('/blog')
  }, [post, navigate])

  if (!post) return null

  const recentPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <Link to="/blog" className="inline-flex items-center gap-2 text-secondary hover:gap-3 transition-all mb-8">
          <FaArrowLeft /> Voltar para o blog
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={post.image} alt={post.title} className="w-full h-96 object-cover rounded-2xl shadow-lg mb-6" />
              <div className="flex flex-wrap gap-4 text-gray-500 text-sm mb-4">
                <span className="flex items-center gap-1"><FaCalendarAlt className="text-secondary" /> {post.date}</span>
                <span className="flex items-center gap-1"><FaUser className="text-secondary" /> {post.author}</span>
                <span className="flex items-center gap-1"><FaFolderOpen className="text-secondary" /> {post.category}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">{post.title}</h1>
              <div
                className="prose prose-lg max-w-none text-gray-700 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-3 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <div className="border-t border-gray-200 mt-8 pt-6 flex justify-between items-center">
                <button className="flex items-center gap-2 text-gray-500 hover:text-secondary transition">
                  <FaShareAlt /> Compartilhar
                </button>
              </div>
            </motion.article>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-primary mb-4">Posts recentes</h3>
              <div className="space-y-4">
                {recentPosts.map(p => (
                  <Link key={p.id} to={`/blog/${p.slug}`} className="flex gap-3 group">
                    <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                      <h4 className="font-semibold text-gray-800 group-hover:text-secondary transition line-clamp-2">{p.title}</h4>
                      <p className="text-xs text-gray-500">{p.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-primary text-white rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Fale com um especialista</h3>
              <p className="text-gray-200 mb-4">Precisa de uma solução personalizada?</p>
              <Link to="/contato" className="inline-block bg-accent text-primary px-4 py-2 rounded-full font-semibold hover:bg-amber-600 transition">Solicitar contato</Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default PostDetail