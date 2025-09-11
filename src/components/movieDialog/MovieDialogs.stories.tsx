import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog } from "../dialog/Dialog";
import { MovieForm, type MovieFormData } from "../movieForm/MovieForm";
import type { Movie } from "../../types/movie";

const MovieDialogComposition = ({
  dialogTitle,
  isOpen = true,
  movieFormProps,
}: {
  dialogTitle: string;
  isOpen?: boolean;
  movieFormProps: {
    onSubmit: (data: MovieFormData) => void;
    onCancel?: () => void;
    initialMovie?: Partial<Movie>;
    availableGenres: string[];
  };
}) => {
  const handleClose = () => {
    console.log("Dialog closed");
    movieFormProps.onCancel?.();
  };

  return (
    <Dialog title={dialogTitle} isOpen={isOpen} onClose={handleClose}>
      <MovieForm {...movieFormProps} onCancel={handleClose} />
    </Dialog>
  );
};

const meta = {
  title: "Compositions/Movie Form Dialogs",
  component: MovieDialogComposition,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MovieDialogComposition>;

export default meta;

type Story = StoryObj<typeof meta>;

const GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Science Fiction",
  "Crime",
  "Documentary",
];

const handleSubmit = (data: MovieFormData) => {
  console.log("Movie form submitted with data:", data);
};

const handleCancel = () => {
  console.log("Movie form canceled");
};

const MOVIE: Movie = {
  id: "1",
  title: "The Shawshank Redemption",
  poster_path:
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  runtime: 142,
  genres: ["Drama", "Crime"],
  release_date: new Date("1994-09-23"),
  overview:
    "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  vote_average: 9.3,
};

export const AddMovie: Story = {
  args: {
    dialogTitle: "Add New Movie",
    isOpen: true,
    movieFormProps: {
      onSubmit: handleSubmit,
      onCancel: handleCancel,
      availableGenres: GENRES,
    },
  },
};

export const EditMovie: Story = {
  args: {
    dialogTitle: "Edit Movie",
    isOpen: true,
    movieFormProps: {
      onSubmit: handleSubmit,
      onCancel: handleCancel,
      initialMovie: MOVIE,
      availableGenres: GENRES,
    },
  },
};

export const AddMovieWithCustomGenres: Story = {
  args: {
    dialogTitle: "Add New Movie",
    isOpen: true,
    movieFormProps: {
      onSubmit: handleSubmit,
      onCancel: handleCancel,
      availableGenres: [
        "Sci-Fi",
        "Fantasy",
        "Thriller",
        "Romance",
        "Western",
        "Animation",
      ],
    },
  },
};

export const EditMoviePartialData: Story = {
  args: {
    dialogTitle: "Edit Movie",
    isOpen: true,
    movieFormProps: {
      onSubmit: handleSubmit,
      onCancel: handleCancel,
      initialMovie: {
        title: "Untitled Movie",
        overview: "A work in progress...",
        genres: ["Drama"],
      },
      availableGenres: GENRES,
    },
  },
};
