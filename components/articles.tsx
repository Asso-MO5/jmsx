'use client'
import { Article } from '@/utils/articles'
import { useEffect, useState } from 'react'

const CAT = 2
export function Articles() {
  const [page, setPage] = useState(1)
  const [articles, setArticles] = useState<Article[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)

  async function fetchArticles() {
    setLoading(true)
    setError(null)
    try {
      //_fields=id,excerpt,title,content,featured_media
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ACTU_API}posts?page=${page}&per_page=20&_embed=true&categories=${CAT}`
      )
      const data = (await response.json()) as Article[]

      setIsLastPage(response.headers.get('X-WP-TotalPages') == String(page))
      setArticles((prev) => {
        return [
          ...prev,
          ...data.filter(
            (article) =>
              !prev.find((prevArticle) => prevArticle.id === article.id)
          ),
        ]
      })
    } catch (error) {
      console.error(error)
      setError('une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [page])

  if (loading && !articles.length)
    return <div className="text-msx-darkYellow text-center">Chargement...</div>

  if (error) return <div className="text-msx-darkRed text-center">{error}</div>

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {articles.map((article) => (
        <a
          href={`/actu/${article.slug}`}
          key={article.id}
          className="flex flex-col gap-2 border border-msx-lightBlue hover:border-msx-mediumGreen cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <img
            src={
              article?.['_embedded']?.['wp:featuredmedia']?.[0].source_url ||
              '/poster.webp'
            }
            alt={article.title.rendered}
            className="mb-2 bg-cover"
            width={512}
            height={384}
          />
          <h2 className="text-base text-center px-2">
            {article.title.rendered}
          </h2>
        </a>
      ))}
      <div className="flex items-center flex-col justify-center gap-2 w-full col-span-full p-4">
        {!isLastPage && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={isLastPage || loading}
            className="bg-msx-darkBlue text-msx-white p-2"
          >
            {loading ? 'Chargement...' : 'Charger plus'}
          </button>
        )}
      </div>
    </div>
  )
}
