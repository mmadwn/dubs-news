import { useHeadlines } from "../hooks/useHeadlines";
import { useLocation } from "react-router-dom";

import NewsCard from "../components/News/NewsCard";

import NewsCardSkeleton from "../components/News/NewsCardSkeleton";

const HomePage = () => {
  const location = useLocation();
  const category = location.pathname.slice(1) || 'general';

  const { data: headlines, isLoading, isError, error } = useHeadlines('us', category);

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading news: {error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Large skeleton */}

          <div className="col-span-1 md:col-span-6">
            <NewsCardSkeleton height="h-[400px]" />
          </div>

          {/* 2x2 grid skeletons */}

          <div className="col-span-1 md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <NewsCardSkeleton key={i} height="h-[185px]" />
            ))}
          </div>

          {/* Bottom row skeletons */}

          <div className="col-span-1 md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <NewsCardSkeleton key={i} height="h-[185px]" />
            ))}
          </div>

          {/* Large bottom skeleton */}

          <div className="col-span-1 md:col-span-6">
            <NewsCardSkeleton height="h-[400px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        {/* Featured Article - Large */}

        {headlines?.[0] && (
          <div className="col-span-1 md:col-span-6">
            <NewsCard article={headlines[0]} featured={true} />
          </div>
        )}

        {/* 2x2 Grid */}

        <div className="col-span-1 md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {headlines?.slice(1, 5).map((article, index) => (
            <NewsCard key={index} article={article} compact={true} />
          ))}
        </div>

        {/* Bottom Row - 4 Small Articles */}

        <div className="col-span-1 md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {headlines?.slice(5, 9).map((article, index) => (
            <NewsCard key={index} article={article} compact={true} />
          ))}
        </div>

        {/* Bottom Featured Article - Large */}

        {headlines?.[9] && (
          <div className="col-span-1 md:col-span-6">
            <NewsCard article={headlines[9]} featured={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export { HomePage };
