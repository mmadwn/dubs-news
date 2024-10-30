function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}

          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">DubsNews</h2>

            <p className="text-gray-400">
              Your trusted source for the latest news and updates from around
              the world.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>

            <ul className="space-y-2">
              <li>
                <a
                  href="/sports"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sports
                </a>
              </li>

              <li>
                <a
                  href="/technology"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Technology
                </a>
              </li>

              <li>
                <a
                  href="/business"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Business
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}

        <div className="border-t border-gray-800 mt-8 pt-8 text-center md:flex md:justify-between">
          <p className="text-gray-400">
            © {new Date().getFullYear()} DubsNews. All rights reserved.
          </p>

          <div className="mt-4 md:mt-0">
            <a
              href="/privacy"
              className="text-gray-400 hover:text-white mx-3 transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="text-gray-400 hover:text-white mx-3 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
