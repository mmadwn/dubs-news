import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Bookmark } from "lucide-react";
import SearchBar from "../Search/SearchBar";

const navigation = [
  { name: "Home", href: "/", category: "general" },
  { name: "Sports", href: "/sports", category: "sports" },
  { name: "Technology", href: "/technology", category: "technology" },
  { name: "Business", href: "/business", category: "business" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const currentCategory = location.pathname.slice(1) || "general";

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">DubsNews</span>
          </Link>

          {/* Search Bar */}
          <SearchBar />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  currentCategory === item.category
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 hover:text-blue-600"
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/bookmarks"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                location.pathname === '/bookmarks'
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              } transition-all duration-200`}
            >
              <Bookmark className="w-5 h-5" />
              <span className="text-sm">Saved</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    currentCategory === item.category
                      ? "text-blue-600 font-medium"
                      : "text-gray-700 hover:text-blue-600"
                  } transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/bookmarks"
                className={`flex items-center space-x-1 ${
                  location.pathname === '/bookmarks'
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Bookmark className="w-5 h-5" />
                <span>Saved</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export { Header };
