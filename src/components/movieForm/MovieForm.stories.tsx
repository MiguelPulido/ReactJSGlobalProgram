import type { Meta, StoryObj } from "@storybook/react-vite";
import { MovieForm, type MovieFormData } from "../MovieForm";
import type { Movie } from "../../types/movie";

const meta = {
  component: MovieForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MovieForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Science Fiction",
  "Crime",
  "Documentary",
];

const handleSubmit = (data: MovieFormData) => {
  console.log("Form submitted with data:", data);
};

const handleCancel = () => {
  console.log("Form canceled");
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

export const AddMode: Story = {
  args: {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    availableGenres: MOCK_GENRES,
  },
};

export const EditMode: Story = {
  args: {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    initialMovie: MOVIE,
    availableGenres: MOCK_GENRES,
  },
};

export const CustomGenres: Story = {
  args: {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    availableGenres: ["Sci-Fi", "Fantasy", "Thriller", "Romance", "Western"],
  },
};

export const WithoutCancel: Story = {
  args: {
    onSubmit: handleSubmit,
    availableGenres: MOCK_GENRES,
  },
};
