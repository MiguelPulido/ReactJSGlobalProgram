import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App.tsx";
import MovieListPage from "./components/movieListPage/MovieListPage";
import MovieDetailsPage from "./components/movieDetailsPage/MovieDetailsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MovieListPage />,
      },
      {
        path: "/:movieId",
        element: <MovieDetailsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={ROUTER} />
  </StrictMode>
);
