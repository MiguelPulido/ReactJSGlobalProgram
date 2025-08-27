import type { Meta, StoryObj } from '@storybook/react-vite';

import { MovieTile } from './MovieTile';

const meta = {
  component: MovieTile,
} satisfies Meta<typeof MovieTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: {
      "id": 1,
      "title": "Pulp Fiction",
      "genres": ["Crime"],
      "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SX300.jpg",
      "releaseDate": 0
    }
  }
};