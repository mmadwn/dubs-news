import { useQuery } from '@tanstack/react-query'
import { getTopHeadlines } from '../services/headlinesNewsApi'

export const useHeadlines = (country = 'us', category = 'general') => {
  return useQuery({
    queryKey: ['headlines', country, category],
    queryFn: () => getTopHeadlines(country, category),
    select: (data) => data.articles.map(article => ({
      title: article.title,
      author: article.author,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
    })),
    staleTime: 300000, // Cache for 5 minutes
  })
} 