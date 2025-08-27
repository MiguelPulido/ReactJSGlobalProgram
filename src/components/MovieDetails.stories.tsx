import type { Meta, StoryObj } from '@storybook/react-vite';

import { MovieDetails } from './MovieDetails';

const meta = {
  component: MovieDetails,
} satisfies Meta<typeof MovieDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: {
      "id": "1",
      "title": "Pulp Fiction",
      "genres": ["Crime"],
      "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SX300.jpg",
      "description": "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      "releaseDate": 1,
      "durationInMinutes": 142
    }
  }
};