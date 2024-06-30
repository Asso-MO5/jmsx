import { Article } from '@/utils/articles'
import type { Metadata } from 'next'
import Link from 'next/link'

type Props = {
  params: { slug: string }
}

async function getData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ACTU_API}posts?_embed=true&slug=${slug}`
  )

  if (!res.ok) {
    return {
      data: [],
      error: {
        status: res.status,
        statusText: res.statusText,
      },
    }
  }

  return {
    data: await res.json(),
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data, error } = (await getData(params.slug as string)) as {
    data: Article[]
    error: { status: number; statusText: string }
  }

  if (error) {
    // Return minimal metadata in case of error
    return {
      title: `Error ${error.status}: ${error.statusText}`,
    }
  }

  const article = data[0]

  return {
    title: article.title.rendered,
    description: article.excerpt.rendered,
    openGraph: {
      images: [
        article?.['_embedded']?.['wp:featuredmedia']?.[0].source_url ||
          '/poster.webp',
      ],
    },
  }
}

export default async function Page({ params: { slug } }: Props) {
  const { data, error } = (await getData(slug as string)) as {
    data: Article[]
    error: { status: number; statusText: string }
  }

  if (error)
    return (
      <div>
        Erreur {error.status}: {error.statusText}
      </div>
    )

  const article = data[0]

  return (
    <main className="relative flex flex-col gap-3 max-w-[512px] m-auto p-6">
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex w-full mb-2 text-xs">
          <Link href="/actu">{'<-'} Retour aux articles</Link>
        </div>
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
        <h1 className="text-msx-lightBlue border-t-2 border-msx-darkRed w-full text-center p-2">
          {article.title.rendered}
        </h1>
        <div
          className="text-msx-darkYellow"
          dangerouslySetInnerHTML={{ __html: article.content.rendered }}
        />
      </div>
    </main>
  )
}
