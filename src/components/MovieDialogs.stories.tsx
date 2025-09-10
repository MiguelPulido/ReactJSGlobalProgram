import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog } from "./Dialog";
import { MovieForm, type MovieFormData } from "./MovieForm";
import type { Movie } from "../types/movie";

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

const mockGenres = [
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

const mockMovie: Movie = {
  id: "1",
  title: "The Shawshank Redemption",
  imageUrl:
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  durationInMinutes: 142,
  genres: ["Drama", "Crime"],
  releaseDate: new Date("1994-09-23"),
  description:
    "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  rating: 9.3,
};

export const AddMovie: Story = {
  args: {
    dialogTitle: "Add New Movie",
    isOpen: true,
    movieFormProps: {
      onSubmit: handleSubmit,
      onCancel: handleCancel,
      availableGenres: mockGenres,
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
      initialMovie: mockMovie,
      availableGenres: mockGenres,
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
        description: "A work in progress...",
        genres: ["Drama"],
      },
      availableGenres: mockGenres,
    },
  },
};
