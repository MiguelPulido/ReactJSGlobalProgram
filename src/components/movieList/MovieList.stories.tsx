import type { Meta, StoryObj } from "@storybook/react-vite";

import MovieList from "../MovieList";

const meta = {
  component: MovieList,
} satisfies Meta<typeof MovieList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movies: [
      {
        id: "1",
        title: "Pulp Fiction",
        genres: ["Crime"],
        poster_path:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SX300.jpg",
        overview:
          "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        release_date: new Date("1994-09-23"),
        runtime: 142,
        vote_average: 9.3,
      },
    ],
  },
};
