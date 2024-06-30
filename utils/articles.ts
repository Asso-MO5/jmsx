export type Article = {
    id: number

        title: {
        rendered: string
    }
    content: {
        rendered: string
    }
    excerpt: {
        rendered: string
    }
    date: string
    slug: string
    _embedded: {
        'wp:featuredmedia': {
            source_url: string
        }[]
    }
}