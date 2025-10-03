import { useNavigate } from "react-router-dom";
import { Dialog } from "../dialog/Dialog";
import { MovieForm, type MovieFormData } from "../movieForm/MovieForm";
import { AVAILABLE_FORM_GENRES, MOVIES_API_URL } from "../../constants/movie";

const AddMovieDialog = () => {
  const navigate = useNavigate();

  const handleAddMovie = async (movieData: MovieFormData): Promise<void> => {
    try {
      const response = await fetch(MOVIES_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

      const result = await response.json();
      const id = result.id;

      if (id) {
        console.log("Added movie with id:", id);
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
      <Dialog title="Add New Movie" isOpen={true} onClose={() => navigate(-1)}>
        <MovieForm
          availableGenres={AVAILABLE_FORM_GENRES}
          onSubmit={handleAddMovie}
          onCancel={() => navigate(-1)}
        />
      </Dialog>
    </>
  );
};

export default AddMovieDialog;
