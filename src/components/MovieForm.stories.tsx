import type { Meta, StoryObj } from "@storybook/react-vite";
import { MovieForm, type MovieFormData } from "./MovieForm";
import type { Movie } from "../types/movie";

const meta = {
  component: MovieForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MovieForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockGenres = ["Action", "Comedy", "Drama", "Horror", "Science Fiction", "Crime", "Documentary"];

const handleSubmit = (data: MovieFormData) => {
  console.log("Form submitted with data:", data);
};

const handleCancel = () => {
  console.log("Form canceled");
};

const mockMovie: Movie = {
  id: "1",
  title: "The Shawshank Redemption",
  imageUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  durationInMinutes: 142,
  genres: ["Drama", "Crime"],
  releaseDate: new Date("1994-09-23"),
  description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  rating: 9.3,
};

export const AddMode: Story = {
  args: {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    availableGenres: mockGenres,
  },
};

export const EditMode: Story = {
  args: {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    initialMovie: mockMovie,
    availableGenres: mockGenres,
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
    availableGenres: mockGenres,
  },
};
