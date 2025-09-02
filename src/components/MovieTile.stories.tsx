import type { Meta, StoryObj } from "@storybook/react-vite";

import { MovieTile } from "./MovieTile";

const meta = {
  component: MovieTile,
} satisfies Meta<typeof MovieTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: {
      id: "1",
      title: "Pulp Fiction",
      genres: ["Crime"],
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SX300.jpg",
      description:
        "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      releaseDate: new Date("1994-09-23"),
      durationInMinutes: 142,
      rating: 9.3,
    },
  },
};
