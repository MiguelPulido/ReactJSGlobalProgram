import { Dialog } from "../dialog/Dialog";
import { MovieForm, type MovieFormData } from "../movieForm/MovieForm";
import { mapMovie, type Movie } from "../../types/movie";
import { useNavigate, useParams } from "react-router-dom";
import { AVAILABLE_FORM_GENRES, MOVIES_API_URL } from "../../constants/movie";
import { useEffect, useState } from "react";

const EditMovieDialog = () => {
  const params = useParams();
  const navigate = useNavigate();

  const movieId = params.movieId;
  const [movie, setMovie] = useState<Movie>();

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

  const handleUpdateMovie = async (movieData: MovieFormData): Promise<void> => {
    try {
      const updatedMovie: Movie = { ...movieData, id: movie!.id };
      const response = await fetch(MOVIES_API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMovie),
      });

      if (!response.ok) {
        throw new Error("Failed to update movie");
      }

      const result = await response.json();
      const id = result.id;

      if (id) {
        console.log("Updated movie with id:", id);
        navigate(-1);
      } else {
        throw new Error("No movie id returned from API");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog title="Edit Movie" isOpen={true} onClose={() => navigate(-1)}>
        {movie && (
          <MovieForm
            availableGenres={AVAILABLE_FORM_GENRES}
            initialMovie={movie}
            onSubmit={handleUpdateMovie}
            onCancel={() => navigate(-1)}
          />
        )}
      </Dialog>
    </>
  );
};

export default EditMovieDialog;
