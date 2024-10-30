import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchPreview } from "../../hooks/useSearchPreview";
import { formatDate } from "../../utils/formatDate";

const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const { data: previewResults, isLoading } = useSearchPreview(debouncedSearch);

  // Handle click outside to close preview
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsPreviewOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search preview visibility
  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length >= 2) {
      setIsPreviewOpen(true);
    } else {
      setIsPreviewOpen(false);
    }
  }, [debouncedSearch]);

  const handlePreviewClick = (article) => {
    navigate(`/search?q=${encodeURIComponent(article.title)}`);
    setSearchTerm(""); // Reset search field
    setIsPreviewOpen(false);
  };

  // Handle search submission
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); // Reset search field
      setIsPreviewOpen(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative flex-1 max-w-xl mx-4" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search news..."
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {/* Search button */}
        <button
          onClick={handleSearch}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          <span className="sr-only">Search</span>
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </button>
      </div>

      {/* Search Preview Dropdown */}
      {isPreviewOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          {isLoading ? (
            <div className="p-4">
              <div className="animate-pulse space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : previewResults?.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {previewResults.slice(0, 5).map((article, index) => (
                <button
                  key={index}
                  onClick={() => handlePreviewClick(article)}
                  className="w-full text-left p-3 hover:bg-gray-50 flex items-start space-x-3 border-b border-gray-100 last:border-0"
                >
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt=""
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : debouncedSearch.length >= 2 ? (
            <div className="p-4 text-sm text-gray-500">
              No results found for &quot;{debouncedSearch}&quot;
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 