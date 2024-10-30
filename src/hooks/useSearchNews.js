import { useQuery } from '@tanstack/react-query'
import { searchNews } from '../services/headlinesNewsApi'

export const useSearchNews = (query) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchNews(query),
    enabled: !!query,
    select: (data) => data.articles.map(article => ({
      title: article.title,
      author: article.author,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
    }))
  })
} 