import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import NewsCard from "../components/News/NewsCard";
import { getBookmarks } from "../utils/localStorage";

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
    
    const handleStorageChange = () => {
      setBookmarks(getBookmarks());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Saved Articles</h1>
        <span className="text-gray-500">
          {bookmarks.length} {bookmarks.length === 1 ? 'article' : 'articles'} saved
        </span>
      </div>
      
      {bookmarks.length === 0 ? (
        <div className="text-center py-16">
          <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">No saved articles yet</h2>
          <p className="text-gray-500 mb-6">Articles you save will appear here</p>
          <Link 
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse articles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bookmarks.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export { BookmarksPage }; 