import { useQuery } from '@tanstack/react-query';
import { searchNews } from '../services/headlinesNewsApi';

export const useSearchPreview = (query) => {
  return useQuery({
    queryKey: ['searchPreview', query],
    queryFn: () => searchNews(query),
    enabled: !!query && query.length >= 2,
    select: (data) => data.articles.map(article => ({
      title: article.title,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
    })),
    staleTime: 30000, // Cache results for 30 seconds
  });
}; 