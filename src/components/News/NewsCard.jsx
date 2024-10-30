import PropTypes from "prop-types";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { saveBookmark, removeBookmark, isArticleBookmarked } from "../../utils/localStorage";
import { formatDate } from "../../utils/formatDate";

const NewsCard = ({ article, featured = false, compact = false }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkAnimating, setIsBookmarkAnimating] = useState(false);

  useEffect(() => {
    setIsBookmarked(isArticleBookmarked(article.url));
  }, [article.url]);

  const handleBookmark = (e) => {
    e.preventDefault(); // Prevent card click event
    setIsBookmarkAnimating(true);
    
    if (isBookmarked) {
      removeBookmark(article.url);
      setIsBookmarked(false);
    } else {
      const added = saveBookmark(article);
      setIsBookmarked(added);
    }

    // Reset animation after a short delay
    setTimeout(() => {
      setIsBookmarkAnimating(false);
    }, 300);
  };

  const {
    title = "Untitled Article",
    author,
    description = "No description available",
    url = "#",
    urlToImage,
    publishedAt,
  } = article;

  const fallbackImage = "https://placehold.co/600x400?text=No+Image+Available";

  return (
    <div
      className={`relative border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col`}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ paddingTop: featured ? "75%" : compact ? "56.25%" : "60%" }}
      >
        <img
          src={urlToImage || fallbackImage}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = fallbackImage;
            e.target.onerror = null;
          }}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2
          className={`font-bold mb-2 line-clamp-2 ${
            featured
              ? "text-xl md:text-2xl"
              : compact
              ? "text-sm md:text-base"
              : "text-base md:text-xl"
          }`}
        >
          {title}
        </h2>

        <p className="text-gray-600 mb-2 text-xs md:text-sm">
          {author ? `By ${author}` : "By Unknown Author"} • {formatDate(publishedAt)}
        </p>

        {!compact && (
          <p className="text-gray-700 line-clamp-3 mb-4 text-sm md:text-base">
            {description}
          </p>
        )}

        <div className="mt-auto">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base"
          >
            Read more →
          </a>
        </div>
      </div>

      <button
        onClick={handleBookmark}
        className={`absolute top-2 right-2 z-10 p-2 rounded-full 
          ${isBookmarked ? 'bg-blue-100' : 'bg-white/80 hover:bg-white'} 
          transition-all duration-200 shadow-md
          ${isBookmarkAnimating ? 'scale-110' : 'scale-100'}
          group`}
        aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
      >
        {isBookmarked ? (
          <BookmarkCheck className="w-5 h-5 text-blue-600" />
        ) : (
          <Bookmark className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
        )}
      </button>

      {isBookmarkAnimating && (
        <div className="absolute top-14 right-2 z-20 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg">
          {isBookmarked ? 'Saved!' : 'Removed'}
        </div>
      )}
    </div>
  );
};

NewsCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.string,
    publishedAt: PropTypes.string,
  }).isRequired,
  featured: PropTypes.bool,
  compact: PropTypes.bool,
};

NewsCard.defaultProps = {
  featured: false,
  compact: false,
};

export default NewsCard;
