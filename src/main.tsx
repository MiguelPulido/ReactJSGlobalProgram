import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App.tsx";
import MovieListPage from "./components/movieListPage/MovieListPage";
import MovieDetailsPage from "./components/movieDetailsPage/MovieDetailsPage";
import AddMovieDialog from "./components/AddMovieDialog/AddMovieDialog.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditMovieDialog from "./components/EditMovieDialog/EditMovieDialog.tsx";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MovieListPage />,
        children: [
          {
            path: "new",
            element: <AddMovieDialog />,
          },
          {
            path: ":movieId/edit",
            element: <EditMovieDialog />,
          },
        ],
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
