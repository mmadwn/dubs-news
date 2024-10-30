import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { ErrorPage } from "../pages/ErrorPage.jsx";
import { SearchPage } from "../pages/SearchPage.jsx";
import { BookmarksPage } from "../pages/BookmarksPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/sports",
        element: <HomePage />,
      },
      {
        path: "/technology",
        element: <HomePage />,
      },
      {
        path: "/business",
        element: <HomePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/bookmarks",
        element: <BookmarksPage />,
      },
    ],
  },
]);
