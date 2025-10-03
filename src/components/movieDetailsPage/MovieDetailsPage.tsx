import { useState, useEffect } from "react";
import MovieDetails from "../movieDetails/MovieDetails";
import { mapMovie, type Movie } from "../../types/movie";
import { MOVIES_API_URL } from "../../constants/movie";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const movieId = params.movieId;
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        const movieUrl = MOVIES_API_URL + `/${movieId}`;

        await fetch(movieUrl, { signal: controller.signal })
          .then((response) => response.json())
          .then((rawdata: unknown) => mapMovie(rawdata))
          .then((mappedMovie: Movie) => setMovie(mappedMovie));
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching movies:", error);
        }
      } finally {
        console.log("Fetch attempt finished.");
      }
    };

    fetchMovies();
    return () => controller.abort();
  }, [movieId]);

  return (
    <>
      <div className="container-fluid d-flex flex-column align-items-center gap-5 py-4">
        {movie ? (
          <MovieDetails movie={movie} onClose={() => navigate(-1)} />
        ) : (
          <p>Loading movie details...</p>
        )}
      </div>
    </>
  );
};

export default MovieDetailsPage;
